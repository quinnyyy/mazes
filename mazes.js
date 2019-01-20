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

function prims(x,y,grid) {
    grid[x][y] = 0;
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
            if (grid[pt.x][pt.y+1] == 1 && pt.y+1 != 24) {
                walls.push(new point(pt.x,pt.y+1));
            }
            if (grid[pt.x][pt.y-1] == 1 && pt.y-1 != 0) {
                walls.push(new point(pt.x,pt.y-1));
            }
            if (grid[pt.x+1][pt.y] == 1 && pt.x+1 != 24) {
                walls.push(new point(pt.x+1,pt.y));
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
    let topIndex = Math.floor(Math.random()*top.length);
    grid[top[topIndex]][0] = 0;
    paintSquare(top[topIndex],0,"#ffffff");
    return grid;
}

function DFS(s) {
    paintSquare(s.x,s.y,"#33cc33");
    var stack = [];
    var order = [];
    stack.push(s);
    while (stack.length != 0) {
        let u = stack.pop();
        order.push(u);
        if (DFSgrid[u.x][u.y] == 0) {
            DFSgrid[u.x][u.y] = 2;
            if (u.y-1 == 0 && DFSgrid[u.x][u.y-1] == 0) {
                order.push(new point(u.x,u.y-1));
                break;
            }

            if (DFSgrid[u.x][u.y+1] == 0 && u.y+1 != 0) {
                stack.push(new point(u.x,u.y+1));
            }
            
            if (DFSgrid[u.x+1][u.y] == 0 && u.x+1 != 0) {
                stack.push(new point(u.x+1,u.y));
            }
            
            if (DFSgrid[u.x-1][u.y] == 0 && u.x-1 != 0) {
                stack.push(new point(u.x-1,u.y));
            }

            if (DFSgrid[u.x][u.y-1] == 0 && u.y-1 != 0) {
                //up
                stack.push(new point(u.x,u.y-1));
            }
            
            
        }
    }
    return order;
}

function makeGrid(size) {
    grid = [];
    for (var i=0; i<size;i++) {
        let test=[];
        test.length = size;
        test.fill(1);
        grid.push(test);
    }
    return grid;
}

function paintOrder(order,index) {
    if(index != order.length) {
        paintSquare(order[index].x,order[index].y,"#33cc33");
        setTimeout(paintOrder,100,order,index+1);
    }
}

var size = 25;
var DFSgrid = makeGrid(size);
ctx.fillStyle = "#000000";
ctx.fillRect(0,0,width,height);
var midpt = Math.ceil(size/2) - 1;
var start = new point(midpt,size - 1);

DFSgrid = prims(midpt,size-1,DFSgrid);

var DFSorder = DFS(start);
paintOrder(DFSorder,0);