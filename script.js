import controller from './src/controller.js';
import view from './src/view.js';
import model from './src/model.js';

controller.startGame();
view.init();
view.recolor(model.linesWithElement);
