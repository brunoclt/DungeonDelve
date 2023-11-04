const personagem = document.querySelector(".personagem");
const charizard = document.querySelector(".charizard");
const jogoInfo = document.querySelector(".jogo");
var telaFinalizar = document.getElementById("telaFinalizar");
let pontuacao = 0;
let gameOver = false;
let dVelocidade = 1.7;

const reiniciarJogoButton = document.getElementById("reiniciarJogo");

function updatePontuacao() {
  pontuacao++;
  jogoInfo.innerHTML = `V 1.0.9 | Pontuação: <span id="pontuacao" style="color: gold;">${pontuacao}</span>`;
}

function personagemPassouPeloCharizard() {
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

const loop = setInterval(() => {
  const charizardPosition = charizard.offsetLeft;
  const personagemPosition = parseInt(window.getComputedStyle(personagem).bottom.replace("px", ""));

  personagemPassouPeloCharizard();

  if (!charizardPosition) return;

  if (charizardPosition <= 45 && charizardPosition >= -85 && personagemPosition <= 0 && !gameOver) {
    gameOver = true;

    telaFinalizar_Toogle();

    charizard.style.animation = "none";
    personagem.style.animation = "none";

    charizard.style.left = `${charizardPosition}px`;
    personagem.style.bottom = `${personagemPosition}px`;

    telaFinalizar_Toogle();
    
  }
}, 100);

//telaFinalizar_Toogle();

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
}

const mostrarAtualizacoesButton = document.getElementById("mostrarAtualizacoes");
const atualizacoesContent = "\n- **Já estamos trabalhando em um novo fundo/personagens** Próximas atualizações:\n- Melhoria na interface de usuário\n- Melhorias na jogabilidade\n- Som e Musica\n- Novas Fases\n- Quadro De Lideres\n- Multijogador\n- Obstáculos\n- Power-ups\n- Missões\n- Melhorias na jogabilidade mobile\n- Novos Modos\n- Conquistas\n- Moedas\n- Próxima atualização: 1.0.10";

mostrarAtualizacoesButton.addEventListener("click", () => {
  alert(atualizacoesContent); 
});