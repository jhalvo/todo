var todoList = [];

// --------------------------------------------------------------------------------------------- //

function LoadPage() {
    document.getElementById('todo-input-form').addEventListener('submit', e => {e.preventDefault(); SubmitClick();}, false);
    document.getElementById('save-button').addEventListener('click', e => {SaveList();});
    document.getElementById('invalid-submission-alert-dismiss-button').addEventListener('click', e => {e.target.parentElement.style.display = 'none';});
    document.getElementById('settings-button').addEventListener('click', e => {e.target.parentElement.classList.toggle('responsive-button-container-active');});
    document.getElementById('remove-all-button').addEventListener('click', () => {RemoveAll();});
    document.getElementById('check-all-button').addEventListener('click', () => {CheckAll();});
    LoadList();
}
function LoadList() {
    if (localStorage.getItem('todoList')) {
        todoList = JSON.parse(localStorage.getItem('todoList'));
        for (var i = 0; i < todoList.length; i++) {
            DisplayTODOItem(todoList[i]);
        }
    }
}
function SaveList() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
    window.onbeforeunload = null;
}
function SavePrompt() {
    window.onbeforeunload = () => true;
}

// --------------------------------------------------------------------------------------------- //

function CreateTODOItem() {
    var newItem = {
        id : Math.floor(Date.now()/100).toString(32),
        content : DOMPurify.sanitize(document.getElementById('todo-input-field').value),
        completed : false
    }
    todoList.push(newItem);
    DisplayTODOItem(newItem);
    SavePrompt();
}
function RemoveTODOItem(listItem) {
    for (var i = 0; i < todoList.length; i++) {
        if (listItem && listItem.id && todoList[i].id === listItem.id) {
            todoList.splice(i, 1);
            break;
        }
    }
    listItem.parentNode.removeChild(listItem);
    SavePrompt();
}

// --------------------------------------------------------------------------------------------- //

function SubmitClick() {
    var todoInputField = document.getElementById('todo-input-field');
    if (todoInputField && todoInputField.value) {
        CreateTODOItem();
        document.getElementById('invalid-submission-alert').style.display='none';
        todoInputField.value = '';
    }
    else {
        document.getElementById('invalid-submission-alert').style.display='block';
    }
}
function DisplayTODOItem(newItemObject) {
    var listItem = document.createElement('li');
    listItem.classList.add('w3-display-container', 'list-item');
    listItem.id = newItemObject.id;

    var listItemButton = document.createElement('input');
    listItemButton.type = 'checkbox';
    listItemButton.classList.add('w3-check');
    listItemButton.addEventListener('click', e => {UpdateCompletedOnCheck(e.target);});
    listItemButton.checked = newItemObject.completed;
    listItem.appendChild(listItemButton);

    var ListItemContent = document.createElement('span');
    ListItemContent.classList.add('list-item-content');
    ListItemContent.innerText = newItemObject.content;
    listItem.appendChild(ListItemContent);

    var ListItemRemoveButton = document.createElement('span');
    ListItemRemoveButton.classList.add('w3-button', 'w3-display-right', 'list-item-close-button', 'gradient-hover-text', 'fas', 'fa-times');
    ListItemRemoveButton.addEventListener('click', e => {RemoveTODOItem(e.target.parentElement);});
    listItem.appendChild(ListItemRemoveButton);

    document.getElementById('todo-list').appendChild(listItem);
}

function UpdateCompletedOnCheck(completedCheckBox) {
    listItem = completedCheckBox.parentElement;
    for (var i = 0; i < todoList.length; i++) {
        if (listItem && listItem.id && todoList[i].id === listItem.id) {
            todoList[i].completed = completedCheckBox.checked;
            SavePrompt();
            break;
        }
    }
}
function RemoveAll() {
    var items = document.getElementsByClassName('list-item');
    while (items[0]) RemoveTODOItem(items[0]);
}
function CheckAll() {
    var uncheckAll = true;
    for (var i = 0; i < todoList.length; i++) {
        if(!todoList[i].completed) {
            uncheckAll = false;
            document.getElementById(todoList[i].id).firstChild.click();
        }
    }
    if(uncheckAll){
        for (var i = 0; i < todoList.length; i++) {
            document.getElementById(todoList[i].id).firstChild.click();
        }
    }
}