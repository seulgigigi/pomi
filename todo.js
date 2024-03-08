// todo.js

function addTodo() {
    let taskInput = document.getElementById("newTodo");
    let task = taskInput.value.trim();
    
    if (task !== "") {
        let todoList = document.getElementById("todoList");
        splitTaskIntoLines(task).forEach(line => {
            let listItem = document.createElement("li");
            listItem.textContent = line;
            listItem.classList.add("todo-item", "add");
            
            let removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.onclick = function() {
                removeTodoFromLocalStorage(line); // Remove task from localStorage
                removeTodoFromDOM(listItem); // Remove task from DOM
            };
            listItem.appendChild(removeButton);
            
            todoList.appendChild(listItem);
            
            setTimeout(() => {
                listItem.classList.remove("add");
            }, 100);
        });
        
        taskInput.value = "";
        addTask(task); // Add task to IndexedDB
    }
}

// Function to add a new task
function addTask(taskName) {
    const request = indexedDB.open('todoDatabase', 1);
    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(['tasks'], 'readwrite');
        const objectStore = transaction.objectStore('tasks');
        const newTask = { taskName };
        const addRequest = objectStore.add(newTask);
        addRequest.onsuccess = function(event) {
            console.log('Task added to database');
        };
        addRequest.onerror = function(event) {
            console.error('Error adding task to database:', event.target.errorCode);
        };
    };
}
