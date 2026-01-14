// Mochila.js
// Implementação completa da mochila com capacidade limitada,
// adicionar, remover, listar e obter ferramentas.

class Mochila {
  constructor(capacidade = 3) {
    this._capacidade = capacidade;
    this._ferramentas = [];
  }

  adicionar(ferramenta) {
    if (!ferramenta || !ferramenta.nome) {
      console.log("Ferramenta inválida.");
      return false;
    }

    if (this._ferramentas.length >= this._capacidade) {
      console.log("A mochila está cheia!");
      return false;
    }

    this._ferramentas.push(ferramenta);
    console.log(`${ferramenta.nome} adicionado à mochila.`);
    return true;
  }

  obter(nome) {
    return this._ferramentas.find(f => f.nome === nome);
  }

  remover(nome) {
    const idx = this._ferramentas.findIndex(f => f.nome === nome);
    if (idx === -1) return null;
    return this._ferramentas.splice(idx, 1)[0];
  }

  listarFerramentas() {
    if (this._ferramentas.length === 0) {
      return "Mochila vazia.";
    }

    const lista = this._ferramentas.map(f => {
      if (f.nome === "lanterna" && typeof f.carga !== "undefined") {
        return `${f.nome} (carga:${f.carga})`;
      }
      return f.nome;
    });

    return "Na mochila: " + lista.join(", ");
  }
}

module.exports = Mochila;
