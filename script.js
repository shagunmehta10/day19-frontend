const API = "https://day19-backend.onrender.com";

// Load all tasks
async function loadTasks() {
  let res = await axios.get(API);
  let tasks = res.data;
  let list = document.getElementById("taskList");
  if (!list) return;
  list.innerHTML = "";
  tasks.forEach((t) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <span class="${t.completed ? "completed" : ""}">${t.title}</span>
      <button onclick="toggleTask('${t._id}', ${!t.completed})">
        ${t.completed ? "Undo" : "Complete"}
      </button>
      <button onclick="deleteTask('${t._id}')">Delete</button>
    `;
    list.appendChild(li);
  });
}

// Add new task
async function addTask() {
  let input = document.getElementById("taskInput");
  if (!input.value) return alert("Enter a task!");
  await axios.post(API, { title: input.value });
  input.value = "";
  loadTasks();
}

// Toggle complete
async function toggleTask(id, completed) {
  await axios.put(`${API}/${id}`, { completed });
  loadTasks();
}

// Delete task
async function deleteTask(id) {
  await axios.delete(`${API}/${id}`);
  loadTasks();
}

// Initial load
loadTasks();
