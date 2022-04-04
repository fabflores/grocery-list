import {setupItems} from './todo.js';
import {setupProjItems} from './project.js'
import {clearItems} from './todo.js';
import {clearProjects} from './project.js'


window.addEventListener('DOMContentLoaded', function(){
    setupProjItems();
    setupItems();
});

document.getElementById("clear").onclick = clearAll;
function clearAll(){
    clearItems();
    clearProjects();
}