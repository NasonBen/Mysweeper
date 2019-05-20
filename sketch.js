function make2DArray(cols,rows) {
    console.log("2D arr reached")
    textSize(30);
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows)
    }
    
    return arr;
}
var levelArr = [40] // this will be used to control the size of each square to get ruffly the same size for all the grid
var grid;
var cols;
var rows;
var w = 80; // width of each square
var button = this.button
var xLevel = 5; // i will use this to times the w to get the width of the grid
var win = false;
var dug = 0;

var totalBees = 7;

function setup() {
    console.log("setUp func reached")
    if (xLevel <= 5){
        w = 130;
        totalBees = 3;
    }else if (xLevel >= 6 && xLevel <= 10) {
        w = 80;
        totalBees = 15;

    }else if (xLevel >= 11 && xLevel <= 20) {
        totalBees = 25;
        w = 60;
    }else if (xLevel >= 21 && xLevel <= 30) {
        totalBees = 75;
        w = 40;
    }else if (xLevel >= 31 && xLevel <= 40) {
        totalBees = 120;
        w = 40;
    }else if (xLevel >= 41 && xLevel <= 50) {
        totalBees = 200;
        w = 30;
    }else if (xLevel >= 51 && xLevel <= 60) {
        totalBees = 360;
        w = 25;
    }else if (xLevel >= 61 && xLevel <= 70) {
        totalBees = 550;
        w = 25;
    }else if (xLevel >= 71 && xLevel <= 80) {
        totalBees = 750;
        w = 25;
    }else if (xLevel >= 61 && xLevel <= 70) {
        totalBees = 550;
        w = 20;
    }
    createCanvas(w * xLevel + 1, w * xLevel + 1);
    cols = floor(width / w);
    rows = floor(height / w);

    grid = make2DArray(cols, rows);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, w)
        }
    }

    // pick total bees spots
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
        // deletes that spot so no longer an option 
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
        if (dug == xLevel * xLevel){
            win = true;
            // alert("Next LEVEL");
            xLevel += 5;
            dug = 0;
            setup();
            draw();
            win = false;
            textSize(30);
        }  
    } 
  }

function winFunction () {
    dug = 0;
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            if ( grid[i][j].flagged  || grid[i][j].revealed){ // && !(grid[i][j].bee.revealed)
                dug += 1;
                console.log(dug)
            }
            if (dug == xLevel * xLevel){
                win = true;
            }                          
        }
    }
}

function gameOver() {
    console.log("lose func reached")
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].revealed = true;
        }
    }
}

function mousePressed() {
    if (!keyIsDown(70)) {
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                if (grid[i][j].contains(mouseX, mouseY) && !grid[i][j].revealed && !grid[i][j].flagged) {
                    grid[i][j].reveal();
                    winFunction();
                    if (grid[i][j].bee) {
                        gameOver();
                    }
                }
            }
        }
    } else {
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                if (grid[i][j].contains(mouseX, mouseY) && !grid[i][j].revealed) {
                    grid[i][j].flagged = !grid[i][j].flagged;
                }
            }
        }
    }
}


function draw() {
    if (win == false){
        background(200);
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                grid[i][j].show();
            }
        }
    }else if(win == true){
        console.log("reached if win state")
        background(0,128,0);
        textSize(50);
        text("Congratulations Thot",(w * xLevel + 1)/2, (w * xLevel + 1)/2);
    }
}