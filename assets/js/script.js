var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event){
    event.preventDefault();//prevent the browser reload every time a event is triggered 

    var listItemEl = document.createElement("li"); //create a new task item
    listItemEl.className = "task-item";//style the new task item
    listItemEl.textContent = "this is a new task";//add the text
    tasksToDoEl.appendChild(listItemEl);//append this element to the task list.
};

formEl.addEventListener("submit", createTaskHandler);