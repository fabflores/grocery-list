//*import
import * as Common from "./common.js";

// ****** SELECT ITEMS **********

// const alert = document.querySelector(".alert");
const form = document.querySelector(".todo-form");
const todo = document.getElementById("todo");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".todo-container");
const list = document.querySelector(".todo-list");
const clearBtn = document.querySelector(".clear-btn");
const selectEl = document.getElementById("project-select");
const date = document.getElementById("due");

const checkBoxEl = document.getElementById("completed");

// edit option
let editElement;
let editFlag = false;
let editID = "";
let isComplete;

// ****** EVENT LISTENERS **********
// when these event listener buttons are clicked (submit, clear, checkbox)
// the corresponding functions will be called
form.addEventListener("submit", addTodo);
clearBtn.addEventListener("click", clearItems);
checkBoxEl.addEventListener("change", completedOrNot);

// ****** FUNCTIONS **********

// const element = document.createElement("article");
// element.classList.add("project-item");
// const attr = document.createAttribute("data-projId");
// attr.value = projId;
// element.setAttributeNode(attr);
// element.innerHTML = `<p class="title">${projectVal}</p><p class="title">${nameVal}</p><p class="title">${dueVal}</p> <div class = "btn-container"> <button type = "button" class = "edit-btn"> <i class="fas fa-edit"></i> </button> <button type="button" class="delete-btn"> <i class="fas fa-trash">  </div>`;
//   const deleteBtn = element.querySelector(".delete-btn");
//   const editBtn = element.querySelector(".edit-btn");
//   deleteBtn.addEventListener("click", deleteProjItem);
//   editBtn.addEventListener("click", editProjItem);
//   // append child
//   projList.appendChild(element);

function completedOrNot(e) {
  isComplete = e.target.checked;
}

// addTodo function creates new list item
function addTodo(e) {
  e.preventDefault();
  const todoDate = due.value;
  const todoVal = todo.value;
  // const todoCheck= checkBox.checked;
  const id = new Date().getTime().toString();

  // if todoValue and todoDate are not blank, create the list item

  if (todoVal && todoDate && !editFlag) {
    createListItem(id, todoVal, todoDate, isComplete);

    //display alert
    Common.displayAlert("item added to the list", "success");
    //show container
    container.classList.add("show-container");
    //add to local storage
    addToLocalStorage(id, todoVal, todoDate, isComplete);
    //set back to default
    setBackToDefault();
  } else if (todoVal && todoDate && editFlag) {
    editElement.innerHTML = todoVal;
    editDateElement.innerHTML = todoDate;
    editCheckElement.checked = isComplete;

    Common.displayAlert("value changed", "success");
    //edit local storage
    addToLocalStorage(id, todoVal, todoDate, isComplete);
    setBackToDefault();
  } else {
    Common.displayAlert("please enter value", "danger");
  }
}

//display alert

// displayAlert displays the alerts when needed, and removes them after 3 seconds
// function displayAlert(text, action) {
//   alert.textContent = text;
//   alert.classList.add(`alert-${action}`);
//   //remove alert
//   setTimeout(function () {
//     alert.textContent = "";
//     alert.classList.remove(`alert-${action}`);
//   }, 3000);
// }

//clear items clears all the to do items
function clearItems() {
  debugger;
  const items = document.querySelectorAll(".todo-item");
  if (items.length > 0) {
    items.forEach(function (list) {
      list.removeChild(list);
    });
  }
  container.classList.remove("show-container");
  Common.displayAlert("empty list", "danger");
  setBackToDefault();
  localStorage.removeItem("list");
}

//delete item deletes a single item from to do list
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  Common.displayAlert("item removed", "danger");
  setBackToDefault();

  // remove from local storage
  Common.removeFromLocalStorage(id);
}

//when edit button is clicked, you will be able to change item name, date, and checkbox
//  edit function
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  // set edit item
  editElement =
    e.currentTarget.parentElement.previousElementSibling.previousElementSibling;
  editDateElement = e.currentTarget.parentElement.previousElementSibling;
  editCheckElement =
    e.currentTarget.parentElement.previousElementSibling.previousElementSibling;

  //set form value
  todo.value = editElement.innerHTML;
  date.value = editDateElement.innerHTML;
  checkBoxEl.value = editCheckElement.innerHTML;

  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "edit";
}

//set back to default
function setBackToDefault() {
  todo.value = "";
  date.value = "";
  checkBoxEl.checked = false;

  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, todoVal, todoDate, todoCheck) {
  const todo = { id, todoVal, todoDate, todoCheck };
  let items = Common.getLocalStorage("list");
  items.push(todo);
  localStorage.setItem("list", JSON.stringify(items));
  // console.log('added to local storage');
}
// // ****** SETUP ITEMS **********

function buildSelect() {
  const items = Common.getProjects();

  if (items.length > 0) {
    items.forEach(function (item) {
      var option = document.createElement("option");
      option.value = item.projId;
      option.text = item.nameVal;
      selectEl.appendChild(option);
    });
  }
}
// window.addEventListener('DOMContentLoaded', setupItems);
function setupItems() {
  let items = Common.getLocalStorage("list");
  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
  buildSelect();
}

function createListItem(id, todoVal, todoDate, todoCheck) {
  const element = document.createElement("article");

  // add class
  element.classList.add("todo-item");

  // add id
  const attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);

  element.innerHTML = `<input disabled type = "checkbox" id="completed"/> <p class="title">${todoVal}</p> <p class="title">${todoDate}</p> <div class = "btn-container"> <button type = "button" class = "edit-btn"> <i class="fas fa-edit"></i> </button> <button type="button" class="delete-btn"> <i class="fas fa-trash">  </div>`;

  const deleteBtn = element.querySelector(".delete-btn");
  const editBtn = element.querySelector(".edit-btn");
  deleteBtn.addEventListener("click", deleteItem);
  editBtn.addEventListener("click", editItem);

  // append child

  list.appendChild(element);
}

export { setupItems };
