// Engine.js
// Classe responsável pelo motor principal do jogo.
// Controla o loop de execução, leitura de comandos,
// gerenciamento da sala atual, estado da partida e acesso à mochila.

const readline = require("readline");
const Mochila = require("./Mochila");

class Engine {
  constructor() {
    this.mochila = new Mochila();   // Estado do jogador
    this.salaAtual = null;          // Referência para sala onde o jogador está
    this.fim = false;               // Encerramento do jogo
  }

  // Loop principal do jogo
  async jogar() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const perguntar = (texto) => new Promise(res => rl.question(texto, res));

    console.log("\nBem-vindo ao jogo 'O Segredo da Biblioteca dos Relógios'!");
    console.log("Comandos úteis: pegar / usar / ir / inventario / ver / largar / fim.\n");

    // LOOP PRINCIPAL
    while (!this.fim) {
      console.log("----------------------------------------");
      console.log(this.salaAtual.descricaoCompleta());

      const comando = (await perguntar("\nO que deseja fazer? ")).trim();
      if (!comando) continue;

      const tokens = comando.split(" ").filter(Boolean);
      const acao = tokens[0].toLowerCase();

      // ENCERRAR JOGO
      if (acao === "fim") {
        this.fim = true;
        break;
      }

      // EXIBIR INVENTÁRIO
      if (acao === "inventario" || acao === "mochila") {
        console.log(this.mochila.listarFerramentas());
        continue;
      }

      // MOVER ENTRE SALAS
      if (acao === "sai") {
        if (tokens.length < 2) {
          console.log("Diga para qual sala deseja ir (ex: 'sai Biblioteca').");
          continue;
        }
        const destino = tokens.slice(1).join(" ");
        const nova = this.salaAtual.portas[destino];
        if (nova) {
          this.salaAtual = nova;
        } else {
          console.log("Não existe essa saída aqui.");
        }
        continue;
      }

      // PEGAR FERRAMENTA
      if (acao === "pega" || acao === "pegar") {
        if (tokens.length < 2) {
          console.log("Diga o que deseja pegar (ex: 'pega lanterna').");
          continue;
        }
        const nome = tokens.slice(1).join(" ");
        this.salaAtual.pegarFerramenta(nome, this.mochila);
        continue;
      }

      // LER OBJETO
      if (acao === "ler") {
        if (tokens.length < 2) {
          console.log("Diga o que deseja ler (ex: 'ler manuscrito').");
          continue;
        }
        const nome = tokens.slice(1).join(" ");
        this.salaAtual.lerObjeto(nome);
        continue;
      } 

      // USAR FERRAMENTA EM OBJETO OU OUTRA FERRAMENTA
      if (acao === "usa" || acao === "usar") {
        if (tokens.length < 3) {
          console.log("Use: usa <ferramenta> <alvo> (ex: 'usa chave caixa').");
          continue;
        }
        const nomeFerramenta = tokens[1];
        const nomeAlvo = tokens.slice(2).join(" ");
        this.salaAtual.usarFerramenta(nomeFerramenta, nomeAlvo, this.mochila, this);
        continue;
      }

      // LARGAR FERRAMENTA DO INVENTÁRIO
      if (acao === "larga" || acao === "largar") {
        if (tokens.length < 2) {
          console.log("Diga o que deseja largar (ex: 'largar lanterna').");
          continue;
        }

        const nome = tokens.slice(1).join(" ");
        const item = this.mochila.remover(nome);

        if (!item) {
          console.log("Você não tem esse item na mochila.");
          continue;
        }

        // colocar a ferramenta na sala atual
        this.salaAtual.ferramentas[nome] = item;
        console.log(`Você largou ${nome} em ${this.salaAtual.nome}.`);
        continue;
      }

      console.log("Comando desconhecido. Tente: ir / pegar / usar / ver / inventario / largar / fim.");
    }

    console.log("\nJogo encerrado!");
    rl.close();
  }

  // Encerrar jogo
  indicaFimDeJogo() {
    this.fim = true;
  }
}

module.exports = Engine;
