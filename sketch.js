
let etapa = 0;
let caixa = 10000;
let clientes = 10;
let reputacao = 50;
let pontuacao = 0;
let escolha = null;
let botoes = [];
let resultado = false;

let etapas = [
  {
    titulo: "1. Escolha seu negócio",
    pergunta: "Qual empresa você deseja abrir?",
    opcoes: [
      { texto: "Hamburgueria", caixa: -2000, clientes: 15, reputacao: 10, pontos: 20 },
      { texto: "Loja de roupas", caixa: -1500, clientes: 10, reputacao: 5, pontos: 15 },
      { texto: "Assistência técnica", caixa: -1000, clientes: 12, reputacao: 8, pontos: 20 }
    ]
  },
  {
    titulo: "2. Conheça seu público",
    pergunta: "Como você vai conquistar seus clientes?",
    opcoes: [
      { texto: "Fazer pesquisa de mercado", caixa: -300, clientes: 20, reputacao: 15, pontos: 30 },
      { texto: "Vender para qualquer pessoa", caixa: 0, clientes: 5, reputacao: 0, pontos: 5 },
      { texto: "Investir em propaganda", caixa: -1000, clientes: 15, reputacao: 5, pontos: 20 }
    ]
  },
  {
    titulo: "3. Planejamento financeiro",
    pergunta: "Como você vai administrar o dinheiro?",
    opcoes: [
      { texto: "Controlar custos e despesas", caixa: 1000, clientes: 0, reputacao: 5, pontos: 30 },
      { texto: "Gastar sem planejamento", caixa: -2000, clientes: 0, reputacao: -15, pontos: 0 },
      { texto: "Investir todo o dinheiro", caixa: -3000, clientes: 10, reputacao: 5, pontos: 15 }
    ]
  },
  {
    titulo: "4. Estratégia de vendas",
    pergunta: "Qual será sua estratégia para crescer?",
    opcoes: [
      { texto: "Criar promoções inteligentes", caixa: -500, clientes: 25, reputacao: 10, pontos: 25 },
      { texto: "Aumentar muito os preços", caixa: 1000, clientes: -10, reputacao: -10, pontos: 5 },
      { texto: "Melhorar o atendimento", caixa: -500, clientes: 15, reputacao: 20, pontos: 30 }
    ]
  }
];

function setup() {
  createCanvas(900, 600);
  textFont("Arial");
  textAlign(CENTER, CENTER);
}

function draw() {
  background(20, 30, 48);
  botoes = [];

  if (etapa === 0) {
    telaInicial();
  } else if (etapa <= 4) {
    telaJogo();
  } else {
    telaFinal();
  }
}

function telaInicial() {
  fill(255);
  textSize(42);
  text("DESAFIO EMPREENDEDOR", width / 2, 145);

  fill(80, 210, 160);
  textSize(20);
  text("Você consegue administrar uma empresa?", width / 2, 205);

  fill(210);
  textSize(16);
  text("Aprenda sobre mercado, clientes, investimentos", width / 2, 270);
  text("e planejamento financeiro.", width / 2, 300);

  criarBotao("COMEÇAR JOGO", width / 2 - 120, 390, 240, 65, iniciar);
}

function iniciar() {
  etapa = 1;
  caixa = 10000;
  clientes = 10;
  reputacao = 50;
  pontuacao = 0;
  escolha = null;
  resultado = false;
}

function telaJogo() {
  fill(255);
  textSize(27);
  text(etapas[etapa - 1].titulo, width / 2, 55);

  fill(35, 49, 70);
  rect(35, 95, 830, 95, 15);

  textSize(17);
  fill(80, 220, 160);
  text("CAIXA", 155, 120);
  text("CLIENTES", 450, 120);
  text("REPUTAÇÃO", 745, 120);

  fill(255);
  textSize(23);
  text("R$ " + caixa.toLocaleString("pt-BR"), 155, 155);
  text(clientes, 450, 155);
  text(reputacao + "%", 745, 155);

  fill(220);
  textSize(22);
  text(etapas[etapa - 1].pergunta, width / 2, 245);

  let opcoes = etapas[etapa - 1].opcoes;

  if (!resultado) {
    for (let i = 0; i < opcoes.length; i++) {
      criarBotao(
        opcoes[i].texto,
        150,
        310 + i * 75,
        600,
        55,
        () => selecionar(i)
      );
    }
  } else {
    fill(80, 220, 160);
    textSize(21);
    text("DECISÃO REGISTRADA!", width / 2, 315);

    fill(255);
    textSize(17);
    text("Seu negócio está evoluindo. Continue!", width / 2, 355);

    criarBotao(
      etapa === 4 ? "VER RESULTADO FINAL" : "PRÓXIMA ETAPA",
      300,
      425,
      300,
      60,
      () => {
        etapa++;
        resultado = false;
        escolha = null;
      }
    );
  }

  fill(180);
  textSize(14);
  text("ETAPA " + etapa + " DE 4", width / 2, 560);
}

function selecionar(i) {
  if (resultado) return;

  escolha = i;
  let op = etapas[etapa - 1].opcoes[i];

  caixa += op.caixa;
  clientes = max(0, clientes + op.clientes);
  reputacao = constrain(reputacao + op.reputacao, 0, 100);
  pontuacao += op.pontos;

  resultado = true;
}

function telaFinal() {
  fill(80, 220, 160);
  textSize(38);
  text("EMPRESA CONCLUÍDA!", width / 2, 100);

  fill(255);
  textSize(23);
  text("Veja como ficou seu negócio:", width / 2, 175);

  textSize(20);
  text("Caixa final: R$ " + caixa.toLocaleString("pt-BR"), width / 2, 245);
  text("Clientes conquistados: " + clientes, width / 2, 290);
  text("Reputação: " + reputacao + "%", width / 2, 335);

  let nota = pontuacao;

  fill(255, 210, 90);
  textSize(27);
  text("Pontuação: " + nota + " pontos", width / 2, 405);

  fill(220);
  textSize(17);

  let mensagem = nota >= 90
    ? "Excelente! Você tem visão empreendedora!"
    : nota >= 60
    ? "Muito bem! Sua empresa tem potencial!"
    : "Continue estudando e aperfeiçoando seu negócio!";

  text(mensagem, width / 2, 455);

  criarBotao("JOGAR NOVAMENTE", 300, 500, 300, 60, iniciar);
}

function criarBotao(rotulo, x, y, w, h, acao) {
  let ativo =
    mouseX > x && mouseX < x + w &&
    mouseY > y && mouseY < y + h;

  fill(ativo ? color(80, 210, 160) : color(45, 110, 100));
  rect(x, y, w, h, 12);

  fill(255);
  textSize(18);
  text(rotulo, x + w / 2, y + h / 2);

  botoes.push({ x, y, w, h, acao });
}

function mousePressed() {
  for (let b of botoes) {
    if (
      mouseX >= b.x && mouseX <= b.x + b.w &&
      mouseY >= b.y && mouseY <= b.y + b.h
    ) {
      b.acao();
      break;
    }
  }
}

function windowResized() {
  resizeCanvas(900, 600);
}
