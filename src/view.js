export default {
  columns: 10,
  rectangleSize: (this.canvasWidth - this.columns + 1) / this.columns,
  itemColor: '#000000',
  backgroundColor: '#808080',
  canvasWidth: 209,
  canvasHeight: 419,
  canvas: document.getElementById('canvas'),
  context: this.canvas.getContext('2d'),
  init() {
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
  },
  recolor(display) {
    for (let i = 0; i < display.length; i++) {
      for (let j = 0; j < display[i].length; j++) {
        if (display[i][j] === 1) {
          this.colorRectangle(i, j, this.itemColor);
        } else {
          this.colorRectangle(i, j, this.backgroundColor);
        }
      }
    }
  },
  colorRectangle(row, column, color) {
    this.context.fillStyle = color;
    this.context.fillRect(
      column * (this.rectangleSize + 1),
      row * (this.rectangleSize + 1),
      this.rectangleSize,
      this.rectangleSize,
    );
  },
};
