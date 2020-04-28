let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let arr = [];
let rows = 20;
let columns = 10;
const canvasWidth = 209;
const canvasHeight = 419;
const rectSize = (canvasWidth - columns + 1) / columns;


fill2DimensionsArray(arr, rows, columns);

function fill2DimensionsArray(arr, rows, columns) {
    for (let i = 0; i < rows; i++) {
        arr.push([1])
        for (let j = 0; j < columns; j++) {
            arr[i][j] = 1;
            if(arr[i][j] === 1) {
                ctx.fillStyle = '#808080';
                ctx.fillRect(j * (rectSize + 1),i * (rectSize + 1),rectSize,rectSize);
            }
        }
    }
}


console.log(arr);

