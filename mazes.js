var canvas = document.getElementById("maze");
var width = canvas.width = window.innerWidth*.4;
var height = canvas.height = window.innerWidth*.4;
var ctx = canvas.getContext('2d');

function paintSquare(x,y,color) {
    //Top is 0 y. Left is 0 x
    let between = width / 25;
    ctx.fillStyle = color;
    ctx.fillRect(x * between, y * between, between, between);
}

function point(x_coord, y_coord) {
    this.x = x_coord;
    this.y = y_coord;
}

grid = [];
size = 25; //Size is 25 with 1 padding on each side. 

for (var i=0; i<size; i++) {
    let test = [];
    test.length = size;
    test.fill(1);
    grid.push(test);
}
console.log(grid);

ctx.fillStyle = "#000000";
ctx.fillRect(0,0,width,height);

var midpt = Math.ceil(size/2) - 1;
function prims(x,y) {
    paintSquare(x,y,"#ffffff");
    var walls = [];
    walls.push(new point(x,y-1));

    while (walls.length != 0) {
        let index = Math.floor(Math.random()*walls.length);
        let pt = walls[index];
        let count = 0;
        if (grid[pt.x+1][pt.y] == 0){
            count++;
        }
        if (grid[pt.x-1][pt.y] == 0){
            count++;
        }
        if (grid[pt.x][pt.y+1] == 0){
            count++;
        }
        if (grid[pt.x][pt.y-1] == 0){
            count++;
        }

        if (count > 1 || pt.x == 24 || pt.x == 0 || pt.y == 0 || pt.y == 24);
        else {
            grid[pt.x][pt.y] = 0;
            paintSquare(pt.x,pt.y,"#ffffff");
            if (grid[pt.x-1][pt.y] == 1 && pt.x-1 != 0) {
                walls.push(new point(pt.x-1,pt.y));
            }
            if (grid[pt.x+1][pt.y] == 1 && pt.x+1 != 24) {
                walls.push(new point(pt.x+1,pt.y));
            }
            if (grid[pt.x][pt.y-1] == 1 && pt.y-1 != 0) {
                walls.push(new point(pt.x,pt.y-1));
            }
            if (grid[pt.x][pt.y+1] == 1 && pt.y+1 != 24) {
                walls.push(new point(pt.x,pt.y+1));
            }
        }
        walls.splice(index,1);
    }
    var top = [];
    for (let i = 0; i < size; i++) {
        if(grid[i][1] == 0) {
            top.push(i);
        }
    }
    grid[top[Math.floor(Math.random()*top.length)]][0] = 0;
    paintSquare(top[Math.floor(Math.random()*top.length)],0);
}

prims(midpt,size-1);