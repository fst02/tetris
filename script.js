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
let moveX = 3;
let positionX = 0;
let positionY = 0;

const items = [
  [
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1, 1],
  ],
  [
    [1, 1],
    [1, 1],
  ],
];

function hasConflict(d1, d2) {
  for (let i = 0; i < d1.length; ++i) {
    for (let j = 0; j < d1[i].length; ++j) {
      if (d1[i][j] === 1 && d2[i][j] === 1) {
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
        element[i][j + moveX] = 1;
      }
    }
  }
}

function moveHorizontally() {
  document.addEventListener('keydown', (event) => {

    if (event.key === 'ArrowLeft' && !hasConflict(element, leftBorder)) {
      moveX -= 1;
      colorGameField();
      movingItem(moveX);
    }
    if (event.key === 'ArrowRight' && !hasConflict(element, rightBorder)) {
      moveX += 1;
      colorGameField();
      movingItem(moveX);
    }

    // switch (event.key) {
    //   case 'ArrowLeft':
    //     moveX -= 1;
    //     colorGameField();
    //     movingItem(moveX);
    //     break;
    //   case 'ArrowRight':
    //     moveX += 1;
    //     colorGameField();
    //     movingItem(moveX);
    //     break;

    //   default:
    //     break;
    // }
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

function resetArr(d1) {
  for (let i = 0; i < d1.length; i++) {
    for (let j = 0; j < d1[i].length; j++) {
      d1[i][j] = 0;
    }
  }
}

function firstItem() {
  randomItemResult = randomItem();
  for (let i = 0; i < randomItemResult.length; i++) {
    for (let j = 0; j < randomItemResult[i].length; j++) {
      if (randomItemResult[i][j] === 1) {
        arrCanvas[i][j + 3] = 1;
      }
    }
  }
  recolor();
  updateElement();
}

function movingItem() {
  for (let i = 0; i < randomItemResult.length; i++) {
    for (let j = 0; j < randomItemResult[i].length; j++) {
      if (randomItemResult[i][j] === 1) {
        arrCanvas[i][j + moveX] = 1;
      }
    }
  }
  recolor();
  updateElement();
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
firstItem(randomItem());
moveHorizontally();
