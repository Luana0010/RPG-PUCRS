// Mochila.js
// Armazena as ferramentas do jogador

class Mochila {
  constructor() {
    this.ferramentas = [];
    this.capacidade = 3;
  }

  adicionar(ferramenta) {
    if (this.ferramentas.length >= this.capacidade) {
      console.log("A mochila está cheia!");
      return false;
    }
    this.ferramentas.push(ferramenta);
    console.log(`${ferramenta.nome} adicionado à mochila.`);
    return true;
  }

  obter(nome) {
    return this.ferramentas.find(f => f.nome === nome);
  }

  remover(nome) {
    const index = this.ferramentas.findIndex(f => f.nome === nome);
    if (index !== -1) this.ferramentas.splice(index, 1);
  }

  listarFerramentas() {
    if (this.ferramentas.length === 0) return "Mochila vazia.";
    return "Na mochila: " + this.ferramentas.map(f => f.nome).join(", ");
  }
}

module.exports = Mochila;