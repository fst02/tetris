import controller from './src/controller.js';
import view from './src/view.js';
import model from './src/model.js';

controller.newItem();
controller.setGravity();
controller.moveHorizontally();
view.init();
view.recolor(model.linesWithElement);
