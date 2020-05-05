import defaultExport from './src/model.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const columns = 10;
const canvasWidth = 209;
const canvasHeight = 419;
const rectSize = (canvasWidth - columns + 1) / columns;
const black = '#000000';
const gray = '#808080';
let randomItemResult;
let offsetHorizontal;
let offsetVertical = 0;
let horizontalLeftOrRight = 0;

function init() {
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
}

function resetArr(display) {
  for (let i = 0; i < display.length; i++) {
    for (let j = 0; j < display[i].length; j++) {
      display[i][j] = 0;
    }
  }
}

function recolor(display) {
  for (let i = 0; i < display.length; i++) {
    for (let j = 0; j < display[i].length; j++) {
      if (display[i][j] === 1) {
        ctx.fillStyle = black;
        ctx.fillRect(j * (rectSize + 1), i * (rectSize + 1), rectSize, rectSize);
      } else {
        ctx.fillStyle = gray;
        ctx.fillRect(j * (rectSize + 1), i * (rectSize + 1), rectSize, rectSize);
      }
    }
  }
}

function recolorLines(display) {
  for (let i = 0; i < display.length; i++) {
    for (let j = 0; j < display[i].length; j++) {
      if (display[i][j] === 1) {
        ctx.fillStyle = black;
        ctx.fillRect(j * (rectSize + 1), i * (rectSize + 1), rectSize, rectSize);
      }
    }
  }
}

function updateDisplay(display) {
  for (let i = 0; i < randomItemResult.length; i++) {
    for (let j = 0; j < randomItemResult[i].length; j++) {
      if (randomItemResult[i][j] === 1) {
        display[i + offsetVertical][j + offsetHorizontal] = 1;
      }
    }
  }
}

function positionItem() {
  for (let i = 0; i < randomItemResult.length; i++) {
    for (let j = 0; j < randomItemResult[i].length; j++) {
      if (randomItemResult[i][j] === 1) {
        defaultExport.arrCanvas[i + offsetVertical][j + offsetHorizontal] = 1;
      }
    }
  }
  recolor(defaultExport.arrCanvas);
  recolorLines(defaultExport.lines);
  resetArr(defaultExport.element);
  updateDisplay(defaultExport.element);
}

function firstItem() {
  randomItemResult = defaultExport.figures.pickRandomItem();
  offsetVertical = 0;
  offsetHorizontal = 3;
  positionItem();
}

function checkGameOver() {
  for (let i = 0; i < defaultExport.lines[0].length; i++) {
    if (defaultExport.lines[0][i] === 1) {
      return true;
    }
  }
  return false;
}

function hasConflictBorders(display1, display2) {
  for (let i = 0; i < display1.length; ++i) {
    for (let j = 0; j < display1[i].length; ++j) {
      if (display1[i][j] === 1 && display2[i][j] === 1) {
        return true;
      }
    }
  }
  return false;
}

function hasConflictItems(display1, display2, horizontalParameter) {
  for (let i = 0; i < display1.length - 1; ++i) {
    for (let j = 0; j < display1[i].length; ++j) {
      if (display1[i][j] === 1 && display2[i + 1][j + horizontalParameter] === 1) {
        return true;
      }
    }
  }
  return false;
}

function moveHorizontally() {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      horizontalLeftOrRight = -1;
      if (!hasConflictBorders(defaultExport.element, defaultExport.leftBorder)
        && !hasConflictItems(defaultExport.element, defaultExport.lines, horizontalLeftOrRight)) {
        offsetHorizontal -= 1;
        resetArr(defaultExport.arrCanvas);
        positionItem(offsetHorizontal);
      }
    }
    if (event.key === 'ArrowRight') {
      horizontalLeftOrRight = 1;
      if (!hasConflictBorders(defaultExport.element, defaultExport.rightBorder)
        && !hasConflictItems(defaultExport.element, defaultExport.lines, horizontalLeftOrRight)) {
        offsetHorizontal += 1;
        resetArr(defaultExport.arrCanvas);
        positionItem(offsetHorizontal);
      }
    }
  }, true);
}

function setGravity() {
  offsetVertical = 0;
  const interval = setInterval(() => {
    if (!hasConflictBorders(defaultExport.bottomBorder, defaultExport.element)
      && !hasConflictItems(defaultExport.element, defaultExport.lines, horizontalLeftOrRight)) {
      if (offsetVertical < defaultExport.element.length - randomItemResult.length) {
        offsetVertical++;
      }
      resetArr(defaultExport.arrCanvas);
      positionItem(offsetHorizontal);
    } else {
      clearInterval(interval);
      updateDisplay(defaultExport.lines);
      recolorLines(defaultExport.lines);
      firstItem();
      if (checkGameOver()) {
        document.getElementById('gameOverMessage').innerHTML = 'Game Over';
      } else {
        setGravity();
      }
    }
  }, 20);
}

init();
recolor(defaultExport.arrCanvas);
firstItem();
setGravity();
moveHorizontally();
