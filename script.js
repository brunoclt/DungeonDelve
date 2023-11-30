const personagem = document.querySelector(".personagem");
const charizard = document.querySelector(".charizard");
const pig = document.querySelector(".pig");
const jogoInfo = document.querySelector(".jogo");
var telaFinalizar = document.getElementById("telaFinalizar");
let pontuacao = 0;
let gameOver = false;
let pigVisivel = false; 
const intervaloAparecer = 2400; 
const intervaloDesaparecer = 5200; 

function updatePontuacao() {
  pontuacao++;
  jogoInfo.innerHTML = `Pontuação: <span id="pontuacao" style="color: gold;">${pontuacao}</span>`;
}

function personagemPassouPeloInimigo() {
  if (!gameOver) {
    updatePontuacao();
  }
}

function telaFinalizar_Toogle() {
  if (telaFinalizar.style.display === "none") {
    telaFinalizar.style.display = "block";
    jogoInfo.classList.add("game-over");
    document.getElementById("pontuacaoFinal").innerText = pontuacao;
    document.getElementById("pontuacaoFinal").insertAdjacentHTML('afterend', '<span class="pontos-text"></span>');
    console.log("telaFinalizar.style.display = block");
  } else {
    telaFinalizar.style.display = "none";
    console.log("telaFinalizar.style.display = none");
  }
}

const jump = () => {
  if (!gameOver) {
    personagem.classList.add("jump");

    setTimeout(() => {
      personagem.classList.remove("jump");
    }, 500);
  }
};

function desaparecerImagem() {
  pig.style.display = 'none';
  setTimeout(aparecerImagem, intervaloAparecer);
}

function aparecerImagem() {
  pig.style.display = 'block';
  pigVisivel = true; 
  setTimeout(() => {
    pigVisivel = false; 
    desaparecerImagem();
  }, intervaloDesaparecer);
}

function loopPig() {
  if (!gameOver) {
    aparecerImagem();
  }
}

const loop = setInterval(() => {
  const charizardPosition = charizard.offsetLeft;
  const personagemPosition = parseInt(window.getComputedStyle(personagem).bottom.replace("px", ""));
  const pigPosition = pig.offsetLeft; 

  personagemPassouPeloInimigo();

  if (!charizardPosition) return;

  if (
    (charizardPosition <= 45 && charizardPosition >= -85 && personagemPosition <= 0) ||
    (pigVisivel && pigPosition <= 45 && pigPosition >= -85 && personagemPosition <= 0) 
  ) {
    gameOver = true;

    telaFinalizar_Toogle();

    charizard.style.animation = "none";
    personagem.style.animation = "none";
    pig.style.animation = "none";

    charizard.style.left = `${charizardPosition}px`;
    personagem.style.bottom = `${personagemPosition}px`;
    pig.style.left = `${pigPosition}px`;

    telaFinalizar_Toogle();
  }
}, 100);

loopPig();

const reiniciarJogoButton = document.getElementById("reiniciarJogo");

reiniciarJogoButton.addEventListener("click", () => {
  reiniciarJogo();
});

document.addEventListener("touchstart", () => {
  if (!gameOver) {
    jump();
  }
});

document.addEventListener("keydown", () => {
  if (!gameOver) {
    jump();
  }
});

function reiniciarJogo() {
  location.reload();
};

