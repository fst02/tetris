const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const arrCanvas = [];
const rows = 20;
const columns = 10;
const canvasWidth = 209;
const canvasHeight = 419;
const rectSize = (canvasWidth - columns + 1) / columns;
const black = '#000000';
const gray = '#808080';
let randomItemResult;
let offset = 3;
let positionX = 0;
let positionY = 0;
const initialOffset = 3;

function positionItem(positionNumber) {
  for (let i = 0; i < randomItemResult.length; i++) {
    for (let j = 0; j < randomItemResult[i].length; j++) {
      if (randomItemResult[i][j] === 1) {
        arrCanvas[i][j + positionNumber] = 1;
      }
    }
  }
  recolor();
  updateElement();
}

function hasConflict(display1, display2) {
  for (let i = 0; i < display1.length; ++i) {
    for (let j = 0; j < display1[i].length; ++j) {
      if (display1[i][j] === 1 && display2[i][j] === 1) {
        return true;
      }
    }
  }
}

function updateElement() {
  resetArr(element);
  for (let i = 0; i < randomItemResult.length; i++) {
    for (let j = 0; j < randomItemResult[i].length; j++) {
      if (randomItemResult[i][j] === 1) {
        element[i][j + offset] = 1;
      }
    }
  }
}

function moveHorizontally() {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && !hasConflict(element, leftBorder)) {
      offset -= 1;
      colorGameField();
      positionItem(offset);
    }
    if (event.key === 'ArrowRight' && !hasConflict(element, rightBorder)) {
      offset += 1;
      colorGameField();
      positionItem(offset);
    }
  });
}

function randomItem() {
  const randomNumber = Math.floor(Math.random() * 7);
  return items[randomNumber];
}

function recolor() {
  for (let i = 0; i < arrCanvas.length; i++) {
    for (let j = 0; j < arrCanvas[i].length; j++) {
      if (arrCanvas[i][j] === 1) {
        ctx.fillStyle = black;
        ctx.fillRect(j * (rectSize + 1), i * (rectSize + 1), rectSize, rectSize);
      } else {
        ctx.fillStyle = gray;
        ctx.fillRect(j * (rectSize + 1), i * (rectSize + 1), rectSize, rectSize);
      }
    }
  }
}

function resetArr(display1) {
  for (let i = 0; i < display1.length; i++) {
    for (let j = 0; j < display1[i].length; j++) {
      display1[i][j] = 0;
    }
  }
}

function firstItem() {
  randomItemResult = randomItem();
  positionItem(initialOffset);
}


function colorGameField() {
  for (let i = 0; i < rows; i++) {
    arrCanvas[i] = [];
    for (let j = 0; j < columns; j++) {
      arrCanvas[i][j] = 0;
    }
  }
}
colorGameField();
firstItem();
moveHorizontally();
