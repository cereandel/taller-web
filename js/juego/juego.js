document.addEventListener("DOMContentLoaded", function () {
  const listItems = document.querySelectorAll("aside ul li");

  listItems.forEach((item) => {
    item.addEventListener("click", function () {
      const selectedImg = this.querySelector(".imagenLista");
      const itemText = this.textContent.trim();

      if (selectedImg) {
        if (selectedImg.style.border === "2px solid rgb(218, 127, 20)") {
          // Si la imagen ya tiene el borde, quitarlo
          selectedImg.style.border = "none";
          selectedImg.classList.remove("fade-in-border");
          console.log("Deselección: ", itemText);
        } else {
          // Remover el borde y la clase de animación de todas las imágenes
          listItems.forEach((li) => {
            const img = li.querySelector(".imagenLista");
            if (img) {
              img.style.border = "none";
              img.classList.remove("fade-in-border");
            }
          });
          // Agregar el borde y la clase de animación a la imagen dentro del elemento seleccionado
          selectedImg.style.border = "2px solid rgb(218, 127, 20)";
          selectedImg.classList.add("fade-in-border");
          console.log("Selección: ", itemText);
        }
      }
    });
  });
});
