const controller = {
  resetArr(display) {
    for (let i = 0; i < display.length; i++) {
      for (let j = 0; j < display[i].length; j++) {
        display[i][j] = 0;
      }
    }
  },
  init() {
    const canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  },
  updateDisplay(display) {
    for (let i = 0; i < randomItemResult.length; i++) {
      for (let j = 0; j < randomItemResult[i].length; j++) {
        if (randomItemResult[i][j] === 1) {
          display[i + offsetVertical][j + offsetHorizontal] = 1;
        }
      }
    }
  },
  positionItem() {
    for (let i = 0; i < randomItemResult.length; i++) {
      for (let j = 0; j < randomItemResult[i].length; j++) {
        if (randomItemResult[i][j] === 1) {
          defaultExport.arrCanvas[i + offsetVertical][j + offsetHorizontal] = 1;
        }
      }
    }
    recolor(defaultExport.arrCanvas);
    recolorLines(defaultExport.lines);
    controller.resetArr(defaultExport.element);
    updateDisplay(defaultExport.element);
  },
  newItem() {
    randomItemResult = defaultExport.figures.pickRandomItem();
    offsetVertical = 0;
    offsetHorizontal = 3;
    positionItem();
  },
  checkGameOver() {
    for (let i = 0; i < defaultExport.lines[0].length; i++) {
      if (defaultExport.lines[0][i] === 1) {
        return true;
      }
    }
    return false;
  },
  hasConflictBorders(display1, display2) {
    for (let i = 0; i < display1.length; ++i) {
      for (let j = 0; j < display1[i].length; ++j) {
        if (display1[i][j] === 1 && display2[i][j] === 1) {
          return true;
        }
      }
    }
    return false;
  },
  hasConflictItems(display1, display2, horizontalParameter) {
    for (let i = 0; i < display1.length - 1; ++i) {
      for (let j = 0; j < display1[i].length; ++j) {
        if (display1[i][j] === 1 && display2[i + 1][j + horizontalParameter] === 1) {
          return true;
        }
      }
    }
    return false;
  },
  functimoveHorizontally() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        horizontalLeftOrRight = -1;
        if (!hasConflictBorders(defaultExport.element, defaultExport.leftBorder)
          && !hasConflictItems(defaultExport.element, defaultExport.lines, horizontalLeftOrRight)) {
          offsetHorizontal -= 1;
          controller.resetArr(defaultExport.arrCanvas);
          positionItem(offsetHorizontal);
        }
      }
      if (event.key === 'ArrowRight') {
        horizontalLeftOrRight = 1;
        if (!hasConflictBorders(defaultExport.element, defaultExport.rightBorder)
          && !hasConflictItems(defaultExport.element, defaultExport.lines, horizontalLeftOrRight)) {
          offsetHorizontal += 1;
          controller.resetArr(defaultExport.arrCanvas);
          positionItem(offsetHorizontal);
        }
      }
    }, true);
  },
  setGravity() {
    offsetVertical = 0;
    const interval = setInterval(() => {
      if (!hasConflictBorders(defaultExport.bottomBorder, defaultExport.element)
        && !hasConflictItems(defaultExport.element, defaultExport.lines, horizontalLeftOrRight)) {
        if (offsetVertical < defaultExport.element.length - randomItemResult.length) {
          offsetVertical++;
        }
        controller.resetArr(defaultExport.arrCanvas);
        positionItem(offsetHorizontal);
      } else {
        clearInterval(interval);
        updateDisplay(defaultExport.lines);
        recolorLines(defaultExport.lines);
        newItem();
        if (checkGameOver()) {
          document.getElementById('gameOverMessage').innerHTML = 'Game Over';
        } else {
          setGravity();
        }
      }
    }, 20);
  },
};

export default controller;
