const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group"); // Use querySelector to select the specific element
const firstCardBody = document.querySelectorAll(".card-body")[0]; // Add . before card-body
const secondCardBody = document.querySelectorAll(".card-body")[1]; // Add . before card-body
const filter = document.getElementById("filter");
const clearButton = document.getElementById("clear-todos");
const onlyDeleteButton = document.getElementsByClassName("fa fa-remove");

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addToDo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    clearButton.addEventListener("click",clearToDoS);
    secondCardBody.addEventListener("click",deleteItem);
    filter.addEventListener("keyup",filterTodos);
}

function loadAllTodosToUI(todo){      
    let todos = onlyStorage();
    todos.forEach(function(todo){
        arayuzeEkle(todo);
    });


}

function addToDo(e) {
    const newToDo = todoInput.value.trim();
    
    if(newToDo === ""){
//         <div class="alert alert-danger" role="alert">
//   A simple danger alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
//         </div>
        AlertGoster("danger","Lütfen bir todo girin");  // type,message seklinde girilir
    }
    else{
        arayuzeEkle(newToDo);
        storageEkle(newToDo);
        AlertGoster("success","Başarıyla eklendi")
    }

    todoInput.value = "";
    e.preventDefault();
}

// EKLENDİĞİNDE VEYA BOS EKLENDİĞİNDE BİZE ALERT DONECEK
function AlertGoster(type,message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.setAttribute("role","alert");
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    setTimeout(function(){       // setTimeout(function,1000)  1000=1sn anlamında // alert verdikten sonra kaybolmasını saglar
        alert.remove();
    },1000);


}

function arayuzeEkle(newTodo) {
    const listItem = document.createElement("li");
    const link = document.createElement("a");

    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class='fa fa-remove'></i>";
    listItem.className = "list-group-item d-flex justify-content-between";

    
    listItem.appendChild(document.createTextNode(newTodo));            // text node ekleme
    listItem.appendChild(link);

    todoList.appendChild(listItem); // Append the listItem element
}


   // local storage tek ve ortak kod fonksiyonu  (ORTAK)
function onlyStorage(){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos","newTodo"));
    }

    return todos;
}

function storageEkle(newToDo){
    todos = onlyStorage();

    todos.push(newToDo);
    localStorage.setItem("todos", JSON.stringify(todos));

    todoInput.value = "";

    e.preventDefault();
}


// CLEAR TO DO 
function clearToDoS(){
    todoList.remove();
    localStorage.clear()

}

// DELETE ITEM
function deleteItem(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteToDoFromStorage(e.target.parentElement.parentElement.textContent);  // alttaki fonksiyona metni silmek için li içerisindeki text i gonderdik

        AlertGoster("success","Silme işlemi başarılı");
        localStorage.removeItem();

    }
}
function deleteToDoFromStorage(targetTextContent){
    let todos = onlyStorage();

    todos.forEach(function(item,index){
        if(targetTextContent === item){
            todos.splice(index,1);          // ARRAY'den değeri silebiliriz
        }
    });
    
    localStorage.setItem("todos", JSON.stringify(todos));

}

// FİLTRELEME 
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(item){
        const text = item.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            // bulamadıysa
            item.setAttribute("style","display : none   !important");
        }
        else{
            item.setAttribute("style","display : block");
        }
    })



}