let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

//Add Task
let arrayofTasks = [];
if (localStorage.getItem("tasks")) {
  arrayofTasks = JSON.parse(localStorage.getItem("tasks"));
}
getDatafromlocalstorage();
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    //remove from page
    e.target.parentNode.remove();
    //remove from localstorage
    deletetaskwith(e.target.parentNode.getAttribute("data-id"));
  }
  if (e.target.classList.contains("task")) {
    tooglestatues(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});
function addTaskToArray(value) {
  const task = {
    id: Date.now(),
    title: value,
    completed: false,
  };
  arrayofTasks.push(task);
  addelementstopagefrom(arrayofTasks);
  savetoLocalstorage(arrayofTasks);
}

function addelementstopagefrom(arrayofTasks) {
  tasksDiv.innerHTML = "";
  arrayofTasks.forEach((task) => {
    //create main div
    let div = document.createElement("div");
    div.className = "task";
    //check if t6ask done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    //create delete button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    //add div to main tasks
    tasksDiv.appendChild(div);
  });
}
function savetoLocalstorage(arrayofTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayofTasks));
}

function getDatafromlocalstorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addelementstopagefrom(tasks);
  }
}
function deletetaskwith(taskid) {
  arrayofTasks = arrayofTasks.filter((task) => task.id != taskid);
  savetoLocalstorage(arrayofTasks);
}
function tooglestatues(taskid) {
  for (let i = 0; i < arrayofTasks.length; i++) {
    if (arrayofTasks[i].id == taskid) {
      arrayofTasks[i].completed == false
        ? (arrayofTasks[i].completed = true)
        : (arrayofTasks[i].completed = false);
    }
  }
  savetoLocalstorage(arrayofTasks);
}
