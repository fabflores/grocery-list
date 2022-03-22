import {setupItems} from './todo.js';
import {setupProjItems} from './project.js'


window.addEventListener('DOMContentLoaded', function(){
    setupProjItems();
    setupItems();
});