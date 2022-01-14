/*
TODO: Weitere Ideen:
0. weiter huebsch machen.
1. Bild exportieren, z.B. mit third party bib: dom-to-image: https://github.com/tsayen/dom-to-image
2. Grid mit Enter erzeugen.
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

function setPixelColor(target) {
  let penColor = document.getElementById("pen").value;
  target.style.backgroundColor = penColor;
}

function setPresetPixelColor() {
  let penColor = document.getElementById("pen");
  penColor.value = rgba2hex(this.style.backgroundColor);
}

function resetPixelColor(pixel) {
  this.style.backgroundColor = "white";
}

function createRow() {
  let row = document.createElement("div");
  row.className = "row";

  return row;
}

function createDefaultColors() {
  let colorPresets = document.getElementById("color-presets");
  const colors = [
    "#000000",
    "#ff0000",
    "#ff8800",
    "#ffff00",
    "#adff2f",
    "#006400",
    "#40e0d0",
    "#00ccff",
  ];

  for (const color of colors) {
    let defaultColor = document.createElement("div");
    defaultColor.className = "pen";
    defaultColor.style.backgroundColor = color;
    defaultColor.addEventListener("click", setPresetPixelColor);
    colorPresets.appendChild(defaultColor);
  }
}

function createPixel() {
  let pixel = document.createElement("div");
  pixel.className = "pixel";
  pixel.style.backgroundColor = "white";
  // mouseover event needed to fill multiple cells
  pixel.addEventListener("mouseover", (e) => {
    if (e.buttons === 1) {
      setPixelColor(e.target);
    }
  });
  // mousedown event needed to fill first clicked cell
  pixel.addEventListener("mousedown", (e) => {
    if (e.button === 0) {
      setPixelColor(e.target);
      addToHistory();
    }
  });
  pixel.addEventListener("contextmenu", resetPixelColor);

  return pixel;
}

function addToHistory() {
  /**
   * add color to history palette. Can hold a maximum of 8 colors, no duplicates. Older colors
   * will be replaced by recent choice.
   */
  let colorHistory = document.getElementById("color-history");
  let usedColor = document.createElement("div");
  usedColor.className = "pen";
  usedColor.style.backgroundColor = document.getElementById("pen").value;
  usedColor.addEventListener("click", setPresetPixelColor);

  // Do nothing if usedColor already in `color-history`.
  // TODO: refactor checks to different function
  for (let child of colorHistory.childNodes) {
    if (usedColor.isEqualNode(child)) {
      return 0;
    }
  }
  // If `color-history` has 8 colors remove first color from stack.
  if (colorHistory.childElementCount === 8) {
    colorHistory.removeChild(colorHistory.firstElementChild);
  }
  colorHistory.appendChild(usedColor);
}

function checkColumnAndRowSize(column, row) {
  /**
   * @column number of columns in grid
   * @row number of rows in grid
   *
   * If @column or @row is empty show an error. Otherwise remove possible error and return 1.
   */
  const user_info = document.getElementById("user-info");
  if (column === "" || row === "") {
    user_info.style.backgroundColor = "#ffcccc";
    user_info.style.color = "#e60000";
    user_info.innerHTML = "Spalten- und Zeilenangabe darf nicht leer sein.";
    return 1;
  }
  user_info.innerHTML = null;
  return 0;
}

function clearArtArea() {
  artArea.style.border = null;
  // remove all children from parent.
  while (artArea.firstElementChild) {
    artArea.removeChild(artArea.firstElementChild);
  }
}

function resetArtArea() {
  Array.from(document.getElementsByClassName("pixel")).map(
    (nodeElement) => (nodeElement.style.backgroundColor = "white")
  );
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
