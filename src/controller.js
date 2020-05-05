import model from './model.js';
import view from './view.js';


const controller = {
  resetArr(display) {
    for (let i = 0; i < display.length; i++) {
      for (let j = 0; j < display[i].length; j++) {
        display[i][j] = 0;
      }
    }
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
          model.arrCanvas[i + offsetVertical][j + offsetHorizontal] = 1;
        }
      }
    }
    view.recolor(model.arrCanvas);
    view.recolor(model.lines);
    controller.resetArr(model.element);
    updateDisplay(model.element);
  },
  newItem() {
    randomItemResult = model.figures.pickRandomItem();
    offsetVertical = 0;
    offsetHorizontal = 3;
    positionItem();
  },
  checkGameOver() {
    for (let i = 0; i < model.lines[0].length; i++) {
      if (model.lines[0][i] === 1) {
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
        if (!hasConflictBorders(model.element, model.leftBorder)
          && !hasConflictItems(model.element, model.lines, horizontalLeftOrRight)) {
          offsetHorizontal -= 1;
          controller.resetArr(model.arrCanvas);
          positionItem(offsetHorizontal);
        }
      }
      if (event.key === 'ArrowRight') {
        horizontalLeftOrRight = 1;
        if (!hasConflictBorders(model.element, model.rightBorder)
          && !hasConflictItems(model.element, model.lines, horizontalLeftOrRight)) {
          offsetHorizontal += 1;
          controller.resetArr(model.arrCanvas);
          positionItem(offsetHorizontal);
        }
      }
    }, true);
  },
  setGravity() {
    offsetVertical = 0;
    const interval = setInterval(() => {
      if (!hasConflictBorders(model.bottomBorder, model.element)
        && !hasConflictItems(model.element, model.lines, horizontalLeftOrRight)) {
        if (offsetVertical < model.element.length - randomItemResult.length) {
          offsetVertical++;
        }
        controller.resetArr(model.arrCanvas);
        positionItem(offsetHorizontal);
      } else {
        clearInterval(interval);
        updateDisplay(model.lines);
        view.recolor(model.lines);
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
