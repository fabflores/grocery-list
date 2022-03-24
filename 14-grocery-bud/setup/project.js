import * as Common from "./common.js";

// const projAlert = document.querySelector(".alert");
const projForm = document.querySelector(".project-form");
const projList = document.querySelector(".project-list");
const projContainer = document.querySelector(".project-container");

const submitButton = document.querySelector(".submit-button");
const project = document.getElementById("project");
const name = document.getElementById("contributor");
const projDate = document.getElementById("projectDue");

let editProjElement;
let editProjFlag = false;
let editProjID = "";

projForm.addEventListener("submit", addProject);

function addProject(e) {
  e.preventDefault();

  const dueVal = projectDue.value;
  const nameVal = contributor.value;
  const projectVal = project.value;

  const projId = new Date().getTime().toString();

  if (dueVal && nameVal && projectVal && !editProjFlag) {
    createListItem(projId, nameVal, dueVal, projectVal);

    // displayAlert("project added to the list", "success");

    projContainer.classList.add("show-container");

    addToLocalStorage(projId, nameVal, dueVal, projectVal);

    setBackToProjDefault();
  } else if (dueVal && nameVal && projectVal && editProjFlag) {
    editProjElement.innerHTML = projectVal;
    editDateElement.innerHTML = dueVal;
    editCheckElement.innerHTML = nameVal;

    cdisplayAlert("value changed", "success");

    addToLocalStorage(projId, dueVal, nameVal, projectVal);
    setBackToProjDefault();
  } else {
    Common.displayAlert("please enter value", "danger");
  }
}

// function displayAlert(text, action) {
//   alert.textContent = text;
//   alert.classList.add(`alert-${action}`);
//   //remove alert
//   setTimeout(function () {
//     alert.textContent = "";
//     alert.classList.remove(`alert-${action}`);
//   }, 3000);
// }

function deleteProjItem(e) {

  const element = e.currentTarget.parentElement.parentElement;
  const projId = element.dataset.projId;
  projList.removeChild(element);
  if (projList.children.length === 0) {
    projContainer.classList.remove("show-container");
  }
  Common.displayAlert("item removed", "danger");
  setBackToProjDefault();

  Common.removeFromLocalStorage(projId);
}

function editProjItem(e) {
 
  const element = e.currentTarget.parentElement.parentElement;
  // set edit item
  editProjElement = e.currentTarget.parentElement.parentElement;

  project.value = editProjElement.innerHTML;
  projectDue.value = editDateElement.innerHTML;
  contributor.value = editCheckElement.innerHTML;

  editProjFlag = true;
  editProjID = element.dataset.projId;
  submitButton.textContent = "edit";
}

//set back to defaul
function setBackToProjDefault() {
  projectDue.value = "";
  contributor.value = "";
  project.value = "";

  editProjFlag = false;
  editProjID = "";
  submitButton.textContent = "submit";
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(projId, dueVal, projectVal, nameVal) {
  
  const project = { projId, dueVal, projectVal, nameVal };
  let items = Common.getLocalStorage("project");
  items.push(project);
  localStorage.setItem("project", JSON.stringify(items));
}

// function getProjLocalStorage() {
//   return localStorage.getItem("project")
//     ? JSON.parse(localStorage.getItem("project"))
//     : [];
// }
// function removeFromLocalStorage(projId) {
//   

//   let items = Common.getLocalStorage("project");

//   items = items.filter(function (item) {
//     if (item.projId !== projId) {
//       return item;
//     }
//   });
//   localStorage.setItem("project", JSON.stringify(items));
//   editProjLocalStorage(editProjID, dueVal, nameVal, projectVal);
// }
// function editProjLocalStorage(projId, projectVal) {
//   let items = Common.getProjLocalStorage("project");
//   items = items.map(function (item) {
//     if (item.projId == projId) {
//       item.value = projectVal;
//     }
//     return item;
//   });
//   localStorage.setItem("project", JSON.stringify(items));
// }
// // ****** SETUP ITEMS **********

// window.addEventListener('DOMContentLoaded', setupProjItems);

function setupProjItems() {
  let items = Common.getLocalStorage("project");
  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.projId, item.value);
    });
    projContainer.classList.add("show-container");
  }
}

function createListItem(projId, dueVal, nameVal, projectVal) {
  const element = document.createElement("article");

  element.classList.add("todo-item");

  const attr = document.createAttribute("data-projId");
  attr.value = projId;
  element.setAttributeNode(attr);

  element.innerHTML = `<p class="title">${projectVal}</p><p class="title">${nameVal}</p><p class="title">${dueVal}</p> <div class = "btn-container"> <button type = "button" class = "edit-btn"> <i class="fas fa-edit"></i> </button> <button type="button" class="delete-btn"> <i class="fas fa-trash">  </div>`;

  const deleteBtn = element.querySelector(".delete-btn");
  const editBtn = element.querySelector(".edit-btn");
  deleteBtn.addEventListener("click", deleteProjItem);
  editBtn.addEventListener("click", editProjItem);

  // append child

  projList.appendChild(element);
}

export { setupProjItems };
