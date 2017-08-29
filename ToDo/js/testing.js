//set up variables
//var toDo = ["Work", "School", "Homework", "Dishes"];
var toDo = [];
var place = 0;
if (typeof(Storage) !== "undefined") {
    while(localStorage.getItem(place)) {
        toDo.push(localStorage.getItem(place));
        place++;
    }
}
var boxDiv = document.createElement("div");
document.body.appendChild(boxDiv);
boxDiv.setAttribute("class", "itemdiv");

//set up adding items to do
var addToDoDiv = document.createElement("div");
addToDoDiv.setAttribute("class", "additem");
var setToDo = document.createElement("input");
setToDo.setAttribute('id', 'setToDo');
setToDo.placeholder = "To Do";
var enterToDo = document.createElement("button");
enterToDo.innerHTML = "Add Item";

//set up clear all button
var clearAll = document.createElement("button");
clearAll.innerHTML = "Clear ToDo";

//set up area for items
var toDoList = document.createElement("ol");
var listCase = document.createElement("div");
boxDiv.appendChild(listCase);
listCase.appendChild(toDoList);

boxDiv.appendChild(addToDoDiv);
addToDoDiv.appendChild(setToDo);
addToDoDiv.appendChild(enterToDo);
addToDoDiv.appendChild(clearAll);

print();

//check if there is something to be added to the todo
enterToDo.addEventListener("click", function() {
    var addToDo = document.getElementById('setToDo').value;
    addToDo = addToDo[0].toUpperCase() + addToDo.slice(1);
    toDo.push(addToDo);
    
    setToDo.value = "";
    //print out the todo
    print();
})

setToDo.addEventListener("keypress", function(event) {
    var x = event.keyCode;
    if(x == 13) {
        var addToDo = document.getElementById('setToDo').value;
        addToDo = addToDo[0].toUpperCase() + addToDo.slice(1);
        toDo.push(addToDo);
        
        setToDo.value = "";
        //print out the todo
        print();
    }
})

clearAll.addEventListener("click", function() {
    toDo.length = 0; //clears the array
    print(); //refreshes the list
})

function append(item) {
    var div = document.createElement("div");
    div.setAttribute("id", "div");
    if (item == 0) div.setAttribute("class", "firstItem");
    else if (item == toDo.length - 1) div.setAttribute("class", "lastItem");
    else div.setAttribute("class", "middleItem");
    
    var list = document.createElement("li");
    list.setAttribute("class", "floatleft");
    
    var editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.setAttribute("class", "floatright")
    editButton.setAttribute("id", item);
    
    var delButton = document.createElement("button");
    delButton.innerHTML = "Delete";
    delButton.setAttribute("class", "floatright")
    delButton.setAttribute("id", item);
    
    var checkOffButton = document.createElement("input");
    checkOffButton.setAttribute("type", "checkbox");
    checkOffButton.setAttribute("class", "floatleft");
    
    var br = document.createElement("br");
    
    list.textContent = toDo[item];
    list.setAttribute("class", "itemtext");
    listCase.appendChild(div);
    div.appendChild(checkOffButton);
    div.appendChild(list);
    div.appendChild(editButton);
    div.appendChild(delButton);
    div.appendChild(br);
    
    editButton.addEventListener( "click", function () {
        var edit = document.createElement("input");
        edit.setAttribute("class", "floatleft");
        var doneButton = document.createElement("button");
        doneButton.setAttribute("class", "floatleft");
        doneButton.innerHTML = "Done";
        for (var i = 0; i < toDo.length; i++) {
            if (i == event.target.id) {
                var itemNum = i;
                edit.value = toDo[i];
                div.removeChild(list);
                div.removeChild(editButton);
                div.removeChild(br);
                
                div.appendChild(edit);
                div.appendChild(doneButton);
                div.appendChild(br);
                
                doneButton.addEventListener("click", function() {
                    var addToDo = edit.value;
                    addToDo = addToDo[0].toUpperCase() + addToDo.slice(1);
                    toDo.splice(itemNum, 1, addToDo);
                    print();
                })
            }
        }
    })
    
    delButton.addEventListener("click", function () {
        var pacman = document.createElement("div");
        var int = 0;
        for (var i = 0; i < toDo.length; i++) {
            if (i == event.target.id) {
                toDo.splice(i, 1);
            }
        }
        boxDiv.appendChild(pacman);
    
        var pos = 500;
        var id = setInterval(animateDel, 5);
        function animateDel() {
            pacman.setAttribute("class", "pacman");
            if (pos == 0) {
                clearInterval(id);
                boxDiv.removeChild(pacman);
            } else if (pos % 50 < 25) {
                pos--;
                pacman.setAttribute("class", "pacman");
                pacman.style.left = pos + "px";
            } else {
                pos--;
                pacman.setAttribute("class", "pacmanclose");
                pacman.style.left = pos + "px";
            }
        }
        print();
    })
    
    checkOffButton.addEventListener("click", function() {
        for (var i = 0; i < toDo.length; i++) {
            if (checkOffButton.checked) {
                list.setAttribute("class", "itemtextlinethrough");
            } else {
                list.setAttribute("class", "itemtext");
            }
        }
    })
}

function print() {
    listCase.textContent = "";
    //clear the local storage and write the array
    localStorage.clear();
    for (var i = 0; i < toDo.length; i ++) {
        localStorage.setItem(i,toDo[i]);
        append(i);
    }
}