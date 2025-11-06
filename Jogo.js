// Jogo.js
// Configura as salas, objetos e conexões do jogo

const Engine = require("./Engine");
const Sala = require("./Sala");
const Objeto = require("./Objeto");
const { Ferramenta, Chave, Lanterna, Faca } = require("./Ferramenta");

class Jogo extends Engine {
  constructor() {
    super();
    this.criarCenario();
  }

  criarCenario() {
    const hall = new Sala("Hall_de_Entrada");
    const biblioteca = new Sala("Biblioteca");
    const laboratorio = new Sala("Laboratorio");
    const cozinha = new Sala("Cozinha");
    const porao = new Sala("Porao");
    const jardim = new Sala("Jardim");

    // Conexões
    hall.portas = { Biblioteca: biblioteca, Jardim: jardim };
    biblioteca.portas = { Hall_de_Entrada: hall, Laboratorio: laboratorio };
    laboratorio.portas = { Biblioteca: biblioteca, Cozinha: cozinha };
    cozinha.portas = { Laboratorio: laboratorio, Porao: porao };
    porao.portas = { Cozinha: cozinha };
    jardim.portas = { Hall_de_Entrada: hall };

    // Ferramentas
    biblioteca.ferramentas.lanterna = new Lanterna();
    laboratorio.ferramentas.chave = new Chave();
    cozinha.ferramentas.faca = new Faca();

    // Objetos e interações
    biblioteca.objetos.manuscrito = new Objeto(
      "manuscrito",
      "um bilhete que diz: 'luz sobre o painel'."
    );

    porao.objetos.painel = new Objeto("painel", "um painel coberto de poeira", (ferramenta, engine) => {
  if (ferramenta.nome === "lanterna") {
    ferramenta.usar(); // agora consome 1 carga da lanterna
    if (ferramenta.carga > 0) {
      console.log("Você iluminou o painel e uma caixa apareceu!");
      porao.objetos.caixa = new Objeto("caixa", "uma caixa trancada", (f, eng) => {
        if (f.nome === "chave") {
          console.log("Você abriu a caixa e encontrou o Relógio do Fundador! 🕰️");
          eng.fim = true;
        } else {
          console.log("Essa ferramenta não serve aqui.");
        }
      });
    } else {
      console.log("A lanterna apaga. As pilhas acabaram. 💀");
    }
  } else {
    console.log("Nada acontece.");
  }
});

    cozinha.objetos.fogao = new Objeto("fogao", "um fogão a gás perigoso", (ferramenta, engine) => {
      if (ferramenta.nome === "faca") {
        console.log("Você enfiou a faca no fogão... 💥 Explosão!");
        console.log("Fim de jogo. Você perdeu!");
        engine.fim = true;
      } else {
        console.log("Melhor não mexer nisso...");
      }
    });

    // 🌿 Novo objeto: vaso no jardim com pilhas escondidas
    jardim.objetos.vaso = new Objeto(
      "vaso",
      "um vaso de cerâmica decorativo",
      (ferramenta, engine) => {
        if (ferramenta && ferramenta.nome === "faca") {
          console.log("Você quebrou o vaso e encontrou um par de pilhas novas! 🔋");

          jardim.ferramentas.pilhas = new Ferramenta(
            "pilhas",
            "um par de pilhas novas, perfeitas para uma lanterna",
            (alvo, eng) => {
              if (alvo && alvo.nome === "lanterna") {
                alvo.carga = 3;
                console.log("Você colocou as pilhas novas na lanterna. Ela está totalmente recarregada! 💡");
                eng.mochila.remover("pilhas");
              } else {
                console.log("Essas pilhas só servem para recarregar uma lanterna.");
                const { Ferramenta, Chave, Lanterna, Faca } = require("./Ferramenta");
              }
            }
          );
        } else {
          console.log("É apenas um vaso comum. Talvez algo esteja escondido dentro...");
        }
      }
    );

    this.salaAtual = hall;
  }
}

module.exports = Jogo;