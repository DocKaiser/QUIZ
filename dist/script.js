// Lista de perguntas
// PARTE 1: Lista de perguntas e respostas
const perguntas = [
  {
    pergunta: "Qual o nome da principal megacorporação de Cyberpunk 2077?",
    respostas: [
      { opcao: "ARASAKA", correto: true },
      { opcao: "SAMSUNG", correto: false },
      { opcao: "SKYNET", correto: false },
      { opcao: "OMNICORP", correto: false }
    ]
  },
  {
    pergunta: "Qual o nome do vírus que devastou o mundo em The Last of Us?",
    respostas: [
      { opcao: "Cordyceps", correto: true },
      { opcao: "Necroa", correto: false },
      { opcao: "T-Virus", correto: false },
      { opcao: "Rabies+", correto: false }
    ]
  },
  {
    pergunta: "Em Fallout, qual organização é conhecida por usar sempre armaduras de poder?",
    respostas: [
      { opcao: "Irmandade de Aço", correto: true },
      { opcao: "Instituto", correto: false },
      { opcao: "NCR", correto: false },
      { opcao: "Legião de César", correto: false }
    ]
  },
  {
    pergunta: "Qual desses jogos se passa em um mundo futurista com implantes cibernéticos?",
    respostas: [
      { opcao: "Cyberpunk 2077", correto: true },
      { opcao: "Far Cry 3", correto: false },
      { opcao: "Minecraft", correto: false },
      { opcao: "Dark Souls", correto: false }
    ]
  },
  {
    pergunta: "Em Halo, qual facção quase eliminou a humanidade?",
    respostas: [
      { opcao: "Covenant", correto: true },
      { opcao: "UNSC", correto: false },
      { opcao: "Flood", correto: false },
      { opcao: "Sentinelas Forerunner", correto: false }
    ]
  },
  {
    pergunta: "Qual empresa causou o apocalipse em O Exterminador do Futuro 2?",
    respostas: [
      { opcao: "Skynet", correto: true },
      { opcao: "Cyberdyne", correto: false },
      { opcao: "Umbrella Corporation", correto: false },
      { opcao: "Tyrell Corporation", correto: false }
    ]
  },
  {
    pergunta: "Quem é o protagonista dos dois filmes de Avatar (James Cameron)?",
    respostas: [
      { opcao: "Jake Sully", correto: true },
      { opcao: "John Shepard", correto: false },
      { opcao: "Marcus Wright", correto: false },
      { opcao: "Nathan Drake", correto: false }
    ]
  },
  {
    pergunta: "Quem matou todos os deuses do Olimpo em God of War?",
    respostas: [
      { opcao: "Kratos", correto: true },
      { opcao: "Ares", correto: false },
      { opcao: "Hércules", correto: false },
      { opcao: "Aquiles", correto: false }
    ]
  },
  {
    pergunta: "Quem salva a humanidade no final da trilogia original de Halo?",
    respostas: [
      { opcao: "Master Chief", correto: true },
      { opcao: "Arbiter", correto: false },
      { opcao: "Cortana", correto: false },
      { opcao: "Johnson", correto: false }
    ]
  },
  {
    pergunta: "Qual é o nome do protagonista de Half-Life?",
    respostas: [
      { opcao: "Gordon Freeman", correto: true },
      { opcao: "Isaac Clarke", correto: false },
      { opcao: "Alex Mercer", correto: false },
      { opcao: "Morgan Yu", correto: false }
    ]
  }
];

// Variáveis de controle
let indiceAtual = 0;
let acertos = 0;

// Elementos do DOM
const perguntaEl = document.querySelector(".pergunta");
const respostasEl = document.querySelector(".respostas");
const progressoEl = document.querySelector(".progresso");
const fimEl = document.querySelector(".fim");

// Função para embaralhar array (Fisher-Yates)
function embaralharArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Função para carregar a pergunta atual
function carregarPergunta() {
  const perguntaAtual = perguntas[indiceAtual];

  // Atualiza texto da pergunta
  perguntaEl.textContent = perguntaAtual.pergunta;

  // Atualiza progresso
  progressoEl.textContent = `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;

  // Limpa as respostas anteriores
  respostasEl.innerHTML = "";

  // Embaralha as respostas
  const respostasEmbaralhadas = [...perguntaAtual.respostas];
  embaralharArray(respostasEmbaralhadas);

  // Cria os botões de resposta
  respostasEmbaralhadas.forEach((resposta) => {
    const botao = document.createElement("button");
    botao.textContent = resposta.opcao;
    botao.classList.add("botao-resposta");

    // Adiciona comportamento ao clicar
    botao.onclick = function () {
      const botoes = document.querySelectorAll(".botao-resposta");

      // Desabilita todos os botões após o clique
      botoes.forEach((b, i) => {
        b.disabled = true;

        if (respostasEmbaralhadas[i].correto) {
          b.classList.add("correto");
        } else {
          b.classList.add("errado");
        }
      });

      // Verifica se acertou e soma pontos
      if (resposta.correto) {
        acertos++;
      }

      // Espera 1 segundo antes de passar para a próxima pergunta
      setTimeout(() => {
        indiceAtual++;
        if (indiceAtual < perguntas.length) {
          carregarPergunta();
        } else {
          finalizarJogo();
        }
      }, 1000);
    };

    respostasEl.appendChild(botao);
  });
}

// Função para exibir resultado final
function finalizarJogo() {
  document.querySelector(".conteudo").style.display = "none";
  fimEl.style.display = "flex";
  fimEl.querySelector("span").textContent = `Você acertou ${acertos} de ${perguntas.length} perguntas!`;
}

// Inicia o jogo ao carregar a página
carregarPergunta();