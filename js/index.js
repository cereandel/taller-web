var usersKeys = [];

function getFormData() {
  const form = document.getElementById("usernames-form");
  const inputs = form.getElementsByTagName("input");
  const formData = [];

  for (let input of inputs) {
    formData.push(input.value);
  }

  return formData;
}

function webSocket(usersKey) {
  const exampleSocket = new WebSocket(
    "ws://program-web-taller-4-production.up.railway.app"
  );
  exampleSocket.onopen = () => {
    exampleSocket.send(usersKey);
  };
  exampleSocket.onmessage = (event) => {
    const receivedMsg = event.data;
    console.log(receivedMsg);
  };
}

async function postUsernames(player) {
  const url = "https://program-web-taller-4-production.up.railway.app/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: player }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    usersKeys.push(json.key);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

document
  .getElementById("usernames-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = getFormData();
    console.table(formData);
    localStorage.setItem("formData", JSON.stringify(formData));
    const postPromises = formData.map((player) => postUsernames(player));
    try {
      await Promise.all(postPromises);
      const webSocketPromises = usersKeys.map((key) => webSocket(key));
      await Promise.all(webSocketPromises);
      console.log("all the calls to postUsername completed.");
      localStorage.setItem("keys", JSON.stringify(usersKeys));
      setTimeout(() => {
        window.location.href = "html/juego.html";
      }, 5000);
    } catch (error) {
      usersKeys = [];
      console.error("error on the calls of postUsername", error);
    }
  });

function generatePlayerInputs(selectedValue) {
  const playerCount = selectedValue;
  const modalBody = document.querySelector("#Modal2 .modal-body");

  modalBody.innerHTML = "";

  for (let i = 0; i < playerCount; i++) {
    const div = document.createElement("div");
    div.className = "input-group mb-3";

    const span = document.createElement("span");
    span.className = "input-group-text";
    span.id = "basic-addon1";
    span.textContent = "@";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "form-control";
    input.placeholder = "Username " + (i + 1);
    input.ariaLabel = "Username";
    input.ariaDescribedby = "basic-addon1";
    input.required = true;

    div.appendChild(span);
    div.appendChild(input);
    modalBody.appendChild(div);
  }
}

document
  .getElementById("game-options-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const selectElement = event.target.querySelector("select");
    const selectedValue = selectElement.value;

    console.log("Cantidad de jugadores seleccionada:", selectedValue);
    generatePlayerInputs(selectedValue);
  });

document.getElementById("optionSelect").addEventListener("change", function () {
  var saveButton = document.getElementById("saveChangesButton");
  if (this.value) {
    saveButton.disabled = false;
  } else {
    saveButton.disabled = true;
  }
});
