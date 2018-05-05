let form = document.querySelector('#task-form');
let taskInput = document.querySelector('#task');
let taskList = document.querySelector('.collection');
let clearTaskBtn = document.querySelector('.clear-task');
let filter = document.querySelector('#filter');

//
loadEventListeners();

function loadEventListeners(){
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //  Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearTaskBtn.addEventListener('click', clearTask);
  // Filter task event
  filter.addEventListener('keyup', filterTask);
}

// get tasks from local storage
function getTasks(){
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create Text node
    li.appendChild(document.createTextNode(task));
    // Create new link createElement
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    // Add icon hrml
    link.innerHTML = '<i class="fas fa-times"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append the li to ul
    taskList.appendChild(li);
  });
}

// add a task
function addTask(e){
  e.preventDefault();
  if(taskInput.value === ''){
    alert('Add a task');
  }else{
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create Text node
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link createElement
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    // Add icon hrml
    link.innerHTML = '<i class="fas fa-times"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append the li to ul
    taskList.appendChild(li);
    // Store task in LS
    storeTaskInLocalStorage(taskInput.value);
    // Clear input
    taskInput.value = '';
  }
}

function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove a particular task
function removeTask(e){
  e.preventDefault();
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();
      removeTaskFromLS(e.target.parentElement.parentElement);
    }

  }
}

// remove from LS
function removeTaskFromLS(taskItem){
  console.log(taskItem.textContent);
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach(function(item, index){
    if(item == taskItem.textContent){
      console.log('match found');
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear all the tasks
function clearTask(e){
  e.preventDefault();
  console.log(e);
  let listItem = document.querySelectorAll('li');
  console.log(listItem);
  listItem.forEach(function(item){
    item.remove();
  });
  // clear from LS
  clearTaskFromLS();
}

// clear all tasks from LS
function clearTaskFromLS(){
  localStorage.clear();
}

// filter task
function filterTask(e){
  e.preventDefault();
  let inputText = e.target.value;
  let listItem = document.querySelectorAll('.collection-item');

  listItem.forEach(function(item){
    if(item.firstChild.textContent.toLowerCase().indexOf(inputText) != -1){   //checking if filter text is in task string
      item.style.display = 'block';
    }else{
      item.style.display = 'none';
    }
  });
}
