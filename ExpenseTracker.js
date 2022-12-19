axiosInstance = axios.create({
    baseURL: 'https://crudcrud.com/api/815a9659a64c49c9b0074be62cd0635e'
});

myForm = document.getElementById('myForm');
amount = document.getElementById('amt');
description = document.getElementById('desc');
type = document.getElementById('type');
expenses = document.getElementById('list');
msg = document.getElementById('errorMsg');

myForm.addEventListener('submit',addExpense);

window.addEventListener("DOMContentLoaded", () => {

    //get request to crudcrud.com

    axiosInstance.get('/expenses')
                .then((res) => {
                    // console.log(res.data)
                    for(var i=0;i<res.data.length;i++){
                        showOnScreen(res.data[i]);
                    }
                    
                }).catch(err => {
                    console.log(err)
                })
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
            type : type.value,
        }
        
        localStorage.setItem(expense.type,JSON.stringify(expense));

        //Post request to crudcrud.com

        axiosInstance.post(
            '/expenses',expense
        ).then(res => {
            // console.log(res._id)
            showOnScreen(res.data)}).catch(err => {
            console.log(err)
        })
    
        
    
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

function deleteExpense(expenseId){
    // localStorage.removeItem(type);


    //delete request to crudcrud.com

    axiosInstance.delete(`/expenses/${expenseId}`)
    .then(res => console.log(res))
    .catch(err => {
        console.log(err)
    })

    var child = document.getElementById(expenseId);
    parent = document.getElementById('list');
    if(child){
        parent.removeChild(child);
    }
}

function editExpense(expenseId,amount1,description1,type1){
    
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

    axiosInstance.put(`/expenses/${expenseId}`,expenseObj)
    .then(res => {
        document.getElementById('amt').value = amount1;
        document.getElementById('desc').value = description1;
        document.getElementById('type').value = type1;

        deleteExpense(expenseId);
    })
    .catch(err => {
        console.log(err)
    })
}