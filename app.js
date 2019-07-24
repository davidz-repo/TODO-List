/***********************  Project app  *********************/
document.getElementById('add-btn').style.color = 'white';


/* task 1 add UI and task items */
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('#clear-task-btn');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const todoList = 'TODO List';

// localStorage.removeItem(todoList);

// load all event listeners
(function () {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);

  // add tasks function
  form.addEventListener('submit', addTask);

  // remove tasks
  taskList.addEventListener('click', deleteTask);

  // clear all tasks
  clearBtn.addEventListener('click', clearTasks);

  // add a filter through tasks
  filter.addEventListener('keyup', filterTasks);
})();


function createLi(task){
  // create a list based on the input
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(task));
  // add the delete link
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  
  return li;
}

function addTask(e) {
  // add a task after hit the button
  if(taskInput.value.trim() === ''){
    alert('No entry detected');
  } else {
    taskList.appendChild(createLi(taskInput.value));
    // persist storage
    storeLocal(taskInput.value);
    console.log(taskInput.value);

    // clear the input
    taskInput.value = '';
    e.preventDefault();
  }
}

/* task 2 - add delete and filter tasks */
// must use event delegation becase of multiple elements

function deleteTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    e.target.parentElement.parentElement.remove();
    // remove from local storage
    removeFromlocalStorage(e.target.parentElement.parentElement);
  }
}

function removeFromlocalStorage(item){
  let tasks = (localStorage.getItem(todoList) === null) ?
              [] :
              JSON.parse(localStorage.getItem(todoList));
  tasks.forEach(function(t, index){
    if(item.textContent === t){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem(todoList, JSON.stringify(tasks));
}

function clearTasks(){
  // // replace the tag with ''
  // taskList.innerHTML = '';

  // a faster way is to removeChild
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.clear();
}

function filterTasks(e){
  // get the input
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    }
  );
}

/* task 3 - persist local storage */
// store locally
function storeLocal(item){
  let tasks = (localStorage.getItem(todoList) === null) ?
              [] :
              JSON.parse(localStorage.getItem(todoList));

  tasks.push(item);
  localStorage.setItem(todoList, JSON.stringify(tasks));
}
// show it after reloading
function getTasks(){
  let tasks = (localStorage.getItem(todoList) === null) ?
              [] :
              JSON.parse(localStorage.getItem(todoList));
  
  tasks.forEach(function(task){
    taskList.append(createLi(task));
  })
}
