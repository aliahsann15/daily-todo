const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");

/* --- DAILY RESET CHECK --- */
const today = new Date().toDateString();
const savedDate = localStorage.getItem("date");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

if (savedDate !== today) {
  // Reset ONLY checkboxes, not tasks
  todos = todos.map(todo => ({ ...todo, done: false }));
  localStorage.setItem("date", today);
  save();
}

/* --- RENDER --- */
function render() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    /* Checkbox */
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.onchange = () => {
      todo.done = checkbox.checked;
      save();
    };

    /* Task text */
    const span = document.createElement("span");
    span.textContent = todo.text;
    span.style.flexGrow = "1";
    span.style.textDecoration = todo.done ? "line-through" : "none";

    /* Trash icon */
    const trash = document.createElement("span");
    trash.innerHTML = "🗑";
    trash.style.color = "red";
    trash.style.marginLeft = "10px";
    trash.style.fontSize = "18px";
    trash.style.cursor = "pointer";
    trash.onclick = () => {
      todos.splice(index, 1);
      save();
    };

    li.addEventListener("click", () => {
      checkbox.checked = !checkbox.checked;
      checkbox.onchange();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(trash);
    list.appendChild(li);
  });
}

/* --- SAVE --- */
function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
  render();
}

/* --- ADD TODO --- */
input.addEventListener("keypress", e => {
  if (e.key === "Enter" && input.value.trim()) {
    todos.push({
      text: input.value.trim(),
      done: false
    });
    input.value = "";
    save();
  }
});

render();

/* --- WINDOW CONTROLS --- */
document.getElementById("close").onclick = () => window.api.close();
document.getElementById("minimize").onclick = () => window.api.minimize();
