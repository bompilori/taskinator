var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");// selected ul element(<lu></lu>)

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
    
    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj){

    //create list item
    var listItemEl = document.createElement("li"); //create a new task item (<li></li>)
    listItemEl.className = "task-item";//style the new task item

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");//create a new div element (<div></div>)
    taskInfoEl.className = "task-info";//style the new div element 
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type +"</span>";

    listItemEl.appendChild(taskInfoEl);//insert div element into the li element 

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);//append this element to the task list. insert the li element in to the lu element

}

formEl.addEventListener("submit", taskFormHandler);