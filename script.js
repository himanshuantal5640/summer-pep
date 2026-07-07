function addTask() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;

    if (title === "" || description === "") {
        alert("Please fill all fields");
        return;
    }

    let taskList = document.getElementById("taskList");

    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    taskDiv.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;

    taskList.appendChild(taskDiv);

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
}

function deleteTask(button) {
    button.parentElement.remove();
}