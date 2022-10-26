const form = document.querySelector('.form'),
  taskInput = document.querySelector('.title'),
  tasksList = document.querySelector('.todo');


let tasks = [];

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function (task) {
  renderTask(task);

});

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);

function addTask(e) {
  e.preventDefault();

  const taskText = taskInput.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false
  };

  tasks.push(newTask);

  saveToLocalStorage();
  renderTask(newTask);
  taskInput.value = '';
  taskInput.focus();
}

function deleteTask(e) {
  if (e.target.dataset.action === 'delete') {
    const parentNode = e.target.closest('li');

    const id = Number(parentNode.id);

    tasks = tasks.filter(function (task) {
      if (task.id === id) {
        return false;
      } else {
        return true;
      }
    });
    parentNode.remove();
    saveToLocalStorage();
  }
}

function doneTask(e) {
  if (e.target.dataset.action === 'done') {
    const parentNode = e.target.closest('li');

    const id = Number(parentNode.id);
    const task = tasks.find(function (task) {
      if (task.id === id) {
        return true;
      }
    });

    task.done = !task.done;

    const taskTitle = parentNode.querySelector('.label_title');
    taskTitle.classList.toggle('label_title--done');
  }
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {
  const cssClass = task.done ? "label_title label_title--done" : "label_title";
  let taskHTML = `
               <li id="${task.id}" class="todo__item">
                  <p class="${cssClass}">${task.text}
                  </p>
                  <div class="actions">
                    <button class="done" type="button" data-action="done">
                      <img src="images/check-circle.svg" alt="">
                    </button>
                    <button class="delete" type="button" data-action="delete">
                      <img src="images/trash.svg" alt="">
                    </button>
                  </div>
                </li>
    `;
  tasksList.insertAdjacentHTML('beforeend', taskHTML);
}