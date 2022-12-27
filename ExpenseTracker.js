axiosInstance = axios.create({
    baseURL: 'https://crudcrud.com/api/91f5cfc5018548f59d42ee55da09b285'
});

myForm = document.getElementById('myForm');
amount = document.getElementById('amt');
description = document.getElementById('desc');
type = document.getElementById('type');
expenses = document.getElementById('list');
msg = document.getElementById('errorMsg');


window.addEventListener("DOMContentLoaded", async() => {

    //get request to crudcrud.com

    try{
        const res = await axiosInstance.get('/expenses')
        for(var i=0;i<res.data.length;i++){
            showOnScreen(res.data[i]);
        }
    }
    catch(err){
        console.log(err)
    }
    
})

addExpense = async() => {
    // e.preventDefault();

    if(amount.value === '' || description.value === '' || type.value === ''){
        msg.style.color = 'red';
        msg.innerHTML = 'Please fill all the Fields';
    }
    else{
        msg.style.display = 'none';
        const expense = {
            amount : amount.value,
            description : description.value,
            type : type.value,
        }
        
        localStorage.setItem(expense.type,JSON.stringify(expense));

        //Post request to crudcrud.com
        try{
            const res = await axiosInstance.post(
                '/expenses',expense
            )
            showOnScreen(res.data);
        }
        catch(err){
            console.log(err);
        }
        
    
        
    
        amount.value = "";
        description.value = "";
        type.value = "";
    }
    
}

function showOnScreen(expense){
    var li = document.createElement('li');
    li.id = `${expense._id}`;
    text = document.createTextNode(expense.amount + " " +  expense.description + " " + expense.type);
    li.appendChild(text);

    delHtml = `<input type = 'button' class = 'btn btn-danger btn-sm float-right' value = 'delete' onclick = "deleteExpense('${expense._id}')">`
    editHtml = `<input type = 'button' class = 'btn btn-success btn-sm float-right' value = 'edit' onclick = "editExpense('${expense._id}','${expense.amount}','${expense.description}','${expense.type}')">`

    li.innerHTML = li.innerHTML + delHtml + editHtml;

    expenses.appendChild(li);
}

async function deleteExpense(expenseId){
    // localStorage.removeItem(type);


    //delete request to crudcrud.com

    try{
        const res = await axiosInstance.delete(`/expenses/${expenseId}`);
        console.log(res);
        
    }
    catch(err){
        console.log(err)
    }
    

    var child = document.getElementById(expenseId);
    parent = document.getElementById('list');
    if(child){
        parent.removeChild(child);
    }
}

async function editExpense(expenseId,amount1,description1,type1){
    
    const amount = event.target.amount;
    const description = event.target.description;
    const type = event.target.type;
                
    const expenseObj = 
    {
        amount,
        description,
        type
    }

    // update request to crudcrud.com

    try{
        const res = await axiosInstance.put(`/expenses/${expenseId}`,expenseObj)
            document.getElementById('amt').value = amount1;
            document.getElementById('desc').value = description1;
            document.getElementById('type').value = type1;
    
            deleteExpense(expenseId);
    }
    catch(err){
        console.log(err)
    }
}