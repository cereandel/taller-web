//creating divs into the doom
document.addEventListener('DOMContentLoaded', function() {
    let tableros = document.querySelectorAll('.tablero');

    tableros.forEach(tablero => {
        for (let i = 0; i < 100; i++) {
            let nuevoDiv = document.createElement('div');
            nuevoDiv.className = 'casilla';
            tablero.appendChild(nuevoDiv);
        }
    });
});
