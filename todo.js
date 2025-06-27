let tasks = [];

function updateStatus() {
  const done = tasks.filter(t => t.done).length;
  document.getElementById("status").innerText = `${done}/${tasks.length}`;
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";

    const left = document.createElement("div");
    left.className = "task-left" + (task.done ? " done" : "");
    
    const dot = document.createElement("div");
    dot.className = "dot";
    dot.onclick = () => {
      task.done = !task.done;
      renderTasks();
    };

    const text = document.createElement("span");
    text.className = "text";
    text.innerText = task.name;

    left.append(dot, text);

    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✏️";
    editBtn.onclick = () => {
      const newName = prompt("Edit task:", task.name);
      if (newName) {
        task.name = newName;
        renderTasks();
      }
    };

    const delBtn = document.createElement("button");
    delBtn.innerHTML = "🗑️";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      renderTasks();
    };

    actions.append(editBtn, delBtn);
    li.append(left, actions);
    taskList.appendChild(li);
  });

  updateStatus();
}

function addTask() {
  const input = document.getElementById("taskInput");
  const name = input.value.trim();
  if (name) {
    tasks.push({ name, done: false });
    input.value = "";
    renderTasks();
  }
}
