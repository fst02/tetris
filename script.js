import controller from './src/controller.js';
import view from './src/view.js';
import model from './src/model.js';
import preview from './src/preview.js';

controller.startGame();
view.init();
preview.init();
view.recolor(model.linesWithElement);
controller.createNewItemForPreview();
