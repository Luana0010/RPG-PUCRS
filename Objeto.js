// Objeto.js
// Representa objetos fixos do cenário.
// Cada objeto pode ter uma função 'acao' que processa interação com uma ferramenta.

class Objeto {
  constructor(nome, descricao, acao = null) {
    this.nome = nome;
    this.descricao = descricao;
    this.acao = acao; // função opcional (ferramenta, engine, self) => boolean
    this.usado = false; 
  }

  // Interagir usando uma ferramenta
  interagir(ferramenta, engine) {
    if (typeof this.acao === "function") {
      try {
        return this.acao(ferramenta, engine, this);
      } catch (err) {
        console.error("Erro durante a ação do objeto:", err.message);
        return false;
      }
    }

    console.log("Nada acontece...");
    return false;
  }

  // Ler/observar o objeto
  ler() {
    console.log(this.descricao);
  }
}

module.exports = Objeto;
