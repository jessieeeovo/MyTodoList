var allowNew = true;
var newRecord;
var data = [];
displayAll();
document.getElementById('newBtn').addEventListener("click", function() {
    var value = document.getElementById('inputBox').value;
    document.getElementById("inputBox").style.display = "block";
    newRecord = {
        text: value,
        date: new Date(),
        datestr: '',
        editable: true
    };
    newRecord.datestr = newRecord.date.getFullYear()+"."+newRecord.date.getMonth()+'.'+newRecord.date.getDate();
    allowNew? addItemToList(newRecord, ''): "";
    allowNew = false;
});
document.getElementById('inputBox').addEventListener('input', function() {
    if (newRecord.editable)
        document.getElementById("currentItem").innerText = newRecord.datestr +' | '+ document.getElementById("inputBox").value;
});
document.getElementById('addBtn').addEventListener('click', function() {
    newRecord.editable = false;
    document.getElementById("inputBox").style.display = "none";
    newRecord.text = document.getElementById("inputBox").value;
    allowNew = true;
    document.getElementById("inputBox").value = "";
    data.push(newRecord);
    localStorage.setItem('todoList', JSON.stringify(data));
});
document.getElementById('clearBtn').addEventListener('click', function() {
    var ul = document.getElementById('todo');
    for(var i=ul.childNodes.length-1;i>=0;i--)
    {
        ul.removeChild(ul.childNodes[i]);
    }
    localStorage.clear();
});

function displayAll(){
    if (JSON.parse(localStorage.getItem("todoList")) != null){
        data = JSON.parse(localStorage.getItem("todoList"));
        for (var i = 0; i < data.length; i++){
            addItemToList(data[i], data[i].text);
        }
    }
}

function addItemToList(aRecord, content){
    var list = document.getElementById("todo");
    var item = document.createElement("li");
    item.id = "currentItem";
    var dateCol = document.createElement("div");
    dateCol.innerText = aRecord.datestr + ' | ' + content;

    item.appendChild(dateCol);
    list.insertBefore(item, list.childNodes[0]);
}