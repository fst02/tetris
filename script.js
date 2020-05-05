import defaultExport from './src/model.js';
import controller from './src/controller.js';

//const canvas = document.getElementById('canvas');
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

controller.init();
recolor(defaultExport.arrCanvas);
newItem();
setGravity();
moveHorizontally();
