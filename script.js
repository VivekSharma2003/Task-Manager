document.addEventListener("DOMContentLoaded", function() {
    var taskInput = document.getElementById("taskInput");
    var addTaskButton = document.getElementById("addTaskButton");
    var taskList = document.getElementById("taskList");
    var errorContainer = document.getElementById("errorContainer");
    var tasks = [];
  
    // Load tasks from local storage
    if (localStorage.getItem("tasks")) {
      tasks = JSON.parse(localStorage.getItem("tasks"));
      renderTasks();
    }
  
    addTaskButton.addEventListener("click", function() {
      var task = taskInput.value.trim();
  
      if (task === "") {
        showError("Please enter a task.");
        return;
      }
  
      if (tasks.some(t => t.task === task)) {
        showError("Task already added.");
        return;
      }
  
      tasks.push({
        task: task,
        completed: false
      });
      saveTasksToLocalStorage();
      renderTasks();
      taskInput.value = "";
    });
  
    taskList.addEventListener("click", function(event) {
      if (event.target.classList.contains("delete-button")) {
        var taskItem = event.target.closest(".task-item");
        var index = Array.prototype.indexOf.call(taskList.children, taskItem);
  
        if (index > -1) {
          tasks.splice(index, 1);
          saveTasksToLocalStorage();
          renderTasks();
        }
      } else if (event.target.classList.contains("checkbox")) {
        var checkbox = event.target;
        var taskItem = checkbox.closest(".task-item");
        var index = Array.prototype.indexOf.call(taskList.children, taskItem);
  
        if (index > -1) {
          tasks[index].completed = !tasks[index].completed;
          saveTasksToLocalStorage();
          taskItem.classList.toggle("completed");
          updateCheckbox(checkbox, tasks[index].completed);
          updateTaskText(taskItem, tasks[index].completed);
        }
      }
    });
  
    function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach(function(taskObj) {
        var li = document.createElement("li");
        li.classList.add("task-item");
        li.innerHTML = `
          <div class="checkbox ${taskObj.completed ? 'checked' : ''}">
            <div class="checkmark"></div>
          </div>
          <div class="task-text">${taskObj.task}</div>
          <div class="delete-button">Delete</div>
        `;
        taskList.appendChild(li);
        updateTaskText(li, taskObj.completed);
      });
    }
  
    function updateCheckbox(checkbox, completed) {
      checkbox.innerHTML = completed ? "&#10003;" : "";
    }
  
    function updateTaskText(taskItem, completed) {
      var taskText = taskItem.querySelector(".task-text");
      if (completed) {
        taskText.classList.add("completed");
        taskText.style.textDecoration = "line-through";
        taskText.style.whiteSpace = "nowrap";
        taskText.style.overflow = "hidden";
        taskText.style.textOverflow = "ellipsis";
      } else {
        taskText.classList.remove("completed");
        taskText.style.textDecoration = "none";
        taskText.style.whiteSpace = "initial";
        taskText.style.overflow = "initial";
        taskText.style.textOverflow = "initial";
      }
    }
  
    function showError(message) {
      errorContainer.textContent = message;
      errorContainer.classList.add("error");
      setTimeout(function() {
        errorContainer.textContent = "";
        errorContainer.classList.remove("error");
      }, 2000);
    }
  
    function saveTasksToLocalStorage() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });
  


  