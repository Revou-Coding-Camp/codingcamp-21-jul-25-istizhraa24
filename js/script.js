document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const dateInput = document.getElementById("date-input");
  const filterInput = document.getElementById("filter-input");
  const todoList = document.getElementById("todo-list");
  const deleteAllBtn = document.getElementById("delete-all");

  let todos = [];

  todoForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const task = todoInput.value.trim();
    const date = dateInput.value;

    if (task && date) {
      todos.push({ id: Date.now(), task, date, done: false });
      renderTodos(todos);
      todoForm.reset();
    }
  });

  filterInput.addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    const filtered = todos.filter(t => t.task.toLowerCase().includes(keyword));
    renderTodos(filtered);
  });

  deleteAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure to delete all tasks?")) {
      todos = [];
      renderTodos(todos);
    }
  });

  function renderTodos(data) {
    todoList.innerHTML = "";

    if (data.length === 0) {
      todoList.innerHTML = `<tr><td colspan="4">No task found</td></tr>`;
      return;
    }

    data.forEach(todo => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${todo.task}</td>
        <td>${todo.date}</td>
        <td>${todo.done ? "✅ Done" : "⏳ Pending"}</td>
        <td>
          <button class="done-btn" data-id="${todo.id}">✔</button>
          <button class="delete-btn" data-id="${todo.id}">🗑</button>
        </td>
      `;
      todoList.appendChild(tr);
    });
  }

  todoList.addEventListener("click", function (e) {
    const id = Number(e.target.dataset.id);
    if (e.target.classList.contains("delete-btn")) {
      todos = todos.filter(t => t.id !== id);
      renderTodos(todos);
    } else if (e.target.classList.contains("done-btn")) {
      todos = todos.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
      );
      renderTodos(todos);
    }
  });

  renderTodos(todos);
});
