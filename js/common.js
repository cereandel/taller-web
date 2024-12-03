document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname;
  const head = document.head;

  const title = document.querySelector("title");
  title.textContent = "Batalla Naval";

  const faviconLink = document.createElement("link");
  faviconLink.rel = "icon";
  if (currentPath.endsWith("index.html")) {
    faviconLink.href = "assets/icon.svg";
  } else {
    faviconLink.href = "../assets/icon.svg";
  }
  head.appendChild(faviconLink);

  const preconnect1 = document.createElement("link");
  preconnect1.rel = "preconnect";
  preconnect1.href = "https://fonts.googleapis.com";
  head.appendChild(preconnect1);

  const preconnect2 = document.createElement("link");
  preconnect2.rel = "preconnect";
  preconnect2.href = "https://fonts.gstatic.com";
  preconnect2.crossOrigin = "anonymous";
  head.appendChild(preconnect2);

  const fontLink = document.createElement("link");
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";
  fontLink.rel = "stylesheet";
  head.appendChild(fontLink);

  const body = document.body;

  const bootstrapScript = document.createElement("script");
  bootstrapScript.src =
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
  bootstrapScript.integrity =
    "sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz";
  bootstrapScript.crossOrigin = "anonymous";
  body.appendChild(bootstrapScript);

  const header = document.querySelector("header.masthead");
  if (header) {
    const innerDiv = document.createElement("div");
    innerDiv.className = "inner";

    if (currentPath.endsWith("index.html")) {
      innerDiv.innerHTML = `
        <h3 class="masthead-brand">Batalla Naval</h3>
        <nav class="nav nav-masthead justify-content-center">
          <a class="nav-link active" href="index.html">Home</a>
          <a class="nav-link" href="html/instrucciones.html">Instrucciones</a>
          <a class="nav-link" href="#">Leaderboard</a>
        </nav>
      `;
    } else if (currentPath.endsWith("instrucciones.html")) {
      innerDiv.innerHTML = `
        <h3 class="masthead-brand">Batalla Naval</h3>
        <nav class="nav nav-masthead justify-content-center">
          <a class="nav-link" href="../index.html">Home</a>
          <a class="nav-link active" href="instrucciones.html">Instrucciones</a>
          <a class="nav-link" href="#">Leaderboard</a>
        </nav>
      `;
    } else if (currentPath.endsWith("juego.html")) {
      innerDiv.innerHTML = `
        <h3 class="masthead-brand">Batalla Naval</h3>
        <nav class="nav nav-masthead justify-content-center">
          <a class="nav-link" href="../index.html">Home</a>
          <a class="nav-link" href="../html/instrucciones.html">Instrucciones</a>
          <a class="nav-link" href="#">Leaderboard</a>
        </nav>
      `;
    }

    header.appendChild(innerDiv);
  }

  const footer = document.querySelector("footer.mastfoot");
  if (footer) {
    const innerDiv = document.createElement("div");
    innerDiv.className = "inner";
    innerDiv.innerHTML = `
      <p class="m-1">
        Desarrollado por
        <a href="https://github.com/cereandel" target="_blank">César Reyes</a>
      </p>
    `;
    footer.appendChild(innerDiv);
  }
});
