document.addEventListener("DOMContentLoaded", function () {
  const formData = JSON.parse(localStorage.getItem("formData"));
  if (formData) {
    console.table(formData);
  }

  const itemsSection = document.querySelector("main .items");
  if (itemsSection) {
    itemsSection.insertAdjacentHTML(
      "beforeend",
      `
      <aside>
        <h2>Items</h2>
        <ul>
          <li>
            <img
              class="imagenLista"
              src="../assets/portaaviones.png"
              alt="portaaviones"
            />
            Portaviones
          </li>
          <li>
            <img
              class="imagenLista"
              src="../assets/acorazado.png"
              alt="portaaviones"
            />
            Acorazados
          </li>
          <li>
            <img
              class="imagenLista"
              src="../assets/crucero.png"
              alt="portaaviones"
            />
            Cruceros
          </li>
          <li>
            <img
              class="imagenLista"
              src="../assets/submarino.png"
              alt="portaaviones"
            />
            Submarinos
          </li>
          <li>
            <img
              class="imagenLista"
              src="../assets/destructor.png"
              alt="portaaviones"
            />
            Destructores
          </li>
        </ul>
      </aside>
    `
    );
  }

  const juegoSection = document.querySelector("main .juego .row");
  if (juegoSection && formData) {
    formData.forEach((player, index) => {
      const colDiv = document.createElement("div");
      colDiv.className = "col-12 col-md-6 col-lg-6 p-4";

      const playerDiv = document.createElement("div");
      playerDiv.className = `Jugador-${index + 1}`;

      const usernameDiv = document.createElement("div");
      usernameDiv.className = "username";
      usernameDiv.textContent = player;

      const tableroDiv = document.createElement("div");
      tableroDiv.className = "tablero";
      for (let i = 0; i < 100; i++) {
        const cellDiv = document.createElement("div");
        cellDiv.className = "cell";
        tableroDiv.appendChild(cellDiv);
      }

      playerDiv.appendChild(usernameDiv);
      playerDiv.appendChild(tableroDiv);
      colDiv.appendChild(playerDiv);
      juegoSection.appendChild(colDiv);
    });

    const numPlayers = formData.length;
    if (numPlayers === 3) {
      juegoSection.classList.add("row-cols-3");
    } else if (numPlayers === 4) {
      juegoSection.classList.add("row-cols-4");
    } else {
      juegoSection.classList.add("row-cols-2");
    }
  }
});
