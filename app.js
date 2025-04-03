document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Renderizar tareas
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.className = `task ${task.completed ? 'completed' : ''}`;
        taskElement.innerHTML = `
          <span>${task.text}</span>
          <div>
            <button onclick="toggleTask(${index})">${task.completed ? 'Deshacer' : 'Completar'}</button>
            <button onclick="editTask(${index})">Editar</button>
            <button onclick="deleteTask(${index})">Eliminar</button>
          </div>
        `;
        taskList.appendChild(taskElement);
      });
    }
    
    // Agregar tarea
    taskForm.addEventListener('submit', e => {
      e.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText) {
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        taskInput.value = '';
        renderTasks();
      }
    });
    
    // Guardar tareas en localStorage
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Funciones globales para los botones
    window.toggleTask = function(index) {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };
    
    window.editTask = function(index) {
      const newText = prompt('Editar tarea:', tasks[index].text);
      if (newText !== null && newText.trim() !== '') {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
      }
    };
    
    window.deleteTask = function(index) {
      if (confirm('¿Eliminar esta tarea?')) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      }
    };
    
    // Renderizar tareas al cargar
    renderTasks();
  });