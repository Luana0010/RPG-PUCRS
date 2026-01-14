// Jogo.js
// Cria salas, objetos e ferramentas e liga tudo

const Engine = require("./Engine");
const Sala = require("./Sala");
const Objeto = require("./Objeto");
const { Chave, Lanterna, Faca, Pilhas } = require("./Ferramenta");

class Jogo extends Engine {
  constructor() {
    super();
    this.criarCenario();
  }

  criarCenario() {
    // 1. SALAS
    const hall = new Sala("Hall_de_Entrada");
    const biblioteca = new Sala("Biblioteca");
    const laboratorio = new Sala("Laboratorio");
    const cozinha = new Sala("Cozinha");
    const porao = new Sala("Porao");
    const jardim = new Sala("Jardim");

    // 2. PORTAS
    hall.portas = { Biblioteca: biblioteca, Jardim: jardim };
    biblioteca.portas = { Hall_de_Entrada: hall, Laboratorio: laboratorio };
    laboratorio.portas = { Biblioteca: biblioteca, Cozinha: cozinha };
    cozinha.portas = { Laboratorio: laboratorio, Porao: porao };
    porao.portas = { Cozinha: cozinha };
    jardim.portas = { Hall_de_Entrada: hall };

    // 3. FERRAMENTAS NAS SALAS
    biblioteca.ferramentas.lanterna = new Lanterna();
    laboratorio.ferramentas.chave = new Chave();
    cozinha.ferramentas.faca = new Faca();

    // 4. OBJETOS FIXOS
    // MANUSCRITO — Biblioteca
    biblioteca.objetos.manuscrito = new Objeto(
      "manuscrito",
      "Um bilhete amarelado escrito: 'luz sobre o painel'."
    );

    // PAINEL — Porão
    porao.objetos.painel = new Objeto(
      "painel",
      "Um painel coberto de poeira.",
      (ferramenta, engine) => {
        // precisa ser lanterna
        if (ferramenta.nome !== "lanterna") {
          console.log("Nada acontece… parece que precisa de luz.");
          return false;
        }

        // A lanterna já foi usada ANTES (em Sala.js). Aqui só verificamos a carga.
        if (ferramenta.carga <= 0) {
          console.log("A lanterna está sem carga. Precisa recarregá-la.");
          return false;
        }

        // Criar caixa se ainda não existe
        if (!porao.objetos.caixa) {
          porao.objetos.caixa = new Objeto(
            "caixa",
            "Uma caixa trancada e enferrujada.",
            (ferramenta, engine) => {
              if (ferramenta.nome === "chave") {
                console.log("\nA caixa se abre com um clique seco...");
                console.log("Dentro dela está o Relógio do Fundador! 🕰️");
                console.log("✨ Você venceu o jogo! ✨");
                engine.indicaFimDeJogo();
                return true;
              }
              console.log("Isso não parece abrir a caixa.");
              return false;
            }
          );

          console.log("Você ilumina o painel e uma caixa aparece atrás dele!");
        } else {
          console.log("O painel já está iluminado.");
        }

        return true;
      }
    );

    // FOGÃO — Cozinha (derrota com faca)
    cozinha.objetos.fogao = new Objeto(
      "fogao",
      "Um fogão antigo com cheiro de gás. Melhor passar longe...",
      (ferramenta, engine) => {
        if (ferramenta.nome === "faca") {
          console.log("💥 A faca encosta no fogão e ocorre uma explosão!");
          console.log("Você perdeu.");
          engine.indicaFimDeJogo();
          return true;
        }
        console.log("É perigoso mexer nisso.");
        return false;
      }
    );

    // VASO — Jardim (contém pilhas)
    jardim.objetos.vaso = new Objeto(
      "vaso",
      "Um vaso decorativo pesado. Parece ter algo dentro...",
      (ferramenta) => {
        if (ferramenta.nome === "faca") {
          console.log("Você quebra o vaso! Há pilhas dentro.");
          if (!jardim.ferramentas.pilhas) {
            jardim.ferramentas.pilhas = new Pilhas();
          }
          return true;
        }
        console.log("O vaso não abre assim.");
        return false;
      }
    );

    // 5. SALA INICIAL
    this.salaAtual = hall;

    // Debug opcional para visualização das salas
    this._salas = { hall, biblioteca, laboratorio, cozinha, porao, jardim };
  }
}

module.exports = Jogo;
