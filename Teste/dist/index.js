"use strict";
class Task {
    constructor(id, title, date, order) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.order = order;
    }
}
let taskArray;
let Id = 0;
window.onload = function () {
    RetrieveLocal();
};
function AddTask() {
    if (!taskArray) {
        const storedTaskList = localStorage.getItem('taskList');
        taskArray = storedTaskList ? JSON.parse(storedTaskList) : [];
    }
    const storedIdStart = localStorage.getItem('idStart');
    Id = storedIdStart ? parseInt(storedIdStart, 10) : 0;
    if (document.getElementById("inputTitle").value == "") {
        alert('Ponha algo no Nome da Tarefa');
    }
    else {
        var app = document.getElementById("myList");
        const ln = document.createElement("tr");
        app === null || app === void 0 ? void 0 : app.appendChild(ln);
        const colId = document.createElement("th");
        colId.textContent = localStorage.getItem('actualId');
        ln === null || ln === void 0 ? void 0 : ln.appendChild(colId);
        const colTitle = document.createElement("th");
        const colTask = document.getElementById("inputTitle").value;
        colTitle.textContent = colTask;
        ln === null || ln === void 0 ? void 0 : ln.appendChild(colTitle);
        const colDate = document.createElement("th");
        let date = new Date();
        colDate.textContent = date.toLocaleDateString();
        ln === null || ln === void 0 ? void 0 : ln.appendChild(colDate);
        if (!taskArray)
            taskArray = [];
        Id++;
        localStorage.setItem('idStart', Id.toString());
        let actualId = Id;
        localStorage.setItem('actualId', JSON.stringify(actualId));
        let newTask = new Task(Id, colTask, date.toLocaleDateString(), 0);
        taskArray.push(newTask);
        console.log(taskArray);
        SaveLocal();
        window.location.reload();
    }
}
function SaveLocal() {
    if (!taskArray) {
        console.error('tasklist é nula/indefinida');
        return;
    }
    let actualId = parseInt(localStorage.getItem('actualId') || '0', 10) + 1;
    localStorage.setItem('actualId', actualId.toString());
    localStorage.setItem('taskList', JSON.stringify(taskArray));
}
function RetrieveLocal() {
    const storedTaskList = localStorage.getItem('taskList');
    const taskListed = storedTaskList ? JSON.parse(storedTaskList) : [];
    console.log(taskListed);
    let tableTasks = document.getElementById("myList");
    for (let task of taskListed) {
        let tr = document.createElement("tr");
        tableTasks === null || tableTasks === void 0 ? void 0 : tableTasks.appendChild(tr);
        let collumId = document.createElement("th");
        collumId.textContent = task.id.toString();
        tr.appendChild(collumId);
        let collumTask = document.createElement("th");
        collumTask.textContent = task.title;
        tr.appendChild(collumTask);
        let collumDate = document.createElement("th");
        collumDate.textContent = task.date;
        tr.appendChild(collumDate);
        let collumEdit = document.createElement("th");
        let buttonEdit = document.createElement("button");
        buttonEdit.textContent = "Editar";
        const colTask = document.getElementById("inputTitle").value;
        buttonEdit.onclick = function () {
            Edit(task.id, colTask);
        };
        collumEdit.appendChild(buttonEdit);
        tr.appendChild(collumEdit);
        let collumRemove = document.createElement("th");
        let buttonRemove = document.createElement("button");
        buttonRemove.textContent = "Remover";
        buttonRemove.onclick = function () {
            Remove(task.id);
            tableTasks === null || tableTasks === void 0 ? void 0 : tableTasks.removeChild(tr);
        };
        collumRemove.appendChild(buttonRemove);
        tr.appendChild(collumRemove);
    }
}
function Remove(id) {
    if (!taskArray) {
        const storedTaskList = localStorage.getItem('taskList');
        taskArray = storedTaskList ? JSON.parse(storedTaskList) : [];
        window.location.reload();
    }
    taskArray = taskArray.filter(task => task.id !== id);
    SaveLocal();
}
function Edit(id, newTaskName) {
    const newTaskNameInput = document.querySelector('#inputTitle');
    newTaskName = newTaskNameInput.value;
    if (!taskArray) {
        const storedTaskList = localStorage.getItem('taskList');
        taskArray = storedTaskList ? JSON.parse(storedTaskList) : [];
    }
    const taskToUpdate = taskArray.find(task => task.id === id);
    if (taskToUpdate) {
        taskToUpdate.title = newTaskName;
        SaveLocal();
        const tableRow = document.querySelector(`#tasks tr[data-id="${id}"]`);
        const taskNameColumn = tableRow === null || tableRow === void 0 ? void 0 : tableRow.querySelector('td:nth-child(2)');
        if (taskNameColumn) {
            taskNameColumn.textContent = newTaskName;
        }
        const taskIndex = taskArray.findIndex(task => task.id === id);
        taskArray[taskIndex].title = newTaskName;
        window.location.reload();
    }
}
//# sourceMappingURL=index.js.map