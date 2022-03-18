const submitButton = document.querySelector('.submit-btn');
const project = document.getElementById('project');
const name = document.getElementById('contributor');
const projDate = document.getElementById('projectDue');


function addProject(e){
    e.preventDefault();
    const dueVal = projectDue.value;
    const nameVal = contributor.value;
    const projectVal = project.value;

    const id = new Date().getTime().toString();


    if(dueVal && nameVal && projectVal && !editFlag ){
        createListItem(id, nameVal, dueVal, projectVal);
        //display alert
        displayAlert('project added to the list', "success" );
        //show container 
        container.classList.add("show-container");
        //add to local storage 
        addToLocalStorage(id, nameVal, dueVal, projectVal);
        //set back to default
        setBackToDefault();
    }
}





