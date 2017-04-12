Mans.prototype.setDirection=function(direction){
    var newX,newY;
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
    if (newX +this.directionX ==0 && newY+ this.directionY ==0){
        return;
    }
    this.newDirectionX = newX;
    this.newDirectionY = newY;

}