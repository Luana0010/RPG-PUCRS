// Sala.js
// Ambientes do jogo

const Objeto = require("./Objeto");

class Sala {
  constructor(nome) {
    this.nome = nome;
    this.objetos = {};
    this.ferramentas = {};
    this.portas = {};
  }

  descricaoCompleta() {
    const objs = Object.keys(this.objetos).join(", ") || "nenhum objeto";
    const ferrs = Object.keys(this.ferramentas).join(", ") || "nenhuma ferramenta";
    const portas = Object.keys(this.portas).join(", ") || "nenhuma saída";
    return `Você está em ${this.nome}.\nObjetos: ${objs}\nFerramentas: ${ferrs}\nSaídas: ${portas}`;
  }

  pegarFerramenta(nome, mochila) {
    const ferramenta = this.ferramentas[nome];
    if (!ferramenta) return console.log("Essa ferramenta não está aqui.");
    if (mochila.adicionar(ferramenta)) delete this.ferramentas[nome];
  }

  usarFerramenta(nomeFerramenta, nomeAlvo, mochila, engine) {
  const ferramenta = mochila.obter(nomeFerramenta) || this.ferramentas[nomeFerramenta];
  if (!ferramenta) return console.log("Você não tem essa ferramenta nem ela está aqui.");

  // 1️⃣ Tenta achar um objeto na sala
  const objeto = this.objetos[nomeAlvo];
  if (objeto) {
    try {
      objeto.interagir(ferramenta, engine);
    } catch (erro) {
      console.error("⚠️ Erro ao tentar usar a ferramenta:", erro.message);
    }
    return;
  }

  // 2️⃣ Tenta achar uma ferramenta alvo (pode estar na mochila)
  const alvoFerramenta = mochila.obter(nomeAlvo);
  if (alvoFerramenta) {
    // Caso especial: recarregar lanterna com pilhas
    if (nomeFerramenta === "pilhas" && nomeAlvo === "lanterna") {
      alvoFerramenta.carga = 3;
      console.log("🔋 Você colocou as pilhas novas na lanterna. Ela está totalmente recarregada! 💡");

      // Remove as pilhas da mochila ou da sala, dependendo de onde estavam
      if (mochila.obter("pilhas")) mochila.remover("pilhas");
  else delete this.ferramentas["pilhas"];

  return;
}
    console.log("Essas ferramentas não interagem entre si.");
    return;
  }

  console.log("Esse objeto não está aqui.");
}

  lerObjeto(nome) {
    const obj = this.objetos[nome];
    if (!obj) return console.log("Não há esse objeto aqui.");
    obj.ler();
  }
}

module.exports = Sala;