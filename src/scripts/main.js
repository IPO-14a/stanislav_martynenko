var loaded = false;
var KEY_LEFT ="ArrowLeft";
var KEY_RIGHT ="ArrowRight";
var KEY_UP ="ArrowUp";
var KEY_DOWN ="ArrowDown";
var UP = 0,RIGHT=1,DOWN=2,LEFT=3;
var canvas, image;
var GRID_WIDTH = 30;
var GRID_HEIGHT = 20;
var man;
function image(){
    man = new Man(GRID_WIDTH/2|0,GRID_HEIGHT/2|0);
    image = new Image();
    image.src = "assets/sprites.png";
    image.addEventListener ("load",function(){
        loaded = true;
        draw();
    });
}

function drow(){
    if (loaded){			
        for(var x=0;x<GRID_WIDTH;x++){
            for (var y=0;y<GRID_HEIGHT;y++){
                drawSprite(x,y,man.floor);
            }
            drawSprite(x,-1,man.wallLeftRight);
            drawSprite(x,GRID_HEIGHT,man.wallLeftRight);
        }
        for(var y=0;y<GRID_HEIGHT;y++){
            drawSprite(-1,y,man.wallUpDownLeft);
            drawSprite(GRID_WIDTH,y,man.wallUpDownRight);
        }	
        drawSprite(-1,-1,man.wallRightDown);
        drawSprite(GRID_WIDTH,-1,man.wallDownLeft);
        drawSprite(-1,GRID_HEIGHT,man.wallUpRight);
        drawSprite(GRID_WIDTH,GRID_HEIGHT,man.wallLeftUp);
    }	
};
function onKeyPressed(e){
    switch(e.key){
        case KEY_LEFT:
            man.setDirection(LEFT);
            break;
        case KEY_RIGHT:
            man.setDirection(RIGHT);
            break;
        case KEY_UP:
            man.setDirection(UP);
            break;
        case KEY_DOWN:
            man.setDirection(DOWN);
            break;
    }
};
