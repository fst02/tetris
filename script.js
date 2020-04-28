let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let arrCanvas = [];
let rows = 20;
let columns = 10;
const canvasWidth = 209;
const canvasHeight = 419;
const rectSize = (canvasWidth - columns + 1) / columns;
const itemT = [
    [1, 1, 1],
    [0, 1, 0]
];
const itemReverseZ = [
    [0, 1, 1],
    [1, 1, 0]
];
const itemZ = [
    [1, 1, 0],
    [0, 1, 1]
];
const itemReverseL = [
    [1, 0, 0],
    [1, 1, 1]
];
const itemL = [
    [0, 0, 1],
    [1, 1, 1]
];
const itemLine = [
    [1, 1, 1, 1]
];
const itemRect = [
    [1, 1],
    [1, 1]
];

function randomItem() {
    let randomNumber = Math.floor(Math.random() * 7);
    switch (randomNumber) {
      case 0:
        return itemT;
        break;
      case 1:
        return itemReverseZ;
        break;
      case 2:
        return itemZ;
        break;
      case 3:
        return itemReverseL;
        break;
      case 4:
        return itemL;
        break;
      case 5:
        return itemLine;
        break;
      case 6:
        return itemRect;
        break;  
      default:
        break;
    }
  }
  
function recolor() {
    for (let i = 0; i < arrCanvas.length; i++) {
        for (let j = 0; j < arrCanvas[i].length; j++) {
            if (arrCanvas[i][j] === 1) {
                ctx.fillStyle = '#000000';
                ctx.fillRect(j * (rectSize + 1),i * (rectSize + 1),rectSize,rectSize);
            }
            else {
                ctx.fillStyle = '#808080';
                ctx.fillRect(j * (rectSize + 1),i * (rectSize + 1),rectSize,rectSize);
            }
        }
    }
}

function firstItem() {
    let randomItemResult = randomItem();
    for (let i = 0; i < randomItemResult.length; i++) {
        for (let j = 0; j < randomItemResult[i].length; j++) {
            if (randomItemResult[i][j] === 1) {
                arrCanvas[i][j + 3] = 1;
            }
        }
    }
    recolor();
}

colorGameField(arrCanvas, rows, columns);
function colorGameField(arrCanvas, rows, columns) {
    for (let i = 0; i < rows; i++) {
        arrCanvas.push([0])
        for (let j = 0; j < columns; j++) {
            arrCanvas[i][j] = 0;
            if(arrCanvas[i][j] === 0) {
                ctx.fillStyle = '#808080';
                ctx.fillRect(j * (rectSize + 1),i * (rectSize + 1),rectSize,rectSize);
            }
        }
    }
}
firstItem(randomItem());


console.log(arrCanvas);
console.log(randomItem());

