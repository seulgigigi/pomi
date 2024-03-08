document.addEventListener("DOMContentLoaded", function() {
    // Open a connection to the database
    const request = indexedDB.open('todoDatabase', 1);

    // Define the database schema
    request.onupgradeneeded = function(event) {
        const db = event.target.result;
        const objectStore = db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('taskName', 'taskName', { unique: false });
    };

    // Handle errors
    request.onerror = function(event) {
        console.error('Database error:', event.target.errorCode);
    };

    // Handle successful database creation
    request.onsuccess = function(event) {
        const db = event.target.result;

        // Load tasks from the database
        const transaction = db.transaction(['tasks'], 'readonly');
        const objectStore = transaction.objectStore('tasks');
        const getRequest = objectStore.getAll();

        getRequest.onsuccess = function(event) {
            const tasks = event.target.result;
            // Populate the to-do list with tasks
            const todoList = document.getElementById('todoList');
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.taskName;
                li.classList.add("todo-item");
                // Create a remove button for the task
                let removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.onclick = function() {
                    removeTodoFromDOM(li); // Remove task from DOM
                    removeTodoFromIndexedDB(task.taskName); // Remove task from IndexedDB
                };
                li.appendChild(removeButton);
                todoList.appendChild(li);
            });
        };

        getRequest.onerror = function(event) {
            console.error('Error retrieving tasks from database:', event.target.errorCode);
        };
    };
});
