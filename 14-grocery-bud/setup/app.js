// ****** SELECT ITEMS **********

const alert = document.querySelector('.alert');
const form = document.querySelector('.todo-form');
const todo = document.getElementById('todo');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.todo-container');
const list = document.querySelector('.todo-list');
const clearBtn = document.querySelector('.clear-btn');


const date=document.getElementById('due');


// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********

// submit form 
form.addEventListener('submit', addTodo);

clearBtn.addEventListener('click', clearItems);

// ****** FUNCTIONS **********

function addTodo(e){
    e.preventDefault();

    const todoDate = due.value;


    const todoVal = todo.value;

    const id = new Date().getTime().toString();

  
    if(todoVal&&todoDate && !editFlag){
        createListItem(id, todoVal,todoDate);
        

        //display alert
        displayAlert('item added to the list', "success" );

        //show container 
        container.classList.add("show-container");

        //add to local storage 
        addToLocalStorage(id,todoVal, todoDate);

        //set back to default
        setBackToDefault();
    }
    else if(todoVal && editFlag){
        editElement.innerHTML=todoVal;
        displayAlert("value changed", 'success');
        //edit local storage 

        editLocalStorage(editID, todoVal, todoDate);
        setBackToDefault();
    }
    else{
        displayAlert('please enter value', 'danger');
    }
}

//display alert

function displayAlert(text,action){
    
    alert.textContent=text;
    alert.classList.add(`alert-${action}`);

    //remove alert

    setTimeout(function(){
        alert.textContent="";
        alert.classList.remove(`alert-${action}`);
    }, 3000 );
}

//clear items 
function clearItems(){
    const items = document.querySelectorAll('.todo-item');

    if(items.length > 0 ){
        items.forEach(function(item){
            list.removeChild(item);
        });
    }

    container.classList.remove("show-container");
    displayAlert("empty list", "danger");
    setBackToDefault();
   localStorage.removeItem('list');
}

//delete item
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if (list.children.length === 0 ){
        container.classList.remove("show-container");
    }
    displayAlert('item removed', 'danger');
    setBackToDefault();

    // remove from local storage
    removeFromLocalStorage(id);

}

//  edit function
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;

    // set edit item
    editElement=e.currentTarget.parentElement.previousElementSibling;

    //set form value 
    todo.value = editElement.innerHTML;
    editFlag=true;
    editID=element.dataset.id;
    submitBtn.textContent = "edit";
    
    // here you should be able to read the date on the dom 121 gets the name, need a line for getting date, and value of complete
    //also here checbox should appear with checked if completed is true.
    
}

//set back to default 
function setBackToDefault(){
    todo.value = "";
    editFlag= false;
    editID = "";
    submitBtn.textContent = "submit";
}


// ****** LOCAL STORAGE **********
function addToLocalStorage(id, todoVal, todoDate){
    const todo = {id, todoVal, todoDate};
    let items = getLocalStorage();

    items.push(todo);
    localStorage.setItem('list',JSON.stringify(items));
    
    // console.log('added to local storage');
}
function getLocalStorage() {
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
}

function removeFromLocalStorage(id){
    let items = getLocalStorage();

    items=items.filter(function(item){
        if(item.id !== id){
            return item;
        }
    });
    
    localStorage.setItem("list", JSON.stringify(items)); 


  
function editLocalStorage(id,todoVal){
    let items=getLocalStorage ();
    items = items.map(function(item){ 
        if(item.id==id){
            item.value = todoVal;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items));

}
//localStorage API
// setItem
//getItem
//removeItem
//save as strings 
// localStorage.setItem('orange', JSON.stringify(["item", "item2"]
// ));
// const oranges = JSON.parse(localStorage.getItem('orange'));
// console.log(oranges);
// localStorage.removeItem('orange')

// // ****** SETUP ITEMS **********

window.addEventListener('DOMContentLoaded', setupItems);
function setupItems(){
    let items = getLocalStorage();
    if(items.length > 0 ){
        items.forEach(function(item){
            createListItem(item.id,item.value);

        });
        container.classList.add('show-container');

    }
}
}
function createListItem(id,todoVal, todoDate){
    const element = document.createElement('article');

    // add class
    element.classList.add('todo-item'); 

    // add id
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);

    element.innerHTML = `<input type = "checkbox" class="completed" placeholder ="check when completed"/><p class="title">${todoVal}</p> <p class="title">${todoDate}</p> <div class = "btn-container"> <button type = "button" class = "edit-btn"> <i class="fas fa-edit"></i> </button> <button type="button" class="delete-btn"> <i class="fas fa-trash">  </div>`;
   // this checkbox should   probably be disabled <input disabled type='checkbox'. but go enabled when edit.
    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');
    deleteBtn.addEventListener('click', deleteItem);
    editBtn.addEventListener('click', editItem);

    // append child 

    list.appendChild(element);
   

    }
