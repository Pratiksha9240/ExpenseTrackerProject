myForm = document.getElementById('myForm');
amount = document.getElementById('amt');
description = document.getElementById('desc');
type = document.getElementById('type');
expenses = document.getElementById('list');
msg = document.getElementById('errorMsg');

myForm.addEventListener('submit',addExpense);

window.addEventListener("DOMContentLoaded", () => {
    const localStorageObj = localStorage;
    const localstoragekeys  = Object.keys(localStorageObj)

    for(var i =0; i< localstoragekeys.length; i++){
        const key = localstoragekeys[i]
        const ExpenseString = localStorageObj[key];
        const ExpenseObj = JSON.parse(ExpenseString);
        console.log(ExpenseObj);

        const expense = {
            amount : ExpenseObj.amount,
            description : ExpenseObj.description,
            type : ExpenseObj.type
        }
        showOnScreen(expense);
        
    }
})

function addExpense(e){
    e.preventDefault();

    if(amount.value === '' || description.value === '' || type.value === ''){
        msg.style.color = 'red';
        msg.innerHTML = 'Please fill all the Fields';
    }
    else{
        msg.style.display = 'none';
        const expense = {
            amount : amount.value,
            description : description.value,
            type : type.value
        }
        
        localStorage.setItem(expense.type,JSON.stringify(expense));
    
        showOnScreen(expense);
    
        amount.value = "";
        description.value = "";
        type.value = "";
    }
    
}

function showOnScreen(expense){
    var li = document.createElement('li');
    li.id = `${expense.type}`;
    text = document.createTextNode(expense.amount + " " +  expense.description + " " + expense.type);
    li.appendChild(text);

    delHtml = `<input type = 'button' class = 'btn btn-danger' value = 'delete' onclick = "deleteExpense('${expense.type}')">`
    editHtml = `<input type = 'button' class = 'btn btn-success' value = 'edit' onclick = "editExpense('${expense.amount}','${expense.description}','${expense.type}')">`

    li.innerHTML = li.innerHTML + delHtml + editHtml;

    expenses.appendChild(li);
}

function deleteExpense(type){
    localStorage.removeItem(type);
    var child = document.getElementById(type);
    parent = document.getElementById('list');
    if(child){
        parent.removeChild(child);
    }
}

function editExpense(amount,description,type){
    document.getElementById('amt').value = amount;
    document.getElementById('desc').value = description;
    document.getElementById('type').value = type;

    deleteExpense(type);
}