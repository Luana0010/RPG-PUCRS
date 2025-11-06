// Objeto.js
// Objetos interativos no jogo

class Objeto {
  constructor(nome, descricao, acao = null) {
    this.nome = nome;
    this.descricao = descricao;
    this.acao = acao;
    this.usado = false;
  }

  interagir(ferramenta, engine) {
    if (this.acao) return this.acao(ferramenta, engine);
    console.log("Nada acontece...");
    return false;
  }

  ler() {
    console.log(`Você observa ${this.descricao}`);
  }
}

module.exports = Objeto;