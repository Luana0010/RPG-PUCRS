// Sala.js
// Representa cada ambiente do jogo.
// Sala delega interações para Objeto.interagir ou para Ferramenta.usar quando alvo for outra ferramenta.

const Objeto = require("./Objeto");

class Sala {
  constructor(nome) {
    this.nome = nome;

    // Cada sala mantém seus próprios elementos internos
    this.objetos = {};       // nome -> Objeto
    this.ferramentas = {};   // nome -> Ferramenta
    this.portas = {};        // nomeSala -> Sala
  }

  // Descrição da sala
  descricaoCompleta() {
    const objs = Object.keys(this.objetos).length
      ? Object.keys(this.objetos).join(", ")
      : "nenhum";

    const ferrs = Object.keys(this.ferramentas).length
      ? Object.keys(this.ferramentas).join(", ")
      : "nenhuma";

    const portas = Object.keys(this.portas).length
      ? Object.keys(this.portas).join(", ")
      : "nenhuma";

    return `Você está em ${this.nome}.\nObjetos: ${objs}\nFerramentas: ${ferrs}\nSaídas: ${portas}`;
  }

  // Pegar ferramenta disponível na sala
  pegarFerramenta(nome, mochila) {
    const ferramenta = this.ferramentas[nome];
    if (!ferramenta) {
      console.log("Essa ferramenta não está aqui.");
      return;
    }

    // tenta colocar na mochila; Se couber, remove da sala
    if (mochila.adicionar(ferramenta)) {
      delete this.ferramentas[nome];
    }
  }

  // Uso de ferramenta em objeto ou em outra ferramenta
  usarFerramenta(nomeFerramenta, nomeAlvo, mochila, engine) {
    // 1- localizar a ferramenta usada
    const ferramenta =
      mochila.obter(nomeFerramenta) || this.ferramentas[nomeFerramenta];

    if (!ferramenta) {
      console.log("Você não tem essa ferramenta e ela não está na sala.");
      return;
    }

    // 2- tentar usar em um objeto da sala
    const objeto = this.objetos[nomeAlvo];
    if (objeto) {
      const ferramentaFuncionou = ferramenta.usar(objeto, engine);
      const resultado = objeto.interagir(ferramenta, engine);

      // Consumo de ferramentas descartáveis (pilhas)
      if (ferramenta.nome === "pilhas" && resultado) {
        if (mochila.obter("pilhas")) mochila.remover("pilhas");
        else delete this.ferramentas["pilhas"];
      }
      return;
    }

    // 3- tentar usar ferramenta em outra ferramenta
    const alvoFerramenta =
      mochila.obter(nomeAlvo) || this.ferramentas[nomeAlvo];

    if (alvoFerramenta) {
      const ok = ferramenta.usar(alvoFerramenta, engine);

      // pilhas são consumidas ao recarregar
      if (ok && ferramenta.nome === "pilhas") {
        if (mochila.obter("pilhas")) mochila.remover("pilhas");
        else delete this.ferramentas["pilhas"];
      }
      return;
    }

    // 4- nada encontrado
    console.log("Não há esse alvo aqui.");
  }

  // Ler objeto
  lerObjeto(nome) {
    const objeto = this.objetos[nome];

    if (!objeto) {
      console.log("Esse objeto não está aqui.");
      return;
    }

    objeto.ler();
  }
}

module.exports = Sala;
