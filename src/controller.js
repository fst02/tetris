import model from './model.js';
import view from './view.js';

const controller = {
  randomItemResult: null,
  offsetHorizontal: null,
  offsetVertical: 0,
  horizontalLeftOrRight: 0,

  mergeMatrixes(matrix1, matrix2) {
    for (let i = 0; i < model.linesWithElement.length; i++) {
      for (let j = 0; j < model.linesWithElement[i].length; j++) {
        if (matrix1[i][j] === 1 || matrix2[i][j] === 1) {
          model.linesWithElement[i][j] = 1;
        } else {
          model.linesWithElement[i][j] = 0;
        }
      }
    } return this.linesWithElement;
  },
  resetArr(display) {
    for (let i = 0; i < display.length; i++) {
      for (let j = 0; j < display[i].length; j++) {
        display[i][j] = 0;
      }
    }
  },
  updateDisplay(display) {
    for (let i = 0; i < this.randomItemResult.length; i++) {
      for (let j = 0; j < this.randomItemResult[i].length; j++) {
        if (this.randomItemResult[i][j] === 1) {
          display[i + this.offsetVertical][j + this.offsetHorizontal] = 1;
        }
      }
    }
  },
  positionItem() {
    this.mergeMatrixes(model.lines, model.element);
    view.recolor(model.linesWithElement);
    this.resetArr(model.element);
    this.updateDisplay(model.element);
  },
  newItem() {
    this.randomItemResult = model.figures.pickRandomItem();
    this.offsetVertical = 0;
    this.offsetHorizontal = 3;
    for (let i = 0; i < this.randomItemResult.length; i++) {
      for (let j = 0; j < this.randomItemResult[i].length; j++) {
        if (this.randomItemResult[i][j] === 1) {
          model.linesWithElement[i + this.offsetVertical][j + this.offsetHorizontal] = 1;
        }
      }
    }
    this.positionItem();
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
    for (let i = 0; i < display1.length; i++) {
      for (let j = 0; j < display1[i].length; j++) {
        if (display1[i][j] === 1 && display2[i][j] === 1) {
          return true;
        }
      }
    }
    return false;
  },
  hasConflictItems(display1, display2, horizontalParameter) {
    for (let i = 0; i < display1.length - 1; i++) {
      for (let j = 0; j < display1[i].length; j++) {
        if (display1[i][j] === 1 && display2[i + 1][j + horizontalParameter] === 1) {
          return true;
        }
      }
    }
    return false;
  },
  moveHorizontally() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        this.horizontalLeftOrRight = -1;
        if (!this.hasConflictBorders(model.element, model.leftBorder)
          && !this.hasConflictItems(model.element, model.lines, this.horizontalLeftOrRight)) {
          this.offsetHorizontal -= 1;
          controller.resetArr(model.linesWithElement);
          this.positionItem(this.offsetHorizontal);
        }
      }
      if (event.key === 'ArrowRight') {
        this.horizontalLeftOrRight = 1;
        if (!this.hasConflictBorders(model.element, model.rightBorder)
          && !this.hasConflictItems(model.element, model.lines, this.horizontalLeftOrRight)) {
          this.offsetHorizontal += 1;
          controller.resetArr(model.linesWithElement);
          this.positionItem(this.offsetHorizontal);
        }
      }
    }, true);
  },
  clearCompleteLine(row) {
    for (let i = row; i >= 1; i--) {
      console.log(i);
      for (let j = 0; j < model.lines[i].length; j++) {
        model.lines[i][j] = model.lines[i - 1][j];
      }
    }
  },
  isLineComplete() {
    for (let i = 0; i < model.linesWithElement.length; i++) {
      let lineID = i;
      for (let j = 0; j < model.linesWithElement[i].length; j++) {
        if (model.linesWithElement[i][j] === 0) {
          lineID = -1;
        }
      }
      if (lineID !== -1) {
        this.clearCompleteLine(lineID);
      }
    }
  },
  setGravity() {
    this.offsetVertical = 0;
    const interval = setInterval(() => {
      if (!this.hasConflictBorders(model.bottomBorder, model.element)
        && !this.hasConflictItems(model.element, model.lines, 0)) {
        if (this.offsetVertical < model.element.length - this.randomItemResult.length) {
          this.offsetVertical++;
        }
        this.positionItem(this.offsetHorizontal);
      } else {
        clearInterval(interval);
        this.updateDisplay(model.lines);
        this.updateDisplay(model.linesWithElement);
        this.mergeMatrixes(model.lines, model.element);
        this.isLineComplete();
        this.newItem();
        if (this.checkGameOver()) {
          document.getElementById('gameOverMessage').innerHTML = 'Game Over';
        } else {
          this.setGravity();
        }
      }
    }, 200);
  },
};

export default controller;
