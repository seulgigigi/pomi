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
        saveTodoToLocalStorage(task); // Save task to localStorage
    }
}

function removeTodoFromLocalStorage(task) {
    let todoList = getToDoListFromLocalStorage();
    let index = todoList.indexOf(task);
    if (index !== -1) {
        todoList.splice(index, 1);
        saveToDoListToLocalStorage(todoList); // Save updated todo list to localStorage
    }
}

function removeTodoFromDOM(listItem) {
    listItem.classList.add("remove");
    setTimeout(() => {
        listItem.parentNode.removeChild(listItem);
    }, 500);
}

function saveTodoToLocalStorage(task) {
    let todoList = getToDoListFromLocalStorage();
    todoList.push(task);
    saveToDoListToLocalStorage(todoList); // Save updated todo list to localStorage
}

function getToDoListFromLocalStorage() {
    let todoList = localStorage.getItem("todoList");
    return todoList ? JSON.parse(todoList) : [];
}

function saveToDoListToLocalStorage(todoList) {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function splitTaskIntoLines(task) {
    let lines = [];
    let currentLine = "";
    
    for (let i = 0; i < task.length; i++) {
        currentLine += task[i];
        
        if (currentLine.length === 35 || task[i] === '\n') {
            lines.push(currentLine.trim());
            currentLine = "";
        }
    }
    
    if (currentLine.trim() !== "") {
        lines.push(currentLine.trim());
    }
    
    return lines;
}

function removeAllTodos() {
    document.getElementById("todoList").innerHTML = "";
}
