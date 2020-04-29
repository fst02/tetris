let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let arrCanvas = [];
let rows = 20;
let columns = 10;
const canvasWidth = 209;
const canvasHeight = 419;
const rectSize = (canvasWidth - columns + 1) / columns;
const black = '#000000';
const gray = '#808080';

const items = [ [
    [1, 1, 1],
    [0, 1, 0]
],

[
    [0, 1, 1],
    [1, 1, 0]
],

[
    [1, 1, 0],
    [0, 1, 1]
],

[
    [1, 0, 0],
    [1, 1, 1]
],

[
    [0, 0, 1],
    [1, 1, 1]
],

[
    [1, 1, 1, 1]
],

[
    [1, 1],
    [1, 1]
]];

function randomItem() {
    let randomNumber = Math.floor(Math.random() * 7);
    return items[randomNumber];
    //console.log(randomNumber);
}

  
function recolor() {
    for (let i = 0; i < arrCanvas.length; i++) {
        for (let j = 0; j < arrCanvas[i].length; j++) {
            if (arrCanvas[i][j] === 1) {
                ctx.fillStyle = black;
                ctx.fillRect(j * (rectSize + 1),i * (rectSize + 1),rectSize,rectSize);
            }
            else {
                ctx.fillStyle = gray;
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
                ctx.fillStyle = gray;
                ctx.fillRect(j * (rectSize + 1),i * (rectSize + 1),rectSize,rectSize);
            }
        }
    }
}
firstItem(randomItem());


console.log(arrCanvas);
console.log(randomItem());

