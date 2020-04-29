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
let eventKey = 3;

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

function moveHorizontally() {
  document.addEventListener('keydown', (event) => {

    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      console.log(event.key);
    }

    switch (event.key) {
      case 'ArrowLeft':
        eventKey -= 1;
        colorGameField();
        movingItem(eventKey);
        break;
      case 'ArrowRight':
        eventKey += 1;
        colorGameField();
        movingItem(eventKey);
        break;

      default:
        break;
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
}

function movingItem(moveX) {
  for (let i = 0; i < randomItemResult.length; i++) {
    for (let j = 0; j < randomItemResult[i].length; j++) {
      if (randomItemResult[i][j] === 1) {
        arrCanvas[i][j + moveX] = 1;
      } else {
        //arrCanvas[i][j] = 0;
      }
    }
  }
  recolor();
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
