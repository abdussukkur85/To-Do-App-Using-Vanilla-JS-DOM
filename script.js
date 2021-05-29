/*
 * Title: To Do Application using vanilla JS DOM
 * Description: This JS file has all the JS functions necessary to control the to do application
 * Author: Abdus Sukkur
 * Date: 17/05/2021
 */

// Select element and assign them into variables
let newTask = document.querySelector("#new-task");
let form = document.querySelector("form");
let todoUl = document.querySelector("#items");
let completeUl = document.querySelector(".complete-list ul");

let createTask = function (task) {
  listItem = document.createElement("li");
  checkbox = document.createElement("input");
  label = document.createElement("label");
  listItem.class = "item";
  checkbox.type = "checkbox";
  label.innerText = task;

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  return listItem;
};

let addTask = function (event) {
  event.preventDefault();

  if (newTask.value.length != "") {
    let listItem = createTask(newTask.value);
    todoUl.appendChild(listItem);
    newTask.value = "";
    // bind the new list item to the incomplete task
    bindInCompleteTask(listItem, completeTask);
  }
};

let completeTask = function () {
  let listItem = this.parentNode;
  listItem.className = "item";
  let deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.innerText = "Delete";
  listItem.appendChild(deleteBtn);

  let checkbox = listItem.querySelector('input[type="checkbox"]');
  checkbox.remove();

  completeUl.appendChild(listItem);
  bindCompleteTask(listItem, deleteTask);
};

let deleteTask = function () {
  let listItem = this.parentNode;
  if (confirm("Are You Sure?")) {
    listItem.remove();
  }
};

let bindInCompleteTask = function (taskItem, checkBoxClick) {
  let checkbox = taskItem.querySelector('input[type="checkbox"]');
  checkbox.onchange = checkBoxClick;
};
let bindCompleteTask = function (taskItem, deleteButtonClick) {
  let deleteBtn = taskItem.querySelector(".delete");
  deleteBtn.onclick = deleteButtonClick;
};

for (var i = 0; i < todoUl.children.length; i++) {
  bindInCompleteTask(todoUl.children[i], completeTask);
}
for (var i = 0; i < completeUl.children.length; i++) {
  bindCompleteTask(completeUl.children[i], deleteTask);
}

form.addEventListener("submit", addTask);
