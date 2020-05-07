import controller from './src/controller.js';
import view from './src/view.js';
import model from './src/model.js';

controller.welcomeUser();
controller.newItem();
controller.setGravity();
controller.moveHorizontally();
controller.moveVertically();
view.init();
view.recolor(model.linesWithElement);
