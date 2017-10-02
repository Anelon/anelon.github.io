var game = document.getElementById("game");
var board = game.children;
var dimention = board.length;
var rows = [];


//ability drop down (not a drop down)
var select = document.getElementById("abilitySelect");
var abilities = ["tornado", "rain", "fire", "lava", "oil", "ooze"]
var terrainTypes = ["blood", "water", "fire", "lava", "oil", "cloud", "posion", "smoke", "steam"]
for (var i = 0; i < abilities.length; i++) {
    var ability = document.createElement("div");
    ability.innerText = abilities[i];
    ability.className = "ability";
    ability.setAttribute("id", "ability" + i);
    select.appendChild(ability);
    console.log(abilities[i]);

    ability.addEventListener("click", function() { //select ability you want to use
        var abilityarr = select.children;
        var id = event.target.id.charAt(7); //7 = idnumber
        for (var i = 0; i < abilityarr.length; i++) {
            if (i == id) abilityarr[i].className = "ability bold";
            else abilityarr[i].className = "ability";
        }
    });
}


var abilitysizeX = 1;
var abilitysizeY = 1;
var abilitySizeDiv = document.getElementById("xy"); //xy values, fun
var xdiv = document.createElement("div");
var ydiv = document.createElement("div");
var xtext = document.createElement("div");
var ytext = document.createElement("div");
xtext.innerHTML = "X = ";
ytext.innerHTML = "Y = ";
xtext.className = "xytext";
ytext.className = "xytext";
var x = document.createElement("input");
var y = document.createElement("input");
x.placeholder = abilitysizeX;
y.placeholder = abilitysizeY;
x.className = "input";
y.className = "input";
xdiv.appendChild(xtext);
ydiv.appendChild(ytext);
xdiv.appendChild(x);
ydiv.appendChild(y);
x.setAttribute("id", "x");
y.setAttribute("id", "y");
var currentxy = document.createElement("div");
currentxy.className = "text";
currentxy.innerText = "(" + abilitysizeX + "," + abilitysizeY + ")";
var setxy = document.createElement("button");
setxy.innerText = "Set";
abilitySizeDiv.appendChild(xdiv);
abilitySizeDiv.appendChild(ydiv);
abilitySizeDiv.appendChild(setxy);
abilitySizeDiv.appendChild(currentxy);
setxy.addEventListener("click", function() {
    if (parseInt(x.value)) {
        abilitysizeX = parseInt(x.value);
        if (abilitysizeX > 9) abilitysizeX = 9;
        if (abilitysizeX < 1) abilitysizeX = 1;
    }
    if (parseInt(y.value)) {
        abilitysizeY = parseInt(y.value);
        if (abilitysizeY > 9) abilitysizeY = 9;
        if (abilitysizeY < 1) abilitysizeY = 1;
    }
    x.value = "";
    y.value = "";
    x.placeholder = abilitysizeX;
    y.placeholder = abilitysizeY;
    currentxy.innerText = "(" + abilitysizeX + "," + abilitysizeY + ")";
});

//get the rows into nice array
for (var i = 0; i < dimention; i++) {
    rows.push(board[i].children);
}
//id the game board
for (var i = 0; i < dimention; i++) {
    board[i].setAttribute("id", "row" + i);
    for (var j = 0; j < dimention; j++) {
        rows[i][j].setAttribute("id", i * dimention + j);
        rows[i][j].className = "empty noselect";
        //rows[i][j].innerText = "empty";
        if (i == 0) rows[i][j].className += " top";
        if (j == 0) rows[i][j].className += " left";
        if (j == dimention - 1) rows[i][j].className += " right";
        if (i == dimention - 1) rows[i][j].className += " bottom";
        var num = i + j;
        rows[i][j].addEventListener("click", function() {
            console.log(event.target.id);
            if (document.getElementsByClassName("bold")[0]) {
                var use = document.getElementsByClassName("bold")[0].innerText;
            }
            else console.log("No Ability Selected"); //make popup thing or something
            console.log(use);
            useAbility(use, event.target.id);
        });
    }
}

function toNum(x, y) {
    return y * dimention + x;
}

function toCoords(num) {
    var coord = [];
    coord.push(num % dimention);
    coord.push(parseInt(num / dimention));
    return coord;
}

function useAbility(skill, num) {
    num = parseInt(num);
    placeAbility(skill, num);

    var areaX = parseInt(abilitysizeX); //use in area specified
    var areaY = parseInt(abilitysizeY);
    if (areaX == 2 && areaY == 2) {
        if (parseInt(num / dimention) == parseInt((num + 1) / dimention)) {
            placeAbility(skill, num+1); 
        }
        var location = num + dimention;
        if (location < (dimention * dimention)) {
            placeAbility(skill, location);
            if (parseInt(location / dimention) == parseInt((location + 1) / dimention)) {
                placeAbility(skill, location + 1);
            }
        }
    } else if (areaX == 2) {
        if (parseInt(num / dimention) == parseInt((num + 1) / dimention)) {
            placeAbility(skill, num+1); 
        }
    } else if (areaY == 2) {
        placeAbility(skill, num+dimention);
    }
    for (var i = 1; i < areaX / 2; i++) { //use in area specified
        var location = num + i; //right
        if (parseInt(num / dimention) == parseInt((num + i) / dimention)) {
            placeAbility(skill, location);
        }
        var location = num - i; //left
        if (parseInt(num / dimention) == parseInt((num - i) / dimention)) {
            placeAbility(skill, location);
        }
        if (areaX % 2 == 0) {
            var location = num + i + 1; //even right
            if (parseInt(num / dimention) == parseInt((location) / dimention)) {
                placeAbility(skill, location);
            }
        }

        for (var j = 1; j < areaY / 2; j++) {
            var shiftY = num + j * dimention;
            if (shiftY < dimention * dimention) {
                var location = shiftY; //up
                placeAbility(skill, location);

                var location = shiftY + i; //right
                if (parseInt(shiftY / dimention) == parseInt((location) / dimention)) {
                    placeAbility(skill, location);
                }

                var location = shiftY - i; //left
                if (parseInt(shiftY / dimention) == parseInt((location) / dimention)) {
                    placeAbility(skill, location);
                }

                if (areaX % 2 == 0) {
                    var location = shiftY + i + 1;
                    if (parseInt(shiftY / dimention) == parseInt((location) / dimention)) {
                        placeAbility(skill, location);
                    }
                }
            }

            var shiftY = num - j * dimention;
            if (shiftY > 0) {
                var location = shiftY; //down
                placeAbility(skill, location);

                var location = shiftY + i; //right
                if (parseInt(shiftY / dimention) == parseInt((location) / dimention)) {
                    placeAbility(skill, location);
                }

                var location = shiftY - i; //left
                if (parseInt(shiftY / dimention) == parseInt((location) / dimention)) {
                    placeAbility(skill, location);
                }

                if (areaX % 2 == 0) {
                    var location = shiftY + i + 1;
                    if (parseInt(shiftY / dimention) == parseInt((location) / dimention)) {
                        placeAbility(skill, location);
                    }
                }
            }

            if (areaY % 2 == 0) {
                var shiftY = num + (1 + j) * dimention
                if (shiftY < dimention * dimention) {
                    var location = shiftY;
                    placeAbility(skill, location);

                    var location = shiftY + i;
                    if (parseInt(shiftY / dimention) == parseInt((location) / dimention)) {
                        placeAbility(skill, location);
                    }

                    var location = shiftY - i;
                    if (parseInt(shiftY / dimention) == parseInt((location) / dimention)) {
                        placeAbility(skill, location);
                    }

                    if (areaX % 2 == 0) {
                        var location = shiftY + i + 1;
                        if (parseInt(shiftY / dimention) == parseInt((location) / dimention)) {
                            placeAbility(skill, location);
                        }
                    }
                }
            }
        }
    }
}

function placeAbility(skill, num) {
    num = parseInt(num);
    if (skill == "tornado") useTornado(num);
    else if (skill == "rain") useRain(num);
    else if (skill == "fire") useFire(num);
    else if (skill == "lava") useLava(num);
    else if (skill == "oil") useOil(num);
    else if (skill == "ooze") useOoze(num);
}

function useTornado(num) { //tornado
    var spot = document.getElementById(num);
    var spotClass = spot.classList;
    for (var i = 0; i < terrainTypes.length; i++) spotClass.remove(terrainTypes[i]);
}

function useRain(num) { //RAIN
    var spot = document.getElementById(num);
    var spotClass = spot.classList;
    if (spotClass.contains("water")) {}
    else if (spotClass.contains("blood")) {}
    else if (spotClass.contains("fire")) {
        spotClass.remove("fire");
        spot.className += " steam";
    }
    else if (spotClass.contains("lava")) {}
    else if (spotClass.contains("oil")) {}
    else if (spotClass.contains("posion")) {}
    else if (spotClass.contains("smoke")) {}
    else if (spotClass.contains("steam")) {}
    else spot.className += " water";
}

function useFire(num) { // FIRE
    var spot = document.getElementById(num);
    var spotClass = spot.classList;
    if (spotClass.contains("water")) {
        spotClass.remove("water");
        spot.className += " steam";
    }
    else if (spotClass.contains("blood")) {}
    else if (spotClass.contains("fire")) {}
    else if (spotClass.contains("lava")) {}
    else if (spotClass.contains("oil")) {
        spotClass.remove("oil");
        explosion(num); //boom
    }
    else if (spotClass.contains("posion")) {
        spotClass.remove("posion");
        explosion(num); //boom
    }
    else if (spotClass.contains("smoke")) {}
    else if (spotClass.contains("steam")) {}
    else spot.className += " fire";
}

function useLava(num) { //LAVA
    var spot = document.getElementById(num);
    var spotClass = spot.classList;
    if (spotClass.contains("water")) {
        spotClass.remove("water");
        spot.className += " steam";
    }
    else if (spotClass.contains("blood")) {}
    else if (spotClass.contains("fire")) {}
    else if (spotClass.contains("lava")) {}
    else if (spotClass.contains("oil")) {
        spotClass.remove("oil");
        explosion(num); //boom
    }
    else if (spotClass.contains("posion")) {
        spotClass.remove("posion");
        explosion(num); //boom
    }
    else if (spotClass.contains("smoke")) {}
    else if (spotClass.contains("steam")) {}
    else spot.className += " lava";
}

function useOil(num) { //OIL
    console.log("oil");
    var spot = document.getElementById(num);
    var spotClass = spot.classList;
    if (spotClass.contains("water")) {}
    else if (spotClass.contains("blood")) {}
    else if (spotClass.contains("fire")) {
        spotClass.remove("fire");
        explosion(num); //boom
    }
    else if (spotClass.contains("lava")) {
        spotClass.remove("lava");
        explosion(num); //boom
    }
    else if (spotClass.contains("oil")) {}
    else if (spotClass.contains("posion")) {}
    else if (spotClass.contains("smoke")) {}
    else if (spotClass.contains("steam")) {}
    else spot.className += " oil";
}

function useOoze(num) { //OOZE
    console.log("ooze");
    var spot = document.getElementById(num);
    var spotClass = spot.classList;
    if (spotClass.contains("water")) {}
    else if (spotClass.contains("blood")) {}
    else if (spotClass.contains("fire")) {
        spotClass.remove("fire");
        explosion(num); //boom
    }
    else if (spotClass.contains("lava")) {
        spotClass.remove("lava");
        explosion(num); //boom
    }
    else if (spotClass.contains("oil")) {}
    else if (spotClass.contains("posion")) {}
    else if (spotClass.contains("smoke")) {}
    else if (spotClass.contains("steam")) {}
    else spot.className += " posion";
}

function usetmp(num) { //TMP
    var spot = document.getElementById(num);
    var spotClass = spot.classList;
    if (spotClass.contains("water")) {}
    else if (spotClass.contains("blood")) {}
    else if (spotClass.contains("fire")) {}
    else if (spotClass.contains("lava")) {}
    else if (spotClass.contains("oil")) {}
    else if (spotClass.contains("posion")) {}
    else if (spotClass.contains("smoke")) {}
    else if (spotClass.contains("steam")) {}
    else spot.className += " tmp";
}

function explosion(num) {
    var spot = document.getElementById(num);
    var spotClass = spot.classList;
    spotClass.remove("oil");
    spotClass.remove("posion");
    var right = document.getElementById(num + 1);
    var left = document.getElementById(num - 1);
    var up = document.getElementById(num - dimention);
    var down = document.getElementById(num + dimention);
    if (right)
        if (right.classList.contains("oil")) explosion(num + 1);
    if (left)
        if (left.classList.contains("oil")) explosion(num - 1);
    if (up)
        if (up.classList.contains("oil")) explosion(num - dimention);
    if (down)
        if (down.classList.contains("oil")) explosion(num + dimention);
    if (right)
        if (right.classList.contains("posion")) explosion(num + 1);
    if (left)
        if (left.classList.contains("posion")) explosion(num - 1);
    if (up)
        if (up.classList.contains("posion")) explosion(num - dimention);
    if (down)
        if (down.classList.contains("posion")) explosion(num + dimention);
}

function updateClasses() {
    for (var i = 0; i < dimention; i++) {
        for (var j = 0; j < dimention; j++) {
            if (i == 0) rows[i][j].className += " top";
            if (j == 0) rows[i][j].className += " left";
            if (j == dimention - 1) rows[i][j].className += " right";
            if (i == dimention - 1) rows[i][j].className += " bottom";
        }
    }
}
