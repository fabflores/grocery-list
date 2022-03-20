const projAlert = document.querySelector('.alert');
const projForm = document.querySelector('.project-form');
const projList = document.querySelector('.project-list');
const projContainer = document.querySelector('.project-container');


const submitButton = document.querySelector('.submit-button');
const project = document.getElementById('project');
const name = document.getElementById('contributor');
const projDate = document.getElementById('projectDue');




let editProjElement;
let editProjFlag = false;
let editProjID = "";


projForm.addEventListener('submit', addProject);
debugger
function addProject(e){
    e.preventDefault();
    const dueVal = projectDue.value;
    const nameVal = contributor.value;
    const projectVal = project.value;

    const projId = new Date().getTime().toString();


    if(dueVal && nameVal && projectVal && !editProjFlag ){
        createListItem(projId, nameVal, dueVal, projectVal);
    
        displayprojAlert('project added to the list', "success" );
      
        projContainer.classList.add("show-projContainer");
        
        addToLocalStorage(projId, nameVal, dueVal, projectVal);
     
        setBackToDefault();
    }

    else if(dueVal && nameVal && projectVal && editProjFlag){
        editProjElement.innerHTML=projectVal;
        editDateElement.innerHTML=dueVal;
        editCheckElement.innerHTML=nameVal;

        displayprojAlert("value changed", 'success');
       
        addToLocalStorage(projId, dueVal, nameVal, projectVal);
        setBackToDefault();
    }
    else{
        displayprojAlert('please enter value', 'danger');
    }
} 
debugger
function displayprojAlert(text,action){
    alert.textContent=text;
    alert.classList.add(`alert-${action}`);
    //remove alert
    setTimeout(function(){
        alert.textContent="";
        alert.classList.remove(`alert-${action}`);
    }, 3000 );
}


function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const projId = element.dataset.projId;
    projList.removeChild(element);
    if (projList.children.length === 0 ){
        projContainer.classList.remove("show-projContainer");
    }
    displayAlert('item removed', 'danger');
    setBackToDefault();

   
    removeFromLocalStorage(projId);

}

function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editProjElement=e.currentTarget.parentElement.parentElement
    
    
    project.value= editProjElement.innerHTML;
    projectDue.value=editDateElement.innerHTML;
    contributor.value=editCheckElement.innerHTML;

    editProjFlag=true;
    editProjID=element.dataset.projId;
    submitButton.textContent = "edit";
}


//set back to defaul
function setBackToDefault(){
    projectDue.value = "";
    contributor.value="";
    project.value="";

    editProjFlag= false;
    editProjID = "";
    submitButton.textContent = "submit";
}


debugger

// ****** LOCAL STORAGE **********
function addToLocalStorage(projId, dueVal, projectVal, nameVal){
    const project = {projId, dueVal, projectVal, nameVal};
    let items = getLocalStorage();
    items.push(project);
    localStorage.setItem('list',JSON.stringify(items));
   
}
function getLocalStorage() {
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
}
function removeFromLocalStorage(projId){
    let items = getLocalStorage();

    items=items.filter(function(item){
        if(item.projId !== projId){
            return item;
        }
    });
    localStorage.setItem("list", JSON.stringify(items)); 
    editLocalStorage(editProjID, dueVal, nameVal,projectVal);

function editLocalStorage(projId,projectVal){
    let items=getLocalStorage ();
    items = items.map(function(item){ 
        if(item.projId==projId){
            item.value = projectVal;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items));

}
// // ****** SETUP ITEMS **********
debugger
window.addEventListener('DOMContentLoaded', setupProjItems);
function setupProjItems(){
    let items = getLocalStorage();
    if(items.length > 0 ){
        items.forEach(function(item){
            createListItem(item.projId,item.value);
        });
        projContainer.classList.add('show-projContainer');
    }
}
}
debugger
function createProjListItem(projId,dueVal, nameVal, projectVal){
    const element = document.createElement('article');

    element.classList.add('project-item'); 
    
    const attr = document.createAttribute('data-projId');
    attr.value = projId;
    element.setAttributeNode(attr);

    element.innerHTML = `<p class="title">${projectVal}</p><p class="title">${nameVal}</p><p class="title">${dueVal}</p> <div class = "btn-container"> <button type = "button" class = "edit-btn"> <i class="fas fa-edit"></i> </button> <button type="button" class="delete-btn"> <i class="fas fa-trash">  </div>`;
   
    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');
    deleteBtn.addEventListener('click', deleteItem);
    editBtn.addEventListener('click', editItem);

    // append child 

    list.appendChild(element);
   

    }











