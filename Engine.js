// Engine.js
// Fluxo do jogo

const readline = require("readline");
const Sala = require("./Sala");
const Mochila = require("./Mochila");

class Engine {
  constructor() {
    this.mochila = new Mochila();
    this.salaAtual = null;
    this.fim = false;
  }

  async jogar() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const perguntar = (texto) => new Promise(res => rl.question(texto, res));

    console.log("\nBem-vindo ao jogo 'O Segredo da Biblioteca dos Relógios'!");
    console.log("Digite 'fim' para sair, 'inventario' para ver os itens, ou comandos como 'pega lanterna' e 'usa chave caixa'.\n");

    while (!this.fim) {
      console.log("----------------------------------------");
      console.log(this.salaAtual.descricaoCompleta());

      const comando = await perguntar("\nO que deseja fazer? ");
      const partes = comando.trim().split(" ");
      const acao = partes[0];
      const alvo1 = partes[1];
      const alvo2 = partes[2];

      switch (acao) {
        case "fim":
          this.fim = true;
          break;

        case "inventario":
          console.log(this.mochila.listarFerramentas());
          break;

        case "sai":
          if (!alvo1) {
            console.log("Diga pra onde sair.");
          } else {
            const novaSala = this.salaAtual.portas[alvo1];
            if (novaSala) {
              this.salaAtual = novaSala;
            } else {
              console.log("Não há saída para essa direção.");
            }
          }
          break;

        case "pega":
          if (!alvo1) return console.log("Diga o que quer pegar.");
          this.salaAtual.pegarFerramenta(alvo1, this.mochila);
          break;

        case "usa":
          if (!alvo1 || !alvo2) {
            console.log("Use assim: usa <ferramenta> <objeto>");
          } else {
            this.salaAtual.usarFerramenta(alvo1, alvo2, this.mochila, this);
          }
          break;

        case "ler":
          if (!alvo1) {
            console.log("Diga o que quer ler.");
          } else {
            this.salaAtual.lerObjeto(alvo1);
          }
          break;

        default:
          console.log("Comando desconhecido!");
      }
    }

    console.log("\nJogo encerrado!");
    rl.close();
  }
}

module.exports = Engine;