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

