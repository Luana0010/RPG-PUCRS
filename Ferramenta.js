// Ferramenta.js
// Classe base Ferramenta e subclasses com comportamento próprio (herança + polimorfismo).

class Ferramenta {
  constructor(nome, descricao = "") {
    this.nome = nome;
    this.descricao = descricao;
  }

  usar(alvo, engine) {
    console.log("Nada acontece com essa ferramenta por si só.");
    return false;
  }
}

// CHAVE
class Chave extends Ferramenta {
  constructor() {
    super("chave", "uma chave antiga com dois usos");
    this._usos = 2;
  }

  usar(alvo, engine) {
    if (!alvo || alvo.nome !== "caixa") {
      console.log("A chave só funciona na caixa.");
      return false;
    }

    if (this._usos <= 0) {
      console.log("A chave está desgastada e não serve mais.");
      return false;
    }

    this._usos--;
    console.log("Você usou a chave.");
    return true;
  }

  get usos() {
    return this._usos;
  }
}

// LANTERNA
class Lanterna extends Ferramenta {
  constructor() {
    super("lanterna", "uma lanterna velha movida a pilhas");
    this._carga = 3;
  }

  usar(alvo, engine) {
    if (this._carga <= 0) {
      console.log("A lanterna está sem carga.");
      return false;
    }

    this._carga--;
    console.log(`Você usou a lanterna. Carga restante: ${this._carga}`);
    return true;
  }

  recarregar(qtd = 3) {
    this._carga = qtd;
  }

  get carga() {
    return this._carga;
  }
}

// FACA
class Faca extends Ferramenta {
  constructor() {
    super("faca", "uma faca pequena e afiada");
    this._usos = 1;
  }

  usar(alvo, engine) {
    if (this._usos <= 0) {
      console.log("A faca está sem fio e não é mais útil.");
      return false;
    }

    this._usos--;
    console.log("Você usou a faca.");
    return true;
  }

  get usos() {
    return this._usos;
  }
}

// PILHAS
class Pilhas extends Ferramenta {
  constructor(qtd = 1) {
    super("pilhas", "um conjunto de pilhas novas");
    this._qtd = qtd;
  }

  usar(alvo, engine) {
    if (!alvo || alvo.nome !== "lanterna") {
      console.log("As pilhas só servem para recarregar a lanterna.");
      return false;
    }

    alvo.recarregar(3);
    console.log("A lanterna foi recarregada.");
    return true;
  }

  get quantidade() {
    return this._qtd;
  }
}

module.exports = { Ferramenta, Chave, Lanterna, Faca, Pilhas };
