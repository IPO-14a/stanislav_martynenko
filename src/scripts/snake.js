(function(){
    /**
     * Класс описывающий сегмент змеи.
     *
     * Сегменты змеи огранизованны в виде однонаправленного линейного списка 
     * 
     * @property {number} x Абциса координаты сегмента        
     * @property {number} y Ордината координаты сегмента
     * @property {SnakeSegment} next Сегмент, следующий за данным
     */
    function SnakeSegment(x, y){
        this.x = x;
        this.y = y;
        this.next = null;
    }    

    /**
     * Класс описывающий змею
     *
     * @property {number} directionX Абсциса следующей клетки
     * @property {number} directionY Ордината следующей клетки
     * @property {number} newDirectionX Модифицированная абсциса следующей клетки
     * @property {number} newDirectionY Модифицированная ордината следующей клетки
     * @property {SnakeSegment} head Сегмент головы змеи
     * @property {SnakeSegment} tail Сегмент хвоста змеи
     */
    function Snake(x, y) {
        this.directionX = 0;
        this.directionY = -1;
        this.newDirectionX = this.directionX;
        this.newDirectionY = this.directionY;
        this.head = new SnakeSegment(x, y);
        this.tail = new SnakeSegment(x + this.directionX, y - this.directionY);
        this.tail.next = this.head;
    }

    /**
     * Увеличивает длинну змеи на один сегмент
     */
    Snake.prototype.grow = function(){
        this.directionX = this.newDirectionX;
        this.directionY = this.newDirectionY;
        var segment = new SnakeSegment(this.head.x + this.directionX, this.head.y + this.directionY)
        this.head.next = segment;
        this.head = segment;
    }

    /**
     * Уменьшает длинну змеи на один сегмент
     */
    Snake.prototype.shrink = function(){
        this.tail = this.tail.next;
    }

    /**
     * Устанавливает новое направление движения змеи
     * 
     * @param {[type]} direction Новое направление заданное константами UP, DOWN, RIGHT, LEFT
     */
    Snake.prototype.setDirection = function(direction){
        var newX, newY;
        switch(direction){
            case LEFT:
                newX = -1;
                newY = 0;
                break;
            case RIGHT:
                newX = 1;
                newY = 0;
                break;
            case UP:
                newX = 0;
                newY = -1;
                break;
            case DOWN:
                newX = 0;
                newY = 1;
                break;
            default:
                console.error("Unknow direction" + direction);
                return;
        }
        if (newX + this.directionX == 0 && newY + this.directionY == 0){
            return;
        }
        this.newDirectionX = newX;
        this.newDirectionY = newY;
    }
    window.Snake = Snake;
})()