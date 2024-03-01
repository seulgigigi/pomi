function addTodo(){let e=document.getElementById("newTodo").value.trim();if(""!==e){let t=document.createElement("li");t.innerHTML=`
            <span>${e}</span>
            <button onclick="removeTodo(this)">Remove</button>
        `,document.getElementById("todoList").appendChild(t),document.getElementById("newTodo").value=""}}function removeTodo(e){let t=e.parentNode;document.getElementById("todoList").removeChild(t)}