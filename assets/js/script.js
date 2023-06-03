var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");// selected ul element(<lu></lu>)

var createTaskHandler = function(event){
    event.preventDefault();//prevent the browser reload every time a event is triggered 

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    //create list item
    var listItemEl = document.createElement("li"); //create a new task item (<li></li>)
    listItemEl.className = "task-item";//style the new task item

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");//create a new div element (<div></div>)
    taskInfoEl.className = "task-info";//style the new div element 

    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput +"</span>";
    listItemEl.appendChild(taskInfoEl);//insert div element into the li element 

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);//append this element to the task list. insert the li element in to the lu element

    console.dir(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);