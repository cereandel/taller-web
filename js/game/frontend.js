import Controller from "./backend/controller.js";

var backend;
var selectedItem;
var orientation = "horizontal";
var shipSizes;

async function loadShips() {
  try {
    shipSizes = await backend.getDataShips();
    console.log('ships loaded from "controller.js" using the fetch method.');
    console.table(shipSizes);
  } catch (error) {
    window.location.href = "../index.html";
    console.error("error loading, going back to the menu: ", error);
  }
}

function getShipSize(selectedItem) {
  for (let i = 0; i < shipSizes.length; i++) {
    if (shipSizes[i].name == selectedItem) {
      return shipSizes[i].spaces;
    }
  }
}

function colorCell(cell) {
  const tablero = cell.closest(".tablero");
  const cellId = cell.id;
  const letters = "abcdefghij";
  const letter = cellId[0];
  const number = parseInt(cellId.slice(1));

  let cellsToColor = [];
  for (let i = 0; i < getShipSize(selectedItem); i++) {
    let targetCell;
    if (orientation === "horizontal") {
      targetCell = tablero.querySelector(`#${letter}${number + i}`);
    } else {
      const letterIndex = letters.indexOf(letter);
      targetCell = tablero.querySelector(
        `#${letters[letterIndex + i]}${number}`
      );
    }
    if (targetCell && !targetCell.classList.contains("colored-cell")) {
      cellsToColor.push(targetCell);
    } else {
      cellsToColor = [];
      break;
    }
  }

  if (cellsToColor.length === getShipSize(selectedItem)) {
    cellsToColor.forEach((cell) => cell.classList.add("colored-cell"));
  }
}

function hoverEffect(cell, add) {
  const tablero = cell.closest(".tablero");
  const cellId = cell.id;
  const letters = "abcdefghij";
  const letter = cellId[0];
  const number = parseInt(cellId.slice(1));
  const idElement = cell.closest(".Jugador").className;
  const id = idElement.split(" ")[1];

  if (backend.getCurrentPlayerTurnIndex() + 1 == id) {
    let cellsToHover = [];
    for (let i = 0; i < getShipSize(selectedItem); i++) {
      let targetCell;
      if (orientation === "horizontal") {
        targetCell = tablero.querySelector(`#${letter}${number + i}`);
      } else {
        const letterIndex = letters.indexOf(letter);
        targetCell = tablero.querySelector(
          `#${letters[letterIndex + i]}${number}`
        );
      }
      if (targetCell && !targetCell.classList.contains("colored-cell")) {
        cellsToHover.push(targetCell);
      } else {
        cellsToHover = [];
        break;
      }
    }

    if (cellsToHover.length === getShipSize(selectedItem)) {
      cellsToHover.forEach((cell) => {
        if (add) {
          cell.classList.add("hover-cell");
        } else {
          cell.classList.remove("hover-cell");
        }
      });
    }
  }
}

function placeSchip() {
  const cells = document.querySelectorAll("main .juego .tablero .cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", function () {
      if (selectedItem) {
        const idElement = cell.closest(".Jugador").className;
        const id = idElement.split(" ")[1];
        const username = document.querySelector(".username").textContent;
        if (backend.getCurrentPlayerTurnIndex() + 1 == id) {
          colorCell(cell);
        }
      }
    });

    cell.addEventListener("mouseover", function () {
      hoverEffect(cell, true);
    });

    cell.addEventListener("mouseout", function () {
      hoverEffect(cell, false);
    });
  });
}

function selectShip() {
  const listItems = document.querySelectorAll("aside ul li");

  listItems.forEach((item) => {
    item.addEventListener("click", function () {
      let selectedImg = this.querySelector(".imagenLista");
      selectedItem = this.textContent.trim();
      if (selectedImg) {
        if (selectedImg.style.border === "2px solid rgb(218, 127, 20)") {
          selectedImg.style.border = "none";
          selectedImg.classList.remove("fade-in-border");
          selectedItem = null;
        } else {
          listItems.forEach((li) => {
            const img = li.querySelector(".imagenLista");
            if (img) {
              img.style.border = "none";
              img.classList.remove("fade-in-border");
            }
          });
          selectedImg.style.border = "2px solid rgb(218, 127, 20)";
          selectedImg.classList.add("fade-in-border");
          selectedItem = this.textContent.trim();
        }
      }
    });
  });
}

function generateItems() {
  const itemsSection = document.querySelector("main .items");
  if (itemsSection) {
    const itemsHTML = `
    <aside>
      <h2>Items</h2>
      <ul>
        <li>
          <img
            class="imagenLista"
            src="../assets/portaaviones.webp"
            alt="portaaviones"
          />
          Portaaviones
        </li>
        <li>
          <img
            class="imagenLista"
            src="../assets/acorazado.webp"
            alt="acorazado"
          />
          Acorazado
        </li>
        <li>
          <img
            class="imagenLista"
            src="../assets/crucero.webp"
            alt="crucero"
          />
          Crucero
        </li>
        <li>
          <img
            class="imagenLista"
            src="../assets/submarino.webp"
            alt="submarino"
          />
          Submarino
        </li>
        <li>
          <img
            class="imagenLista"
            src="../assets/destructor.webp"
            alt="destructor"
          />
          Destructor
        </li>
      </ul>
      <button type="button" class="btn btn-warning sentido">Horizontal</button>
    </aside>
  `;
    itemsSection.insertAdjacentHTML("beforeend", itemsHTML);
  }
}

function generateBoard(jugadores) {
  const juegoSection = document.querySelector("main .juego .row");
  if (juegoSection && jugadores) {
    jugadores.forEach((player, index) => {
      const colDiv = document.createElement("div");
      colDiv.className = "col-12 col-md-6 col-lg-6 tableros-container";

      const playerDiv = document.createElement("div");
      playerDiv.className = `Jugador ${index + 1}`;

      const usernameDiv = document.createElement("div");
      usernameDiv.className = "username";
      usernameDiv.textContent = player;

      const tableroDiv = document.createElement("div");
      tableroDiv.className = "tablero";
      const letters = "abcdefghij";
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          const cellDiv = document.createElement("div");
          cellDiv.className = "cell";
          cellDiv.id = `${letters[row]}${col + 1}`;
          tableroDiv.appendChild(cellDiv);
        }
      }

      playerDiv.appendChild(usernameDiv);
      playerDiv.appendChild(tableroDiv);
      colDiv.appendChild(playerDiv);
      juegoSection.appendChild(colDiv);
    });

    const numPlayers = jugadores.length;
    if (numPlayers === 3) {
      juegoSection.classList.add("row-cols-3");
    } else if (numPlayers === 4) {
      juegoSection.classList.add("row-cols-4");
    } else {
      juegoSection.classList.add("row-cols-2");
    }
  }
}

function generateFront(jugadores) {
  loadShips();
  generateItems();
  generateBoard(jugadores);
  const button = document.querySelector(".btn-warning");
  button.addEventListener("click", function () {
    if (button.textContent === "Horizontal") {
      button.textContent = "Vertical";
      orientation = "vertical";
    } else {
      button.textContent = "Horizontal";
      orientation = "horizontal";
    }
  });
}

function init() {
  const formData = JSON.parse(localStorage.getItem("formData"));
  const keys = JSON.parse(localStorage.getItem("keys"));

  const defaultItems = new Map([
    ["portaaviones", 1],
    ["acorazado", 1],
    ["crucero", 1],
    ["submarino", 1],
    ["destructor", 1],
  ]);

  const players = [];

  formData.forEach((player, index) => {
    players.push({
      name: player,
      id: keys[index],
      items: new Map(defaultItems),
    });
  });

  backend = new Controller(players);
  generateFront(formData);
}

document.addEventListener("DOMContentLoaded", init());

document
  .getElementsByClassName("items")[0]
  .addEventListener("click", selectShip());

document
  .getElementsByClassName("tablero")[0]
  .addEventListener("click", placeSchip());

/*console.log(
  "turno de: ",
  backend.getCurrentPlayerTurn().getUsername(),
  backend.getCurrentPlayerTurn().getId()
);*/
