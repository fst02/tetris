import controller from './src/controller.js';

//const canvas = document.getElementById('canvas');


let randomItemResult;
let offsetHorizontal;
let offsetVertical = 0;
let horizontalLeftOrRight = 0;



controller.init();
recolor(defaultExport.arrCanvas);
newItem();
setGravity();
moveHorizontally();
