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
var KEY_RIGHT ="ArrowRight";
var KEY_UP ="ArrowUp";
var KEY_DOWN ="ArrowDown";
var UP = 0,RIGHT=1,DOWN=2,LEFT=3;
var food = [];
var snakeLengthInc=0;

/**
 * Выводит спрайт в позиции x,y
 * 
 * @param  {number} x  Растояние от левого края экрана до левой границы спрайта    
 * @param  {number} y  Растояние от верхнего края экрана до верхней границы спрайта    
 * @param  {Sprite} sprite Объект Sprite    
 */
function drawSprite(x,y,sprite){
    ctx.drawImage(image,sprite.h*SPRITE_SIZE,sprite.v*SPRITE_SIZE,
        sprite.width*SPRITE_SIZE,sprite.height*SPRITE_SIZE,
        offsetX+x*SPRITE_SIZE,offsetY+y*SPRITE_SIZE,
        sprite.width*SPRITE_SIZE,sprite.height*SPRITE_SIZE);
}
var snake;

/**
 * Определяет абсолютное направление из точки formX, fromY в точку toX, toY
 * 
 * @param  {number} fromX Абсциса начальной точки 
 * @param  {nubmer} fromY Ордината начальной точки
 * @param  {number} toX   Абсциса конечной точки
 * @param  {number} toY   Ордината конечной точки
 * @return {number}       Направление заданное константами UP, DOWN, LEFT, RIGHT
 */
function getDirection(fromX, fromY, toX, toY){
    if(fromX == toX){
        return fromY > toY /**/?UP/**/:DOWN;
    }else{
        return fromX > toX /*left*/?LEFT /*right*/:RIGHT;
    }
}

/**
 * Визуализирует игровой мир
 */
function draw(){
    if (loaded){    
        ctx.fillStyle = "#333";
        ctx.fillRect(0,0,canvas.width,canvas.height)
        
        for(var x=0;x<GRID_WIDTH;x++){
            for (var y=0;y<GRID_HEIGHT;y++){
                drawSprite(x,y,sprites.floor);
            }
            drawSprite(x,-1,sprites.wallLeftRight);
            drawSprite(x,GRID_HEIGHT,sprites.wallLeftRight);
        }
        for(var y=0;y<GRID_HEIGHT;y++){
            drawSprite(-1,y,sprites.wallUpDownLeft);
            drawSprite(GRID_WIDTH,y,sprites.wallUpDownRight);
        }   
        drawSprite(-1,-1,sprites.wallRightDown);
        drawSprite(GRID_WIDTH,-1,sprites.wallDownLeft);
        drawSprite(-1,GRID_HEIGHT,sprites.wallUpRight);
        drawSprite(GRID_WIDTH,GRID_HEIGHT,sprites.wallLeftUp);

        var  segment = snake.tail;
        var direction =0;
        /**
        * 0-up 1- right 2 -down 3- left
        */
        var previousDirection;
        while(segment!= null){
            if (segment.next != null){
                var direction = getDirection(segment.x,segment.y,
                    segment.next.x,segment.next.y);
            }   
            if(segment == snake.tail){
                
                drawSprite(segment.x,segment.y,TAIL_DIRECTIONS[direction]);
                
            }
                else if(segment ==snake.head){
                    drawSprite(segment.x,segment.y,HEAD_DIRECTIONS[previousDirection]);
                }
            else
            {
                drawSprite(segment.x,segment.y,BODY_DIRECTIONS[previousDirection][direction]);
                
            
                
            }
            previousDirection = direction;
            segment = segment.next

        }
    }
    drawFood();
}

/**
 * Событие именения размера окна баузера, происходит изменение размера холста
 */
function onResize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    offsetX = (canvas.width - GRID_WIDTH*SPRITE_SIZE)/2|0 
    offsetY = (canvas.height - GRID_HEIGHT*SPRITE_SIZE)/2|0

    draw();
}

/**
 *  Определяет индекс еды по ее координатам
 * 
 * @param  {number} x абсциса клетки с едой
 * @param  {number} y ордината клетки с едой
 * @return {number}   Индекс еды в массиве food или -1 если келетка не содержит еды
 */
function  foodAt(x,y){
    for(var i=0;i<food.length;i++){
        if(food[i].x==x && food[i].y==y){
            return i;
        }
    }
    return -1;
}

/**
 * Выводит сообщение о завершении игры
 */
function gameOver(){
    alert("GameOver");
    clearInterval(timer);

}

/**
 * Увеличение длинны змеи при съедании 1 еденици пищи
 */
function onGrow(){
    snake.grow();
    var foodIndex = foodAt(snake.head.x,snake.head.y);
    if(foodIndex >=0){
        food.splice(foodIndex,1);
        snakeLengthInc++;
        generateFood();
    }
    if (snake.head.x<0||snake.head.x>=GRID_WIDTH ||
        snake.head.y<0 || snake.head.y>=GRID_HEIGHT){
        gameOver();
    }
    if(snake.contains(snake.head.x,snake.head.y,true)){
        draw();
        gameOver();
        return;
    }
    if(snakeLengthInc ==0){
        snake.shrink();
    }else{
        snakeLengthInc--;
    }
    draw();
}

/**
 * Событие нажатия кнопки клавиатуры
 * 
 * @param  {Event} e Параметры системного события
 */
function onKeyPressed(e){
    switch(e.key){
        case KEY_LEFT:
            snake.setDirection(LEFT);
            break;
        case KEY_RIGHT:
            snake.setDirection(RIGHT);
            break;
        case KEY_UP:
            snake.setDirection(UP);
            break;
        case KEY_DOWN:
            snake.setDirection(DOWN);
            break;
    }
}

/**
 * Перебор всех едениц пищи и визуализация их н игровом поле
 */
function drawFood(){
    for(var i=0;i<food.length;i++){
        drawSprite(food[i].x,food[i].y,sprites.food);
    }
}
var timer;

/**
 * Определяет позицию еденици пищи и помещяет ее на игровом поле
 */
function generateFood(){
    var x,y;

    do{
        x=Math.random()*GRID_WIDTH|0;
        y=Math.random()*GRID_HEIGHT|0;
        console.log(x,y);
    }while(snake.contains(x,y)||foodAt(x,y)>=0);
    food.push({x:x,y:y});
}

/**
 * Выполняется при загрузке DOM дерева, инициализирует контекст рисования
 * и выполняет загрузку внешних ресурсов
 */
document.addEventListener("DOMContentLoaded",function(){
    canvas = document.getElementById("snake");
    ctx = canvas.getContext("2d");
    snake = new Snake(GRID_WIDTH/2|0,GRID_HEIGHT/2|0);
    image = new Image();
    image.src = "assets/sprites.png";
    image.addEventListener ("load",function(){
        loaded = true;
        draw();
    });
    for(var i =0;i<1;i++){
        generateFood();
    }
    document.addEventListener("keydown",onKeyPressed);
    timer = setInterval(onGrow,200);
    onResize();
    window.addEventListener("resize",onResize);
    
});