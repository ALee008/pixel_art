/*
TODO: Weitere Ideen:
0. weiter huebsch machen.
1. Bild exportieren, z.B. mit third party bib: dom-to-image: https://github.com/tsayen/dom-to-image
2. merke die letzten 5 ausgewaehlten Farben
3. Malen nach Zahlen auf Basis existierenden Bildes
4. Wenn man scrollt soll die Farbauswahl mit scrollen
*/

// convert rgb and rgba values to hex
const rgba2hex = (rgba) =>
  `#${rgba
    .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
    .slice(1)
    .map((n, i) =>
      (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n))
        .toString(16)
        .padStart(2, "0")
        .replace("NaN", "")
    )
    .join("")}`;

let colorPicker = document.querySelector("input");

let artArea = document.getElementById("art");
artArea.addEventListener("contextmenu", (e) => e.preventDefault());

function setPixelColor() {
  let penColor = document.getElementById("pen").value;
  this.style.backgroundColor = penColor;
}

function setPresetPixelColor(presetColor) {
  let penColor = document.getElementById("pen");
  console.log(presetColor.style.backgroundColor);
  penColor.value = rgba2hex(presetColor.style.backgroundColor);
}

function resetPixelColor(pixel) {
  this.style.backgroundColor = "white";
}

function createRow() {
  let row = document.createElement("div");
  row.className = "row";

  return row;
}

function createPixel() {
  let pixel = document.createElement("div");
  pixel.className = "pixel";
  pixel.style.backgroundColor = "white";
  pixel.addEventListener("click", setPixelColor);
  pixel.addEventListener("contextmenu", resetPixelColor);

  return pixel;
}

function checkColumnAndRowSize(column, row) {
  if (column === "" || row === "") {
    const user_info = document.getElementById("user-info");
    user_info.style.backgroundColor = "#ffcccc";
    user_info.style.color = "#e60000";
    user_info.innerHTML = "Spalten- und Zeilenangabe darf nicht leer sein.";
    return 1;
  }

  return 0;
}

function clearArtArea() {
  while (artArea.firstElementChild) {
    artArea.removeChild(artArea.firstElementChild);
  }
}

function createGrid() {
  // clear space before creating new grid
  clearArtArea();

  const columnCount = document.getElementById("spalten").value;
  const rowCount = document.getElementById("zeilen").value;

  const checkUserInput = checkColumnAndRowSize(columnCount, rowCount);

  if (checkUserInput === 1) {
    return null;
  }

  for (let i = 0; i < rowCount; i++) {
    // create row object
    let row = createRow();

    for (let i = 0; i < columnCount; i++) {
      const pixel = createPixel();
      row.appendChild(pixel);
    }

    artArea.style.border = "solid 5px black";
    artArea.appendChild(row);
  }
}
