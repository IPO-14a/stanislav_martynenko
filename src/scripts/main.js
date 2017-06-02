"use strict";
/**
 * МИнимальный размер спрайта
 *
 * Спайт является квадратной областью изображения со SPRITE_SIZE
 * 
 * @type {number}
 */
var SPRITE_SIZE = 24;

/**
 * Ширина поля измеряемая в спрайтах
 * 
 * @type {number}
 */
var GRID_WIDTH = 30;

/**
 * Высота поля измеряемая в спрайтах
 * 
 * @type {Number}
 */
var GRID_HEIGHT = 20;

/**
 * Спрайты, соответствующие каждому направлению хвоста
 * 
 * @type {Array}
 */
var TAIL_DIRECTIONS = [sprites.tailDown,sprites.tailLeft, 
                       sprites.tailUp,sprites.tailRight];
/**
 * Спрайты, соответствующие каждому направлению головы
 * 
 * @type {Array}
 */
var HEAD_DIRECTIONS =[sprites.headUp,sprites.headRight,
                      sprites.headDown,sprites.headLeft]; 
/**
 * Матрица спрайтов, соотвествующия каждой возможной конфигурации сегмента
 * 
 * @type {Array}
 */
var BODY_DIRECTIONS = [
    [sprites.bodyUpDown, sprites.bodyRightDown, undefined, sprites.bodyDownLeft],
    [sprites.bodyLeftUp, sprites.bodyLeftRight, sprites.bodyDownLeft, undefined],
    [undefined, sprites.bodyUpRight, sprites.bodyUpDown, sprites.bodyLeftUp],
    [sprites.bodyUpRight, undefined, sprites.bodyRightDown, sprites.bodyLeftRight]
];
/**
 * Графический контекст
 */
var ctx;

/**
 * Изображение, содержащее используемые спрайты
 */
var image;

/**
 * Элемента canvas
 */
var canvas;

/**
 * Флаг, показывающий, загружены ли все внешние ресурсы
 *
 * @type {Boolean}
 */
var loaded = false;

/**
 * Смещение игрового поля относительно левого края экрана
 *
 * @type {Number}
 */
var offsetX = 0;

/**
 * Смещение игрового поля относительно верхнего края экрана
 *
 * @type {Number}
 */
var offsetY = 0;

/**
 * Идентификатор клавиши "Влево"
 *
 * @type {String}
 */
var KEY_LEFT = "ArrowLeft";

/**
 * Идентификатор клавиши "Вправо"
 *
 * @type {String}
 */
var KEY_RIGHT = "ArrowRight";

/**
 * Идентификатор клавиши "Вверх"
 *
 * @type {String}
 */
var KEY_UP = "ArrowUp";

/**
 * Идентификатор клавиши "Вниз"
 *
 * @type {String}
 */
var KEY_DOWN = "ArrowDown";

/**
 * Константа, соответствующая направлению "Вверх"
 *
 * @type {Number}
 */
var UP = 0;

/**
 * Константа, соответствующая направлению "Вправо"
 *
 * @type {Number}
 */
var RIGHT = 1;

/**
 * Константа, соответствующая направлению "Вниз"
 *
 * @type {Number}
 */
var DOWN = 2;

/**
 * Константа, соответствующая направлению "Влево"
 *
 * @type {Number}
 */
var LEFT = 3;

/**
 * Массив еды
 * @type {Array}
 */
var food = [];

/**
 * Размер, на который должна быть увеличенна змея змеи
 * @type {Number}
 */
var snakeLengthInc = 0;

/**
 * Выводит спрайт в позиции x,y
 * 
 * @param  {number} x  Растояние от левого края экрана до левой границы спрайта    
 * @param  {number} y  Растояние от верхнего края экрана до верхней границы спрайта    
 * @param  {Sprite} sprite Объект Sprite    
 */
function drawSprite(x, y, sprite){
    ctx.drawImage(image, sprite.h * SPRITE_SIZE, sprite.v * SPRITE_SIZE,
        sprite.width * SPRITE_SIZE, sprite.height * SPRITE_SIZE,
        offsetX + x * SPRITE_SIZE, offsetY + y * SPRITE_SIZE,
        sprite.width * SPRITE_SIZE, sprite.height * SPRITE_SIZE);
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
        return fromY > toY ? UP : DOWN;
    }else{
        return fromX > toX ? LEFT : RIGHT;
    }
}

/**
 * Визуализирует игровой мир
 */
function draw(){
    if (loaded){    
        ctx.fillStyle = "#333";
        ctx.fillRect(0,0,canvas.width,canvas.height)
        
        for(var x = 0; x < GRID_WIDTH; x++){
            for (var y = 0; y < GRID_HEIGHT; y++){
                drawSprite(x, y, sprites.floor);
            }
            drawSprite(x, -1, sprites.wallLeftRight);
            drawSprite(x, GRID_HEIGHT, sprites.wallLeftRight);
        }
        for(var y=0 ; y < GRID_HEIGHT; y++){
            drawSprite(-1, y, sprites.wallUpDownLeft);
            drawSprite(GRID_WIDTH, y, sprites.wallUpDownRight);
        }   
        drawSprite(-1, -1, sprites.wallRightDown);
        drawSprite(GRID_WIDTH, -1, sprites.wallDownLeft);
        drawSprite(-1, GRID_HEIGHT, sprites.wallUpRight);
        drawSprite(GRID_WIDTH, GRID_HEIGHT, sprites.wallLeftUp);

        var segment = snake.tail;
        var direction = 0;
        /**
        * 0-up 1- right 2 -down 3- left
        */
        var previousDirection;
        while (segment != null){
            if (segment.next != null){
                var direction = getDirection(segment.x, segment.y,
                    segment.next.x, segment.next.y);
            }   
            if (segment == snake.tail){
                drawSprite(segment.x, segment.y, TAIL_DIRECTIONS[direction]);
            } else if(segment ==snake.head){
                drawSprite(segment.x, segment.y, HEAD_DIRECTIONS[previousDirection]);
            } else {
                drawSprite(segment.x, segment.y, BODY_DIRECTIONS[previousDirection][direction]);
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

    offsetX = (canvas.width - GRID_WIDTH * SPRITE_SIZE) / 2 | 0 
    offsetY = (canvas.height - GRID_HEIGHT * SPRITE_SIZE) / 2 | 0

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
    for(var i = 0; i < food.length; i++){
        if(food[i].x == x && food[i].y == y){
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
    if(foodIndex >= 0){
        food.splice(foodIndex, 1);
        snakeLengthInc++;
        generateFood();
    }
    if (snake.head.x < 0 || snake.head.x >= GRID_WIDTH ||
        snake.head.y < 0 || snake.head.y >= GRID_HEIGHT){
        gameOver();
    }
    if(snake.contains(snake.head.x, snake.head.y, true)){
        draw();
        gameOver();
        return;
    }
    if(snakeLengthInc == 0){
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
 * Перебор всех едениц пищи и визуализация их на игровом поле
 */
function drawFood(){
    for(var i = 0; i < food.length; i++){
        drawSprite(food[i].x, food[i].y, sprites.food);
    }
}
var timer;

/**
 * Определяет позицию еденици пищи и помещяет ее на игровом поле
 */
function generateFood(){
    var x, y;

    do{
        x = Math.random() * GRID_WIDTH | 0;
        y = Math.random() * GRID_HEIGHT | 0;
        console.log(x, y);
    }while(snake.contains(x, y) || foodAt(x, y) >= 0);
    food.push({x: x, y: y});
}

/**
 * Выполняется при загрузке DOM дерева, инициализирует контекст рисования
 * и выполняет загрузку внешних ресурсов
 */
document.addEventListener("DOMContentLoaded", function(){
    canvas = document.getElementById("snake");
    ctx = canvas.getContext("2d");
    snake = new Snake(GRID_WIDTH / 2 | 0, GRID_HEIGHT / 2 | 0);
    image = new Image();
    image.src = "css/sprites.png";
    image.addEventListener ("load", function(){
        loaded = true;
        draw();
    });
    for(var i = 0; i < 1; i++){
        generateFood();
    }
    document.addEventListener("keydown", onKeyPressed);
    timer = setInterval(onGrow, 200);
    onResize();
    window.addEventListener("resize", onResize);
});