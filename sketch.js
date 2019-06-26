function make2DArray(cols, rows) {
    textSize(30);
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows)
    }

    return arr;
}
var levelArr = [40];
var grid;
var cols;
var rows;
var w = 80;
var button = this.button
var xLevel = 5;
var win = false;
var dug = 0;
var levelOn = 1;
var totalBees = 7;
var bombRem = 0;
var game = false;


function setup() {
    num = 5;
    beeNum = 15;
    if (xLevel <= 5) {
        w = 130;
        totalBees = 3;
        bombRem = totalBees;
    } else if (xLevel >= num + 1 && xLevel <= num + 10) {
        w -= 5;
        totalBees = float(beeNum + beeNum * 0.35);
        bombRem = totalBees;
    } else {

        xLevel = 5;
        w = 130;
        totalBees = 3;
        bombRem = totalBees;

    }
    createCanvas(w * xLevel + 1, w * xLevel + 1);
    cols = floor(width / w);
    rows = floor(height / w);
    document.getElementById("bomb").innerHTML = 'Flags:' + Math.round(bombRem);

    grid = make2DArray(cols, rows);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, w)
        }
    }

    var options = [];
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            options.push([i, j]);
        }
    }

    for (var n = 0; n < totalBees; n++) {
        var index = floor(random(options.length));
        var choice = options[index];
        var i = choice[0];
        var j = choice[1];

        options.splice(index, 1);
        grid[i][j].bee = true;
    }
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].countBees();
        }
    }
}

function keyPressed() {
    if (keyCode === ENTER) {
        if (win) {
            win = false;
            xLevel += 5;
            dug = 0;
            setup();
            draw();
            win = false;
            textSize(30);
            levelOn += 1;
        }
    }
}

function winFunction() {
    dug = 0;
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            if ((grid[i][j].bee && grid[i][j].flagged) || grid[i][j].revealed) {
                dug += 1;
            }
        }
    }
    if (dug == xLevel * xLevel) {
        if (!game) {
            win = true;
        }
    }
}

function gameOver() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].revealed = true;

        }
    }
}

function mousePressed() {
    if (!keyIsDown(70)) {
        dug = 0;
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                if (grid[i][j].contains(mouseX, mouseY) && !grid[i][j].revealed && !grid[i][j].flagged) {
                    grid[i][j].reveal();
                    if (grid[i][j].bee) {
                        game = true;
                        gameOver();
                    }
                }
            }
        }
    } else {
        
        dug = 0;
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                if (grid[i][j].contains(mouseX, mouseY) && !grid[i][j].revealed) {
                    if (!(bombRem <=0)){
                        if (!grid[i][j].revealed) {

                            grid[i][j].flagged = !grid[i][j].flagged;

                            if (grid[i][j].flagged) {

                                bombRem -= 1;
                                print("=================")
                                print("reached in")
                                print("bomrem ==", bombRem)
                                print("=================")
                            } else {
                                bombRem += 1;
                            }
                            document.getElementById("bomb").innerHTML = 'Flags:' + Math.round(bombRem);
                        }
                    }else{
                        if (grid[i][j].flagged) {

                            grid[i][j].flagged = !grid[i][j].flagged;
                            bombRem += 1;

                        }

                    }

                }
            }
        }
    }

}

function draw() {
    if (!win) {
        winFunction();
        background(200);
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                grid[i][j].show();
            }
        }
    } else if (win) {
        winFunction();
        background(0, 128, 0);
        textSize(50);
        text("Congratulations Nerd", (w * xLevel + 1) / 2, (w * xLevel + 1) / 2);
        print("reached text enter")
        textSize(25);
        text("PRESS ENTER", (w * xLevel + 1) / 2, (w * xLevel + 1)/ 1.2);
        document.getElementById("level").innerHTML = 'LEVEL ' + levelOn;
    } else {
        winFunction();
        print("i have no idea how you got he but you better leave")
    }
}