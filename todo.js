// todo.js

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
                removeTodoFromIndexedDB(task); // Remove task from IndexedDB
            };
            listItem.appendChild(removeButton);
            
            // Append the new list item to the todo list
            todoList.appendChild(listItem);
            
            // Clear the task input field
            taskInput.value = "";
            
            // Add task to IndexedDB
            addTask(task);
        }
    } else {
        alert("Task must be 35 characters or less.");
    }
}

// Function to remove a task from the DOM
function removeTodoFromDOM(listItem) {
    listItem.remove();
}

// Function to remove all tasks from the DOM
function removeAllTodos() {
    let todoList = document.getElementById("todoList");
    todoList.innerHTML = ""; // Clear the todo list
}
