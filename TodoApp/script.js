const input = document.querySelector("#input");
const addBtn = document.querySelector("#button");
const output = document.querySelector(".output");

const todoArr = [];

// Empty input & duplicate check
function check(title, arr) {
  if (title === "") {
    showModal("Todo can't be Empty!");
    return false;
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].title.toLowerCase() === title.toLowerCase()) {
      showModal("Todo already exists");
      return false;
    }
  }
  return true;
}

// Toggle done status
function toggleDone(i) {
  todoArr[i].completed = !todoArr[i].completed;
  render();
}

// Delete item
function delTodo(i) {
  todoArr.splice(i, 1);
  showModal("Todo deleted successfully! No Work!");
  render();
}

function render() {
  output.innerHTML = "";

  for (let i = 0; i < todoArr.length; i++) {
    //  Container
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    //  Title Span
    const span = document.createElement("span");
    span.textContent = todoArr[i].title;
    //  line-through if completed
    if (todoArr[i].completed) {
      span.classList.add("line");
    }

    //  Buttons Group
    const btnGroup = document.createElement("div");
    btnGroup.classList.add("btn-group");
    // Done Button
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✓";
    if (todoArr[i].completed) {
      doneBtn.textContent = "🔄️";
    }
    doneBtn.addEventListener("click", () => toggleDone(i));
    // Delete Button
    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑";
    delBtn.addEventListener("click", () => delTodo(i));

    // Append nodes
    btnGroup.appendChild(doneBtn);
    btnGroup.appendChild(delBtn);

    todoItem.appendChild(span);
    todoItem.appendChild(btnGroup);

    output.appendChild(todoItem);
  }
}

function addTodo() {
  const inputVal = input.value.trim();
  if (check(inputVal, todoArr)) {
    todoArr.push({
      title: inputVal,
      completed: false,
    });
    render();
  }
  input.value = "";
}

addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

function showModal(message) {
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");

  const modalBox = document.createElement("div");
  modalBox.classList.add("modal-box");

  const msg = document.createElement("p");
  msg.textContent = message;

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "OK";
  closeBtn.addEventListener("click", () => {
    document.body.removeChild(overlay);
  });

  modalBox.appendChild(msg);
  modalBox.appendChild(closeBtn);
  overlay.appendChild(modalBox);

  document.body.appendChild(overlay);
}
