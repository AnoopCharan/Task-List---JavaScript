// UI variables
// use const or let, var is global
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// add function to load all event listners 
loadEventListners();

function loadEventListners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear tasks
    clearBtn.addEventListener('click', clearTasks);
    // filter tasks
    filter.addEventListener('keyup', filterTasks);
}

function addTask(e) {
    if (taskInput.value === '') {
        alert('input field empty');
    }

    // create an Li element to capture input
    const li = document.createElement('li');
    li.className='collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    // create new link el
    const link = document.createElement('a');
    link.className='delete-item secondary-content';
    // icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    // append to ul
    taskList.appendChild(li);

    // add to local storage
    localStore(taskInput.value);

    // clear input
    taskInput.value='';


     
    e.preventDefault(); }

function removeTask(e) {
    if (e.target.parentElement.classList.contains ('delete-item')){
        if (confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
            // remove from local storage
            removeLocalStored(e.target.parentElement.parentElement);
        }
    }


    
}

function clearTasks(e) {
    // console.log(e.target);
    // console.log(taskList);
    // tasks = taskList.children;

    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    if (localStorage.getItem('tasks') !== null) {
        tasks= [];
        localStorage.removeItem('tasks');
    }
    
    

    e.preventDefault;
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';

            }   else {
                task.style.display = 'none';
            }
        }
    );
    console.log(text);
}

function localStore(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks= [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        console.log('local storage empty')
        tasks= [];
    }
    else {
        console.log(localStorage.getItem('tasks'));
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    console.log(tasks);
    tasks.forEach(function(task) {
        // create an Li element to capture input
        const li = document.createElement('li');
        li.className='collection-item';
        li.appendChild(document.createTextNode(task));

        // create new link el
        const link = document.createElement('a');
        link.className='delete-item secondary-content';
        // icon
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        // append to ul
        taskList.appendChild(li);
    })

}

function removeLocalStored(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks= [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
            console.log(`tasks.splice(${index}, 1)`)
            console.log(tasks)
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}