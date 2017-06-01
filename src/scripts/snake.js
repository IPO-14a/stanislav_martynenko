(function(){
    function SnakeSegment(x,y){
        this.x = x;
        this.y = y;
        this.next = null;
    }    
    function Snake(x,y) {
        this.directionX = 0;
        this.directionY = -1;
        this.newDirectionX = this.directionX;
        this.newDirectionY = this.directionY;
        this.head = new SnakeSegment(x,y);
        this.tail = new SnakeSegment(x+this.directionX,y-this.directionY);
        this.tail.next = this.head;
    }
    Snake.prototype.grow = function(){
        this.directionX =this.newDirectionX ;
        this.directionY = this.newDirectionY ;
        var segment = new SnakeSegment(this.head.x + this.directionX,this.head.y + this.directionY)
        this.head.next = segment;
        this.head = segment;
    }
    Snake.prototype.shrink = function(){
        this.tail=this.tail.next;
    }
    
    window.Snake = Snake;
})()