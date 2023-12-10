const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === "") {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;

        let span = document.createElement("span");
        span.textContent = "\u00d7";

        // Append the span to the li
        li.appendChild(span);

        // Append the li to the list container
        listContainer.appendChild(li);

        // Add click event listener to the span for removing the task
        span.addEventListener("click", function () {
            li.remove();
            saveData();
        });
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
});

inputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function saveData() {
    // Create an array to store the task text content
    const tasks = [];

    // Iterate through each list item and store its text content in the array
    listContainer.querySelectorAll("li").forEach((li) => {
        tasks.push(li.textContent);
    });

    // Save the array to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTask() {
    // Retrieve the array from localStorage and parse it
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Clear the list container
    listContainer.innerHTML = "";

    // Add each task to the list container
    tasks.forEach((taskText) => {
        let li = document.createElement("li");
        li.textContent = taskText;

        let span = document.createElement("span");
        span.textContent = "\u00d7";

        // Append the span to the li
        li.appendChild(span);

        // Add click event listener to the span for removing the task
        span.addEventListener("click", function () {
            li.remove();
            saveData();
        });

        // Append the li to the list container
        listContainer.appendChild(li);
    });
}

showTask();
