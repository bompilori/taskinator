var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(){
    var listItemEl = document.createElement("li"); //create a new task item
    listItemEl.className = "task-item";//style the new task item
    listItemEl.textContent = "this is a new task";//add the text
    tasksToDoEl.appendChild(listItemEl);//append this element to the task list.
};

buttonEl.addEventListener("click", createTaskHandler);