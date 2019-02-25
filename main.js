const LIST_TEMPLATE_ONE = '<li id="';
const LIST_TEMPLATE_TWO = '" class="w3-display-container"><input class="w3-check" type="checkbox" onClick="UpdateCompletedOnCheck(this)"'
const LIST_TEMPLATE_THREE = '><span class="list-item-content" style="padding-left: 16px;">';
const LIST_TEMPLATE_FOUR = '</span><span class="w3-button w3-display-right list-item-close-button gradient-hover-text fas fa-times" onClick="RemoveTODOItem(this.parentElement)"></span> </li>';

var todoList = [];

// --------------------------------------------------------------------------------------------- //

function LoadPage() {
    document.getElementById('todo-input-form').addEventListener('submit', e => {e.preventDefault(); SubmitClick();}, false);
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
}
function RemoveTODOItem(listItem) {
    for (var i = 0; i < todoList.length; i++) {
        if (listItem && listItem.id && todoList[i].id === listItem.id) {
            todoList.splice(i, 1);
            break;
        }
    }
    listItem.parentNode.removeChild(listItem);
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
function DisplayTODOItem(newItem) {
    var boxIsChecked = '';
    if (newItem.completed) boxIsChecked = 'checked';
    document.getElementById('todo-list').innerHTML  += LIST_TEMPLATE_ONE + newItem.id.toString()
                                                    +  LIST_TEMPLATE_TWO + boxIsChecked
                                                    +  LIST_TEMPLATE_THREE + newItem.content.toString()
                                                    +  LIST_TEMPLATE_FOUR;
}
function UpdateCompletedOnCheck(completedCheckBox) {
    listItem = completedCheckBox.parentElement;
    for (var i = 0; i < todoList.length; i++) {
        if (listItem && listItem.id && todoList[i].id === listItem.id) {
            todoList[i].completed = completedCheckBox.checked;
            break;
        }
    }
}