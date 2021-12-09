let colorPicker = document.querySelector('input');

let art_area = document.getElementById("art");
art_area.addEventListener("contextmenu", e => e.preventDefault());

// let pixel = '<div class="pixel" onclick="setPixelColor(this)" oncontextmenu="resetPixelColor(this)"></div>'

function setPixelColor() {
  let penColor = document.getElementById("pen").value;
  this.style.backgroundColor = penColor;
}

function resetPixelColor(pixel) {
  this.style.backgroundColor = 'white';
}

function createRow() {
  let row = document.createElement("div");
  row.className = "row";
  
  return row;
}

function createPixel() {
  let pixel = document.createElement("div");
  pixel.className = "pixel";
  pixel.style.backgroundColor = 'white';
  pixel.addEventListener("click", setPixelColor);
  pixel.addEventListener("contextmenu", resetPixelColor);

  return pixel;
}

function checkColumnAndRowSize(column, row) {
  if (column === "" || row === "") {
    const user_info = document.getElementById("user-info");
    user_info.style.backgroundColor = "red";
    user_info.style.color = "rgb(87, 4, 4)";
    user_info.innerHTML = "Spalten- und Zeilenangabe darf nicht leer sein.";
    return 1;
  }
  
  return 0;
}


function createGrid() {
  art_area.textContent = "";
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
  
  art_area.appendChild(row);
  
  }

}