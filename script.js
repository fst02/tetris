const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const rows = 20;
const columns = 10;
const canvasWidth = 209;
const canvasHeight = 419;
const rectSize = (canvasWidth - columns + 1) / columns;
const black = '#000000';
const gray = '#808080';
let randomItemResult;
let offset;
const initialOffset = 3;
let offsetVertical = 0;

function randomItem() {
  const randomNumber = Math.floor(Math.random() * items.length);
  return items[randomNumber];
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

function firstItem() {
  randomItemResult = randomItem();
  offsetVertical = 0;
  offset = initialOffset;
  positionItem(initialOffset);
}

function positionItem(positionNumber) {
  for (let i = 0; i < randomItemResult.length; i++) {
    for (let j = 0; j < randomItemResult[i].length; j++) {
      if (randomItemResult[i][j] === 1) {
        arrCanvas[i + offsetVertical][j + positionNumber] = 1;
      }
    }
  }
  recolor(arrCanvas);
  recolorLines(lines);
  resetArr(element);
  updateDisplay(element);
}

function updateDisplay(display) {
  for (let i = 0; i < randomItemResult.length; i++) {
    for (let j = 0; j < randomItemResult[i].length; j++) {
      if (randomItemResult[i][j] === 1) {
        display[i + offsetVertical][j + offset] = 1;
      }
    }
  }
}

function moveHorizontally() {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && !hasConflict(element, leftBorder)) {
      offset -= 1;
      resetArr(arrCanvas);
      positionItem(offset);
    }
    if (event.key === 'ArrowRight' && !hasConflict(element, rightBorder)) {
      offset += 1;
      resetArr(arrCanvas);
      positionItem(offset);
    }
    if (event.key === 'ArrowDown') {
      moveVertically();
    }
  });
}

function hasConflict(display1, display2) {
  for (let i = 0; i < display1.length; ++i) {
    for (let j = 0; j < display1[i].length; ++j) {
      if (display1[i][j] === 1 && display2[i][j] === 1) {
        return true;
      }
    }
  }
  return false;
}

// function setGravity() {
//   offsetVertical = 0;
//   let interval = setInterval(function() {
//     console.log(hasConflict(bottomBorder, element))
//     console.log(hasConflict(lines, element))
//     if (!hasConflict(bottomBorder, element) && !hasConflict(lines, element)) {
//       resetArr(arrCanvas);
//       positionItem(offset);
//       if (offsetVertical < element.length - randomItemResult.length) {
//         offsetVertical++;
//       }
//     }
//     else {
//     clearInterval(interval);
//     updateDisplay(lines);
//     recolorLines(lines);
//     firstItem();
//     setGravity();
//     console.log('OK');
//     }
//   }, 200);
//   }
offsetVertical = 0;
function moveVertically() {
  console.log(hasConflict(bottomBorder, element));
  console.log(hasConflict(element, lines));
  if (!hasConflict(bottomBorder, element) && !hasConflict(element, lines)) {
    resetArr(arrCanvas);
    positionItem(offset);
    if (offsetVertical < element.length - randomItemResult.length) {
      offsetVertical++;
    }
  }
  else {
  updateDisplay(lines);
  recolorLines(lines);
  firstItem();
  console.log('OK');
  }
}

recolor(arrCanvas);
firstItem();
//setGravity();
moveHorizontally();
