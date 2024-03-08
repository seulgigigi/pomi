// Function to add a new task
function addTodo() {
    // Retrieve the task input element
    let taskInput = document.getElementById("newTodo");
    let task = taskInput.value.trim();
    
    if (task.length <= 35) { // Check if task length is within limit
        if (task !== "") {
            // Retrieve the todo list element
            let todoList = document.getElementById("todoList");
            
            // Create a new list item for the task
            let listItem = document.createElement("li");
            listItem.textContent = task;
            listItem.classList.add("todo-item", "add");
            
            // Create a remove button for the task
            let removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.onclick = function() {
                removeTodoFromDOM(listItem); // Remove task from DOM
            };
            listItem.appendChild(removeButton);
            
            // Append the new list item to the todo list
            todoList.appendChild(listItem);
            
            // Clear the task input field
            taskInput.value = "";
            
            // Save task to local storage
            saveTask(task);
        }
    } else {
        alert("Task must be 35 characters or less.");
    }
}

// Function to remove a task from the DOM
function removeTodoFromDOM(listItem) {
    listItem.remove();
    // Remove task from local storage
    removeTask(listItem.textContent);
}

// Function to save task to local storage
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to remove a task from local storage
function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to remove all tasks from the DOM and local storage
function removeAllTodos() {
    let todoList = document.getElementById("todoList");
    todoList.innerHTML = ""; // Clear the todo list
    // Clear tasks from local storage
    localStorage.removeItem("tasks");
}

// Load tasks from local storage when the page is loaded
document.addEventListener("DOMContentLoaded", function() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let todoList = document.getElementById("todoList");
    tasks.forEach(task => {
        let listItem = document.createElement("li");
        listItem.textContent = task;
        listItem.classList.add("todo-item", "add");

        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = function() {
            removeTodoFromDOM(listItem);
        };
        listItem.appendChild(removeButton);

        todoList.appendChild(listItem);
    });
});
