function addTodo() {
    const task = document.getElementById('newTodo').value.trim();
    if (task !== '') {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${task}</span>
            <button onclick="removeTodo(this)">Remove</button>
        `;
        document.getElementById('todoList').appendChild(listItem);
        document.getElementById('newTodo').value = '';
    }
}

function removeTodo(button) {
    const listItem = button.parentNode;
    document.getElementById('todoList').removeChild(listItem);
}
