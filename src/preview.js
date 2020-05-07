const preview = {
  columns: 4,
  itemColor: '#000000',
  backgroundColor: '#FFFFFF',
  canvasWidth: 84,
  canvasHeight: 42,
  item: null,
  
  getRectangleSize(width, columns) {
    return (width - columns + 1) / columns;
  },
  getContext() {
    return this.getCanvas().getContext('2d');
  },
  getCanvas() {
    return document.getElementById('canvasNextElement');
  },
  init() {
    this.getCanvas().width = this.canvasWidth;
    this.getCanvas().height = this.canvasHeight;
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
    const context = this.getContext();
    const rectangleSize = this.getRectangleSize(this.canvasWidth, this.columns);
    context.fillStyle = color;
    context.fillRect(
      column * (rectangleSize + 1),
      row * (rectangleSize + 1),
      rectangleSize,
      rectangleSize,
    );
  },
};

export default preview;
