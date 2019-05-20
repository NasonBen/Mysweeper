class Cell {
    constructor(i, j, w) {
        this.i = i;
        this.j = j;

        this.w = w;
        this.x = i * w;
        this.y = j * w;

        this.neighborCount = 0;
        
        this.flagged = false;
        this.bee = false;
        this.revealed = false;
    }
    if (this.revealed){
        if (this.bee && this.flagged == false){
            fill(127);
            ellipse(this.x + this.w*0.5, this.y + this.w*0.5, this.w *0.5);
        } else{
            noFill();
            fill(0);
            rect(this.x,this.y,this.w,this.w);
            if (this.neighborCount > 0){
                textAlign(CENTER);
                fill(150);
                text(this.neighborCount, this.x + this.w*0.5, this.y + this.w*0.5);
            }
        }  
    }
}

        if (this.flagged) {
            fill(255, 0, 0);
            ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
            return;
        }
        if (this.revealed) {
            if (this.bee) {
                fill(127);
                ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
            }
            else {
                fill(0);
                rect(this.x, this.y, this.w, this.w);
                if (this.neighborCount > 0) {
                    textAlign(CENTER);
                    fill(150);
                    text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
                }
            }
        }
    }

    countBees() {
        if (this.bee) return;
        this.neighborCount = 0;
        for (let i = this.i - 1; i <= this.i + 1; i++) {
            for (let j = this.j - 1; j <= this.j + 1; j++) {
                if ((i > -1 && i < cols && j > -1 && j < rows) && grid[i][j].bee) this.neighborCount++;
            }
        }
    }

    contains(x, y) {
        return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
    }

    reveal() {
        this.revealed = true;
        if (this.neighborCount == 0) this.floodFill();
    }

    floodFill() {
        for (let i = this.i - 1; i <= this.i + 1; i++) {
            for (let j = this.j - 1; j <= this.j + 1; j++) {
                if (i > -1 && i < cols && j > -1 && j < rows) {
                    if (!grid[i][j].revealed) grid[i][j].reveal();
                }
            }
        }
    }
}
