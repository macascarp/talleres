// Todos los hoyos
const holes = document.querySelectorAll('.hole');
// Numero de puntos
const scoreBoard = document.querySelector('.score');
// Topos
const moles = document.querySelectorAll('.mole');

const countdownBoard = document.querySelector('.countdown');
// Boton
const startButton = document.querySelector('.startButton');

// Ultimo hoyo del que salio
let lastHole;
let timeUp = false;
// Tiempo que dura el juego
let timeLimit = 20000;
// Contador de puntos
let score = 0;
// Global scope
let countdown;

/* Adherir random UpClass a uno de los seis hoyos
para animarlos a subir y bajar. */

/* Esta funcion elige un hoyo distinto al anterior.
'holes' contiene los 6 hoyos. */

function pickRandomHole(holes) {
    // Debe retornar un nro del 0 al 6 (por la cant de hoyos)
    const randomHole = Math.floor(Math.random() * holes.length);
    // Le paso el nro random que salio (seria el hoyo disponible)
    const hole = holes[randomHole];

    // Asegurar que el nro elegido es distinto del anterior
    if (hole === lastHole) {
    // Si son iguales, volver a correr la funcion
        return pickRandomHole(holes);
    }
    // Volver a comparar
    lastHole = hole;
    // Retornar el nro final
    return hole;
}

// Elige un tiempo random hasta que sale el proximo topo
function popOut() {
    // Nro de segundos
    const time = Math.random() * 1300 + 400;
    // Elegir un hoyo
    const hole = pickRandomHole(holes);
    // Tomara el div del hoyo elegido y agregara la clase 'up'
    // En CSS esta la clase 'up' y hace que el obj salga del hoyo
    hole.classList.add('up');
    /* Establece un tiempo entre 400 a 1700 ms
    Espera 2 atributos. La funcion a llamar y el tiempo que se 
    debe esperar hasta llamarla */
    setTimeout(function(){

    // Para remover la clase UP y asi esconder el topo
        hole.classList.remove('up');
    // Checkeamos si el juego no terminó
        if (!timeUp) popOut();
    /* Si no terminó, llamamos a PopUp otra vez para 
    elegir otro hoyo */
    }, time);
}

// Ejecutar
popOut();

function startGame() {
    // Cuantos segundos quedan antes de que termine el juego
     countdown = timeLimit/1000;
     // Para que cambie el puntaje segun el juego
     scoreBoard.textContent = 0;
    // Para que se vea el puntaje mientras corre el juego
     scoreBoard.style.display = 'block';
    // Cuenta regresiva
     countdownBoard.textContent = countdown;
    // Para settear en true cuando volvamos a jugar
     timeUp = false;
    // Para resetear
     score = 0;

     // Hara que salgan los topos
     popOut();
    /* Si timeUp es true, se abre el IF de la linea 62.
    Espera 2 args, la funcion y el valor en ms del tiempo a 
    esperar para que corra esa funcion */

    /* Set timeOut es una sola vez */
     setTimeout(function(){
    // Evita que haya un problema con el timeUp de arriba
        timeUp = true;
     }, timeLimit);

     /* 2 arg, una funcion y el valor en ms de la frecuencia 
     con la que se ejecutara (una y otra vez)*/
     let startCountdown = setInterval(function(){
         // Va restando de a 1 en la cuenta regresiva
         countdown -= 1;
         countdownBoard.textContent = countdown;
    // Si la cuenta regresiva se termina...
         if (countdown < 0) {
        // ... Settear en cero de nuevo
             countdown = 0;
    // Limpia la cuenta regresiva para volver a correr
             clearInterval(startCountdown);
             countdownBoard.textContent = 'Times UP! Thanks for play';
         }
         // Correr esta funcion cada 1000 ms (1seg)
     }, 1000);
    }

    // Boton de comenzar
    startButton.addEventListener('click', startGame);

    function whack(e) {
        // Sumar un punto
        score++;
        // Cuando sale, mostrar la imagen
        this.style.backgroundImage = 'url("/img/unicorn.png")';
        setTimeout(function(){
        // Cuando se toca con el puntero que muestre otra (una que genere algun efecto de movimiento)
            this.style.backgroundImage = 'url("/img/unicorn.png")';
        }, 800);
        // Mostrar puntaje
        scoreBoard.textContent = score;
    }
    // Por cada click, llamar a la funcion 'Whack'
    moles.forEach(mole => mole.addEventListener('click', whack));
    
    /* Bind enlaza una referencia y obliga a JS a recordar
    para que es esa key*/
