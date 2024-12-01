function getFormData() {
  const form = document.getElementById("usernames-form");
  const inputs = form.getElementsByTagName("input");
  const formData = [];

  for (let input of inputs) {
    formData.push(input.value);
  }

  return formData;
}

document
  .getElementById("usernames-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = getFormData();
    console.table(formData);
    localStorage.setItem("formData", JSON.stringify(formData));
    window.location.href = "juego.html";
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
