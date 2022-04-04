 const selectEl = document.getElementById("project-select");
 const clearAll = document.querySelector(".clear-all-btn");

//  function clearAll(){
//   const items = document.querySelectorAll(".todo-item");
//   if (items.length > 0) {
//     items.forEach(function (item) {
//       list.removeChild(item);
     
//     });
//   }
//   container.classList.remove("show-container");
//   Common.displayAlert("empty list", "danger");
//   setBackToDefault();
//   localStorage.removeItem("list");
//  }
 
//  const items = document.querySelectorAll(".project-item");
//  if (items.length > 0) {
//    items.forEach(function (project) {
//      projList.removeChild(project);
//    });
//  projContainer.classList.remove("show-container");
//  Common.displayAlert("empty list", "danger");
//  setBackToProjDefault();
//  localStorage.removeItem("project");
// }


function getLocalStorage(storageKey) {
    return localStorage.getItem(storageKey)
      ? JSON.parse(localStorage.getItem(storageKey))
      : [];
  }

//   function addToLocalStorage(id, todoVal, todoDate, todoCheck) {
//     const todo = { id, todoVal, todoDate, todoCheck };
//     let items = getLocalStorage();
//     items.push(todo);
//     localStorage.setItem("list", JSON.stringify(items));
//     // console.log('added to local storage');
//   }
  
  function removeFromLocalStorage(id) {
    let items = getLocalStorage();
  
    items = items.filter(function (item) {
      if (item.id !== id) {
        return item;
      }
    });
    localStorage.setItem("list", JSON.stringify(items));
    // editLocalStorage(editID, todoVal, todoDate);
  }
  function editLocalStorage(id, todoVal) {
    let items = getLocalStorage();
    items = items.map(function (item) {
      if (item.id == id) {
        item.value = todoVal;
      }
      return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
  }
  const alert = document.querySelector(".alert");

  function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    //remove alert
    setTimeout(function () {
      alert.textContent = "";
      alert.classList.remove(`alert-${action}`);
    }, 3000);
  }


function getProjects() {
  let items = getLocalStorage("project");

  return items;
 
  }


  export {getProjects, getLocalStorage, editLocalStorage, removeFromLocalStorage, displayAlert, selectEl}


