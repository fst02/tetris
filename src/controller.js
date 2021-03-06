import model from './model.js';
import view from './view.js';
import preview from './preview.js';

const controller = {
  randomItemResult: null,
  offsetHorizontal: null,
  offsetVertical: 0,
  horizontalLeftOrRight: 0,
  dropSpeed: 1000,
  interval: null,
  player: null,

  startGame() {
    const handler = () => {
      this.loadNewItemToGamefield();
      this.setGravity();
      this.welcomeUser();
      this.moveHorizontally();
      this.moveVertically();
      document.removeEventListener('keydown', handler);
    };
    document.addEventListener('keydown', handler);
  },
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
  createNewItemForPreview() {
    const newItem = model.figures.pickRandomItem();
    this.resetArr(model.nextElement);
    preview.recolor(model.nextElement);
    model.storeNextElement(newItem);
    preview.recolor(newItem);
    preview.item = newItem;
  },

  getItemFromPreview() {
    return preview.item;
  },

  loadNewItemToGamefield() {
    this.dropSpeed = 1000;
    this.randomItemResult = this.getItemFromPreview();
    this.createNewItemForPreview();
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
  moveVertically() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        this.dropSpeed = 10;
        clearInterval(this.interval);
        this.setGravity();
      }
    });
  },
  clearCompleteLine(row) {
    for (let i = row; i >= 1; i--) {
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
  getValueOrDefault(message, defaultValue) {
    const temp = prompt(message, defaultValue);
    if (temp == null) {
      return defaultValue;
    }
    return temp;
  },
  welcomeUser() {
    this.player = window.localStorage.getItem('userName');
    document.getElementById('welcomeUser').innerHTML = `Welcome ${this.player} !`;
  },
  setUser() {
    this.player = window.localStorage.getItem('userName');
    if (this.player == null) {
      this.player = this.getValueOrDefault('Please choose a name: ', 'Anonymous');
    } else {
      this.player = this.getValueOrDefault('Please change your name, if you wish: ', this.player);
    }
    window.localStorage.setItem('userName', this.player);
    document.getElementById('welcomeUser').innerHTML = `Welcome ${this.player} !`;
  },
  setGravity() {
    this.interval = setInterval(() => {
      if (!this.hasConflictBorders(model.bottomBorder, model.element)
        && !this.hasConflictItems(model.element, model.lines, 0)) {
        if (this.offsetVertical < model.element.length - this.randomItemResult.length) {
          this.offsetVertical++;
        }
        this.positionItem(this.offsetHorizontal);
      } else {
        clearInterval(this.interval);
        this.updateDisplay(model.lines);
        this.updateDisplay(model.linesWithElement);
        this.mergeMatrixes(model.lines, model.element);
        this.isLineComplete();
        this.loadNewItemToGamefield();
        if (this.checkGameOver()) {
          document.getElementById('gameOverMessage').innerHTML = 'Game Over';
          this.setUser();
        } else {
          this.setGravity();
          this.offsetVertical = 0;
        }
      }
    }, this.dropSpeed);
  },
};

export default controller;
