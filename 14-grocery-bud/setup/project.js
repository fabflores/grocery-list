import * as Common from "./common.js";

// const projAlert = document.querySelector(".alert");
const projForm = document.querySelector(".project-form");
const projList = document.querySelector(".project-list");
const projContainer = document.querySelector(".project-container");

const submitButton = document.querySelector(".submit-button");
const project = document.getElementById("project");
const name = document.getElementById("contributor");
const projDate = document.getElementById("projectDue");
const clearBtn = document.querySelector(".clear-button");

let editProjElement;
let editDateElement;
let editNameElement;
let editProjFlag = false;
let editProjID = "";

projForm.addEventListener("submit", addProject);
clearBtn.addEventListener("click", clearProjects);

function isNameTaken(name) {
  // try {
    const items = Common.getProjects();
    for (let i = 0; i<items.length;i++){
      if (name.toLowerCase() === items[i].projectVal.toLowerCase()) {
        return true;

      }
    }
    return false;
  // }
  // catch (error) {
  //   console.error('oops',error)
  // }


  ///loop project and compare name
  // use for (let i=i;i<items.lenght;i++) to loop
  // not for each
  //return true if taken , false otherses
}

function addOption(id, projectName) {
  var option = document.createElement("option");
      option.value = id;
      option.text = projectName;
      Common.selectEl.appendChild(option);
}

function addProject(e) {
  e.preventDefault();

  const dueVal = projectDue.value;
  const nameVal = contributor.value;
  const projectVal = project.value;

  const projId = new Date().getTime().toString();

  //new  assignment PAF
  // dont let name if reusue
  // if (isNameTaken (name)) {
  // .  show alert 'name take and return from function
  if (isNameTaken(projectVal)){
    Common.displayAlert("Name is taken", "danger");
  
  }

  addOption(projId,projectVal );
  
  if (dueVal && nameVal && projectVal && !editProjFlag) {
    createListItem(projId, nameVal, dueVal, projectVal);

    // displayAlert("project added to the list", "success");

    projContainer.classList.add("show-container");

    //projId, dueVal, projectVal, nameVal) 
    addToLocalStorage(projId,dueVal,projectVal, nameVal);

    setBackToProjDefault();
  } else if (dueVal && nameVal && projectVal && editProjFlag) {
    editProjElement.innerHTML = projectVal;
    editDateElement.innerHTML = dueVal;
    editNameElement.innerHTML = nameVal;
    // PAF: editdateElement not found.. i think is not the right one
    

    cdisplayAlert("value changed", "success");

    addToLocalStorage(projId, dueVal,projectVal, nameVal );
    setBackToProjDefault();
  } else {
    Common.displayAlert("please enter value", "danger");
  }
}
function clearProjects() {
  const items = document.querySelectorAll(".project-item");
  if (items.length > 0) {
    items.forEach(function (project) {
      projList.removeChild(project);
    });
  }
  projContainer.classList.remove("show-container");
  Common.displayAlert("empty list", "danger");
  setBackToProjDefault();
  localStorage.removeItem("project");
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
  // // set edit item
  // editProjElement = e.currentTarget.parentElement.parentElement;
  editProjElement = e.currentTarget.parentElement.previousElementSibling.previousElementSibling.previousElementSibling;
  editNameElement = e.currentTarget.parentElement.previousElementSibling.previousElementSibling;
  editDateElement = e.currentTarget.parentElement.previousElementSibling;

 

  project.value = editProjElement.innerHTML;
  name.value=editNameElement.innerHTML;
  projDate.value = editDateElement.innerHTML;
  // contributor.value = editCheckElement.innerHTML;

  editProjFlag = true;
  editProjID = element.dataset.projId;
  submitButton.textContent = "edit";
}

//set back to defaul
function setBackToProjDefault() {
  projDate.value = "";
  name.value = "";
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
//   localStoragex.setItem("project", JSON.stringify(items));
// }
// // ****** SETUP ITEMS **********

// window.addEventListener('DOMContentLoaded', setupProjItems);

function setupProjItems() {
 
  let items = Common.getProjects();
  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.projId, item.nameVal, item.dueVal, item.projectVal);
      // PAF: why is undefined when first start.
      // look how the paramenters of the function and what is passed
    });
    projContainer.classList.add("show-container");
  }
}

function createListItem(projId, nameVal, dueVal, projectVal) {
  const element = document.createElement("article");

  element.classList.add("project-item");

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
export {clearProjects};
