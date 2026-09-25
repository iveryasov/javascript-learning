// Day 95
// Dashboard Task Tracker & Theme Engine

const changeThemeButton = document.querySelector("#change-theme-btn");
const taskNameInput = document.querySelector("#task-name-input");
const prioritySelector = document.querySelector("#priority-select");
const createTaskButton = document.querySelector("#create-task-btn");
const taskList = document.querySelector("#task-list");
const tasksProgress = document.querySelector("#tasks-progress");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
}

changeThemeButton.addEventListener("click", () => {
  document.body.classList.add("theme-transition");

  document.body.classList.toggle("dark-theme");

  if (document.body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

const createTask = () => {
  const userTaskName = taskNameInput.value;
  const userTaskPriority = prioritySelector.options[prioritySelector.selectedIndex].text;

  const userTask = document.createElement("li");

  const deleteTaskButton = document.createElement("button");

  deleteTaskButton.textContent = "✕";

  userTask.textContent = `Task: ${userTaskName} | Priority: ${userTaskPriority}`;

  deleteTaskButton.addEventListener("click", () => {
    userTask.remove();
    updateProgress();
  });

  userTask.addEventListener("click", () => {
    userTask.classList.toggle("completed");
    updateProgress();
  });
  
  userTask.appendChild(deleteTaskButton);

  taskList.appendChild(userTask);

  taskNameInput.value = "";
  prioritySelector.selectedIndex = 0;
};

createTaskButton.addEventListener("click", () => {
  createTask();
  updateProgress();
});

const updateProgress = () => {
  const allTasks = document.querySelectorAll("#task-list li");
  const completedTasks = document.querySelectorAll("#task-list li.completed");

  let percent = 0;

  if (allTasks.length > 0) {
    percent = (completedTasks.length / allTasks.length) * 100;
  }

  tasksProgress.value = percent;
};
