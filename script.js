// Elementos del DOM
const userInput = document.getElementById("userInput");
const countdown = document.getElementById("countdown");
const result = document.getElementById("result");
const restartButton = document.getElementById("restart");

// Variables
let gameInProgress = false;

// Función que inicia el juego
function startGame() {
  // Verificar que el número introducido sea válido
  const number = parseInt(userInput.value);
  if (isNaN(number) || number < 1 || number > 3) {
    alert("Por favor, introduce un número del 1 al 3.");
    return;
  }

  if (gameInProgress) return; // Evitar iniciar un nuevo juego mientras otro está en progreso
  gameInProgress = true;

  // Mostrar el mensaje inicial y la cuenta atrás
  result.textContent = '';
  countdown.textContent = '¡Cuenta atrás iniciada!';

  // Iniciar la cuenta atrás de 5 segundos
  let timeLeft = 5;
  const intervalId = setInterval(() => {
    countdown.textContent = `Tiempo restante: ${timeLeft} segundos.`;
    timeLeft--;

    // Cuando llegue a 0, detener el intervalo y evaluar el número
    if (timeLeft < 0) {
      clearInterval(intervalId); // Detener el intervalo
      evaluateGame(number); // Evaluar el número después de la cuenta atrás
    }
  }, 1000); // Actualizar cada segundo
}

// Función para evaluar el resultado del juego
function evaluateGame(number) {
  // Simular la bomba con un número aleatorio entre 1 y 3
  const bombNumber = Math.floor(Math.random() * 3) + 1;

  // Evaluar si el jugador ha salvado el mundo o si la bomba ha estallado
  if (number === bombNumber) {
    result.textContent = "¡BOOM! La bomba ha estallado. ¡Juego perdido!";
  } else {
    result.textContent = "¡Has salvado el mundo! No hubo bomba.";
  }

  gameInProgress = false; // Reiniciar
}

function restartGame() {
  userInput.value = ''; // Limpiar el campo de entrada
  countdown.textContent = ''; // Limpiar el contador
  result.textContent = ''; // Limpiar el resultado
  gameInProgress = false; // Marcar que el juego no está en progreso
  startGame(); // Volver a iniciar el juego
}

userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    startGame();
  }
});


restartButton.addEventListener('click', restartGame);