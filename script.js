const addTaskButton = document.querySelector('#add-task');
const taskList = document.querySelector('#task-list');
const input = document.querySelector('#task-content');
const clearListButton = document.querySelector('#clear-list');
const removeTasksButton = document.querySelector('#clear-completed');
const saveListButton = document.querySelector('#save-task-list');
const upButton = document.querySelector('#move-up');
const downButton = document.querySelector('#move-down');
const removeSelectedButton = document.querySelector('#remove-selected');


function changeSelectedTask(selectedTask, newSelectedTask) {
  const status = 'selected';
  
  if (selectedTask !== newSelectedTask) {
    /*
    Consultei o site abaixo para descobrir como adicionar e remover uma classe sem perder as que já estavam aplicadas
    ref: https://www.w3schools.com/jsref/prop_element_classlist.asp
    */
    selectedTask.classList.remove(status);
    newSelectedTask.classList.add(status);
  }
}

function getSelectedTask() {
  return document.querySelector('.selected');
}

function changeTaskBackgroundColor(task) {
  /*
  Consultei o site abaixo para descobrir como criar uma função anônima de forma que o linter aceitasse
  ref: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Arrow_functions
  */
 task.addEventListener('click', (event) => {
    const selectedTask = getSelectedTask();
    // Quando nenhuma tarefa foi selecionada ainda, o conteúdo de selectedTask é null, então eu apenas atribuo a classe selected ao elemento que disparou esse evento. Caso contrário, eu retiro selected da tarefa atual selecionada e atribuo ela ao elemento que disparou o evento.
    if (selectedTask !== null) {
      changeSelectedTask(selectedTask, event.target);
    } else {
      event.target.classList.add('selected');
    }
  });
}

function markAsCompleted(task) {
  task.addEventListener('dblclick', (event) => {
    /*
    Consultei o site abaixo para descobrir como alternar a aplicação de uma classe a um elemento
    ref: https://www.w3schools.com/jsref/prop_element_classlist.asp
    */
   event.target.classList.toggle('completed');
  });
}

window.onload = () => {
  if (localStorage.length !== 0) {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));

    savedTasks.forEach((savedTask) => {
      const task = document.createElement('li');
      task.className = savedTask.classes;
      task.innerText = savedTask.content;
      taskList.appendChild(task);

      localStorage.clear();

      changeTaskBackgroundColor(task);

      markAsCompleted(task);
    });
  }
};

addTaskButton.addEventListener('click', () => {
  if (input.value !== '') {
    const task = document.createElement('li');
    task.classList.add('task');
    task.innerText = input.value;
    taskList.appendChild(task);

    input.value = '';

    changeTaskBackgroundColor(task);

    markAsCompleted(task);
  } else {
    alert('Ops! You have not added the task.');
  }
});

clearListButton.addEventListener('click', () => {
  /*
  Consultei o site abaixo para descobrir como remover todos os filhos de um nó
  ref: https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
  */
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
});

removeTasksButton.addEventListener('click', () => {
  /*
  Consultei o site abaixo para descobrir como remover todos os elementos com uma característica específica de uma HTML Collection
  ref: https://stackoverflow.com/questions/37311003/how-to-remove-an-item-from-htmlcollection
  */
  const { children } = taskList;

  [...children].forEach((child) => {
    /*
    Consultei o link abaixo para saber como identificar se um elemento contém uma classe específica aplicada a ele
    ref: https://www.w3schools.com/jsref/prop_element_classlist.asp
    */
    if (child.classList.contains('completed')) {
      taskList.removeChild(child);
    }
  });
});

saveListButton.addEventListener('click', () => {
  const tasks = document.getElementsByClassName('task');
  const tasksArray = [];

  [...tasks].forEach((task) => {
    tasksArray.push({
      content: task.innerText,
      classes: task.classList.value,
    });
  });

  localStorage.setItem('tasks', JSON.stringify(tasksArray));
  alert('Your list has been saved!');
});

upButton.addEventListener('click', () => {
  const selectedTask = getSelectedTask();

  if (selectedTask === null) {
    alert('No task was selected.');
  } else if (selectedTask !== taskList.firstElementChild) {
    /*
    Consultei o site abaixo para descobrir como adicionar um elemento HTML antes de um determinado elemento já existente
    ref: https://developer.mozilla.org/pt-BR/docs/Web/API/Node/insertBefore
    */
    taskList.insertBefore(selectedTask, selectedTask.previousElementSibling);
  }
});

downButton.addEventListener('click', () => {
  const selectedTask = getSelectedTask();

  if (selectedTask === null) {
    alert('No task was selected.');
  } else if (selectedTask !== taskList.lastElementChild) {
    taskList.insertBefore(selectedTask.nextElementSibling, selectedTask);
  }
});

removeSelectedButton.addEventListener('click', () => {
  const selectedTask = getSelectedTask();
  taskList.removeChild(selectedTask);
});
