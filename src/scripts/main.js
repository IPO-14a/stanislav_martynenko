"use strict";
var SPRITE_SIZE = 24;
var GRID_WIDTH = 30;
var GRID_HEIGHT = 20;
var TAIL_DIRECTIONS = [sprites.tailDown,sprites.tailLeft,
                    sprites.tailUp,sprites.tailRight];
var HEAD_DIRECTIONS =[sprites.headUp,sprites.headRight,
                    sprites.headDown,sprites.headLeft]; 
var BODY_DIRECTIONS = [
            [sprites.bodyUpDown,sprites.bodyRightDown,undefined,sprites.bodyDownLeft],
            [sprites.bodyLeftUp,sprites.bodyLeftRight,sprites.bodyDownLeft,undefined],
            [undefined,sprites.bodyUpRight,sprites.bodyUpDown,sprites.bodyLeftUp],
            [sprites.bodyUpRight,undefined,sprites.bodyRightDown,sprites.bodyLeftRight]
            ];
var canvas, ctx, image;
var loaded = false;
var offsetX = 0;
var offsetY =0;
var KEY_LEFT ="ArrowLeft";
var KEY_RIGHT ="ArrowDown";
var KEY_UP ="ArrowRight";
var KEY_DOWN ="ArrowUp";
var UP = 0,RIGHT=1,DOWN=2,LEFT=3;
var food = [];
var snakeLengthInc=0;
function drawSprite(x,y,sprite){
    // debugger;
    ctx.drawImage(image,sprite.h*SPRITE_SIZE,sprite.v*SPRITE_SIZE,
        sprite.width*SPRITE_SIZE,sprite.height*SPRITE_SIZE,
        offsetX+x*SPRITE_SIZE,offsetY+y*SPRITE_SIZE,
        sprite.width*SPRITE_SIZE,sprite.height*SPRITE_SIZE);
}
var snake;
function getDirection(fromX,fromY,toX,toY){
    if(fromX==toX){
        return fromY>toY /**/?UP/**/:DOWN;
}else{
        return fromX>toX /*left*/?LEFT /*right*/:RIGHT;
    }
}