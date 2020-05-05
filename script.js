import {
  figures,
  leftBorder,
  rightBorder,
  bottomBorder,
  element,
  lines,
  arrCanvas,
} from './scriptMatrix.js';

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
        arrCanvas[i + offsetVertical][j + offsetHorizontal] = 1;
      }
    }
  }
  recolor(arrCanvas);
  recolorLines(lines);
  resetArr(element);
  updateDisplay(element);
}

function firstItem() {
  randomItemResult = figures.pickRandomItem();
  offsetVertical = 0;
  offsetHorizontal = 3;
  positionItem();
}

function checkGameOver() {
  for (let i = 0; i < lines[0].length; i++) {
    if (lines[0][i] === 1) {
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
      if (!hasConflictBorders(element, leftBorder)
        && !hasConflictItems(element, lines, horizontalLeftOrRight)) {
        offsetHorizontal -= 1;
        resetArr(arrCanvas);
        positionItem(offsetHorizontal);
      }
    }
    if (event.key === 'ArrowRight') {
      horizontalLeftOrRight = 1;
      if (!hasConflictBorders(element, rightBorder) 
        && !hasConflictItems(element, lines, horizontalLeftOrRight)) {
        offsetHorizontal += 1;
        resetArr(arrCanvas);
        positionItem(offsetHorizontal);
      }
    }
  }, true);
}

function setGravity() {
  offsetVertical = 0;
  const interval = setInterval(() => {
    if (!hasConflictBorders(bottomBorder, element)
      && !hasConflictItems(element, lines, horizontalLeftOrRight)) {
      if (offsetVertical < element.length - randomItemResult.length) {
        offsetVertical++;
      }
      resetArr(arrCanvas);
      positionItem(offsetHorizontal);
    } else {
      clearInterval(interval);
      updateDisplay(lines);
      recolorLines(lines);
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
recolor(arrCanvas);
firstItem();
setGravity();
moveHorizontally();
