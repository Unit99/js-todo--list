//declaring UI vars
const form = document.querySelector('form');
const inputTask = document.getElementById('add');
const addTaskBtn = document.querySelector('input[type=submit]');

const filterTaskInput = document.getElementById('filter-task');

const taskList = document.querySelector('.task-list');

const clearTaskBtn = document.querySelector('.clear-tasks');

//loading all eventListeners
loadAllEventListeners();

function loadAllEventListeners(){
    //getting task from LS
    document.addEventListener('DOMContentLoaded', getTasks);

    //adding task to LS
    form.addEventListener('submit', addTask);

    //removing individual task item
    taskList.addEventListener('click', removeTask);

    //filtering any task
    filterTaskInput.addEventListener('keyup', filterTask);

    //removing all tasks together
    clearTaskBtn.addEventListener('click', removeAllTasks);
}

//getting task from the LS
function getTasks(){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
            //adding list items
            const listItem = document.createElement('li');

            //adding class to a list item
            listItem.className = 'list-item';

            //appending input value to the list item
            listItem.appendChild(document.createTextNode(task));

            //adding remove handle to the list item
            const removeItem = document.createElement('a');

            //adding class to the remove handle
            removeItem.className = 'remove-item';


            //appending the remove handle to the list item
            listItem.appendChild(removeItem);

            //adding remove icon inside remove handle
            removeItem.innerHTML = '<i class="fa fa-remove"></i>';    

            //appending list item to the task list
            taskList.appendChild(listItem);
    });
}

//adding task to the list block and sending it in LS
function addTask(e){
    if(inputTask.value === ''){
        alert('Please add a task');
    }

    //adding list items
    const listItem = document.createElement('li');

    //adding class to a list item
    listItem.className = 'list-item';

    //appending input value to the list item
    listItem.appendChild(document.createTextNode(inputTask.value));

    //adding remove handle to the list item
    const removeItem = document.createElement('a');

    //adding class to the remove handle
    removeItem.className = 'remove-item';


    //appending the remove handle to the list item
    listItem.appendChild(removeItem);

    //console.log(listItem);

    //adding remove icon inside remove handle
    removeItem.innerHTML = '<i class="fa fa-remove"></i>';    

    //appending list item to the task list
    taskList.appendChild(listItem);

    //console.log(taskList);

    //send input value to local storage
    storeInLocalStorage(inputTask.value);

    //clearing input value for add task
    inputTask.value = '';

    e.preventDefault();
}

//adding task to the LS
function storeInLocalStorage(task){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove individual task
function removeTask(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        if(confirm('Are you sure ?')){
            e.target.parentElement.parentElement.remove();
        }
    }

    //remove a task from LS
    removeFromLocalStorage(e.target.parentElement.parentElement);
}


//remove from LS
function removeFromLocalStorage(taskItem){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//filter task
function filterTask(e){
    const filterText = e.target.value.toLowerCase();

    document.querySelectorAll('.list-item').forEach(function(task){
        const taskItem = task.firstChild.textContent.toLowerCase();

        if(taskItem.indexOf(filterText) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }

        console.log(filterText);
    })    
}

//clear all tasks
function removeAllTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}

//Clear all tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();    
}


