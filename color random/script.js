// Seleccionar los elementos
const boton = document.querySelector('button');
const h2 = document.querySelector('h2');

// Crear evento
boton.addEventListener('click', function () {
    // Almacenar funcion cambio de color
    const newColor = makeRandColor();
    // Cambiar color del backgroun
    document.body.style.backgroundColor = newColor;
    // Mostrar texto de rgb
    h2.innerText = newColor;
})

    // Crear funcion cambio de color
const makeRandColor = () => {
    // Random para cada r-g-b
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    // Devolver los valores randoms
    return `rgb(${r}, ${g}, ${b})`;
}
