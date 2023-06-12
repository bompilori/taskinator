var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");// selected ul element(<ul></ul>)
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");//reference to ul element 
var tasksCompletedEl = document.querySelector("#tasks-completed");//reference to ul element 

var taskFormHandler = function(event){
    event.preventDefault();//prevent the browser reload every time a event is triggered 

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //check if input values are empty strings
    if(!taskNameInput || !taskTypeInput){
        alert("you need to fill out the task form!");
        return false;
    }

    formEl.reset()//reset the submit to its default values


    var isEdit = formEl.hasAttribute("data-task-id");

    //has data attribute, so get task id and call function to complete edit process
    if(isEdit){
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }

    //no data attribute, so create object as normal and pass to createTaskEl function
    else{
         //package up data as an object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };

        //send it as an argument to createTaskEl
        createTaskEl(taskDataObj);
    }
};

var completeEditTask = function(taskName, taskType, taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId +"']");

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    //reset the form back to normal 
    formEl.removeAttribute("data-task-id");//to ensure that user are able to create a new tasks again 
    document.querySelector("#save-task").textContent = "Add Task";
};

var createTaskEl = function(taskDataObj){

    //create list item
    var listItemEl = document.createElement("li"); //create a new task item (<li></li>)
    listItemEl.className = "task-item";//style the new task item (<li></li>)

    //add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");//create a new div element (<div></div>)
    taskInfoEl.className = "task-info";//style the new div element (<div></div>)
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type +"</span>";
    listItemEl.appendChild(taskInfoEl);//insert div element into the li element 

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);//append this element to the task list. insert the li element in to the lu element

    //increase task counter for the next unique id 
    taskIdCounter++;
};

var createTaskActions = function(taskId){
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button 
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //create delete button 
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    //create  select dropdown
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    //create options for the select dropdown 
    var statusChoices = ["To Do", "In Progress", "Completed"];
    for(var i = 0; i < statusChoices.length; i++){
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select dropdown
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
}

var editTask = function(taskId){
    
    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");//reference the entire <li></li>element

    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
};

var deleteTask = function(taskId){
    var taskSelected =  document.querySelector(".task-item[data-task-id='" + taskId + "']");//reference the entire <li></li>element
    taskSelected.remove();
};

var taskStatusChangeHandler = function(event){
     
    //get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    //get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    //find the parent task item element based on the id 
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if(statusValue === "to do"){
        tasksToDoEl.appendChild(taskSelected);
    }

    else if(statusValue === "in progress"){
        tasksInProgressEl.appendChild(taskSelected);
    }

    else if(statusValue === "completed"){
        tasksCompletedEl.appendChild(taskSelected);
    }
};

var taskButtonHandler = function(event){
    
    //get target element from event
    var targetEl = event.target;

    //edit button was clicked
    if(targetEl.matches(".edit-btn")){
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    //delete button was clicked
    else if(targetEl.matches(".delete-btn")){

        //get the element's id
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);