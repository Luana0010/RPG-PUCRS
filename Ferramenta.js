// Ferramenta.js
// Classe base e subclasses

class Ferramenta {
  constructor(nome, descricao = "") {
    this.nome = nome;
    this.descricao = descricao;
  }
}

class Chave extends Ferramenta {
  constructor() {
    super("chave");
    this.usos = 2;
  }

  usar() {
    this.usos--;
    if (this.usos < 0) return false;
    return true;
  }
}

class Lanterna extends Ferramenta {
  constructor() {
    super("lanterna", "uma lanterna velha com espaço para pilhas");
    this.carga = 3;
  }

  usar(alvo, engine) {
    // Verifica se ainda há carga
    if (this.carga <= 0) {
      console.log("A lanterna não acende — as pilhas estão descarregadas! 🔋");
      return;
    }

    // Gasta 1 carga
    this.carga--;
    console.log(`Você acendeu a lanterna. Carga restante: ${this.carga}`);

    // Ação especial: iluminar o painel
   // if (alvo && alvo.nome === "painel") {
    //  console.log("O painel foi iluminado! Há algo gravado nele...");
    //  engine.salaAtual["Porao"].objetos.caixa = new Objeto(
    //    "caixa",
    //    "uma caixa metálica trancada. Parece haver algo dentro.",
    //    (f, eng) => {
    //      if (f.nome === "chave") {
    //        console.log("Você abriu a caixa e encontrou o Relógio do Fundador! 🕰️");
    //        eng.fim = true;
    //      } else {
    //        console.log("Essa ferramenta não serve aqui.");
    //      }
    //    }
    //  );
    //}

    if (this.carga === 0) {
      console.log("A lanterna apaga. As pilhas acabaram. 💀");
    }
  }
}

class Faca extends Ferramenta {
  constructor() {
    super("faca");
    this.usos = 1;
  }

  usar() {
    this.usos--;
    return this.usos > 0;
  }
}

module.exports = { Ferramenta, Chave, Lanterna, Faca };