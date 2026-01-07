const imagem = document.getElementById("ImagemCarta");
const botaoID = document.getElementById("BotaoPesquisarID");
const botaoName = document.getElementById("BotaoPesquisarNome");
const input = document.getElementById("InputId");
const baseURL = "http://localhost:3000";

botaoID.addEventListener("click", () => {
  pesquisarPokemonPorID(input.value);
});

botaoName.addEventListener("click", () => {
  pesquisarPokemonPorNome(input.value);
});

imagem.addEventListener("load", () => {
  imagem.style.opacity = "1";
  console.log("Imagem exibida com sucesso!");
});

function pesquisarPokemonPorID(id) {
  if (!id) return alert("Digite um ID!");

  console.log("Iniciando Pesquisa...");
  imagem.style.opacity = "0.5";

  fetch(`${baseURL}/pokemon/${capitalizar(id)}`)
    .then((res) => {
      if (!res.ok) throw new Error("Carta não encontrada");

      console.log("Convertendo Para JSON...");
      return res.json();
    })
    .then((data) => {
      console.log("Dados recebidos:", data.name);
      console.log("Caregando Imagem...");

      if (data.image == undefined) {
        console.log("Esse Pokémon não possui imagem registrada!");
        alert("Esse Pokémon não possui imagem registrada!");
        imagem.style.opacity = 1;
        return;
      }

      const urlImagem = data.image + "/high.png";

      imagem.src = urlImagem;
      imagem.alt = data.name;
    })
    .catch((err) => {
      console.error("Erro na pesquisa:", err);
      alert("Erro ao buscar Pokémon. Verifique se o ID está correto.");
      imagem.style.opacity = "1";
    });
}

function pesquisarPokemonPorNome(name) {
  if (!name) return alert("Digite um Nome!");

  console.log("Iniciando Pesquisa...");
  imagem.style.opacity = "0.5";

  fetch(`${baseURL}/pokemon/busca/${capitalizar(name)}`)
    .then((res) => {
      if (!res.ok) throw new Error("Carta não encontrada");

      console.log("Convertendo Para JSON...");
      return res.json();
    })
    .then((data) => {
      let card = data[data.length - 1];
      console.log("Dados recebidos: " + card.name);
      console.log(`Caregando Imagenm...`);

      let i = 1;
      while (card.image == undefined) {
        i++;
        card = data[data.length - i];
      }

      const urlImagem = card.image + "/high.png";

      imagem.src = urlImagem;
      imagem.alt = card.name;
    })
    .catch((err) => {
      console.error("Erro na pesquisa:", err);
      alert("Erro ao buscar Pokémon. Verifique se o Nome está correto.");
      imagem.style.opacity = "1";
    });
}

function capitalizar(palavra) {
  return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
}
