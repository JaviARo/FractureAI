const buttons = document.getElementById("buttons");
const bc1 = document.getElementById("bc-1");
const bc2 = document.getElementById("bc-2");
const draggableButton = bc1.getElementsByClassName("button")[0];
const cameraButton = bc2.getElementsByClassName("button")[0];
const fileInput = document.querySelector("input");
const cv = document.getElementById("canvas");
const img = document.getElementById('image');
const results = document.getElementById('prediction');
const bbc = document.getElementById('back-button-container');

window.addEventListener('dragover', (event) => {
  event.preventDefault();
  p = draggableButton.querySelector("p")
  p.innerText = "¡Suelte aquí su imagen!"
  draggableButton.classList.add("draggable")
})

window.addEventListener('dragleave', (event) => {
  event.preventDefault();
  p = draggableButton.querySelector("p")
  p.innerText = "Suba una foto de rayos X desde su dispositivo"
  draggableButton.classList.remove("draggable")
})

window.addEventListener('drop', (event) => {
  const dt = event.dataTransfer;
  const files = dt.files[0];

  if (files.length > 0) {
    fileInput.files = files;
  }
})

fileInput.addEventListener('change', (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    const imageUrl = URL.createObjectURL(files[0]);
    img.src = imageUrl;
    bc1.classList.add("hide-bc-1");
    bc2.classList.add("hide-bc-2");
    setTimeout(() => {
      buttons.classList.add("disabled");
      bc1.classList.remove("hide-bc-1");
      bc2.classList.remove("hide-bc-2");
      results.classList.remove("disabled");
      img.classList.remove("disabled");
      bbc.classList.remove("disabled");
      window.predecirImagen(img);
    }, 500)
  }
});

cameraButton.addEventListener('click', (event) => {
  bc1.classList.add("hide-bc-1");
  bc2.classList.add("hide-bc-2");
  setTimeout(() => {
    buttons.classList.add("disabled");
    bc1.classList.remove("hide-bc-1");
    bc2.classList.remove("hide-bc-2");
    results.classList.remove("disabled");
    cv.classList.remove("disabled");
    bbc.classList.remove("disabled");
    window.mostrarCamara()
  }, 500)
});

bbc.addEventListener('click', (event) => {
  if (!img.classList.contains("disabled")) {
    img.classList.add("hide-all");
    setTimeout(() => {
      img.classList.add("disabled");
      img.classList.remove("hide-all");
    }, 500)
  } else {
    cv.classList.add("hide-all");
    setTimeout(() => {
      cv.classList.add("disabled");
      cv.classList.remove("hide-all");
    }, 500)
  }

  results.classList.add("hide-all");
  bbc.classList.add("hide-all");

  setTimeout(() => {
    results.classList.add("disabled");
    results.classList.remove("hide-all");
    results.innerText = "Realizando predicción...";
    bbc.classList.add("disabled");
    bbc.classList.remove("hide-all");
    bc1.classList.add("show-button-1-fast");
    bc2.classList.add("show-button-2-fast");
    buttons.classList.remove("disabled");
  }, 500)
})
