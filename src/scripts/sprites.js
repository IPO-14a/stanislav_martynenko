(function (){
    /**
     * Определяет спрайт как фрагмент изображения
     * 
     * @property {number} h      Индекс спрайта в изображении по оси x
     * @property {number} v      Индекс спрайта в изображении по оси y
     * @property {number} width  Ширина спрайта
     * @property {number} height Высота спрайта
     */
    function Sprite(h,v,width,height){
        this.h=h;
        this.v=v;
        this.width=typeof width =="undefined"?1:width;
        this.height=typeof height =="undefined"?1:height;
    }

    var sprites = {
        bodyRightDown : new Sprite(0,0),
        bodyLeftRight : new Sprite(1,0),
        bodyDownLeft : new Sprite(2,0),
        bodyUpDown : new Sprite(0,1),
        bodyUpRight : new Sprite(0,2),
        bodyLeftUp : new Sprite(2,2),
        tailUp :new Sprite(3,0),
        tailDown :new Sprite(3,1),
        tailLeft :new Sprite(3,2),
        tailRight :new Sprite(4,2),
        headUp :new Sprite(5,1),
        headDown :new Sprite(5,2),  
        headLeft :new Sprite(4,0),
        headRight :new Sprite(5,0),
        food : new Sprite(4,1), 
        wallRightDown : new Sprite(0,3),
        wallUpDownLeft : new Sprite(0,4),
        wallUpDownRight : new Sprite(2,4), 
        wallUpRight : new Sprite(0,5),
        wallLeftRight : new Sprite(1,3),
        wallDownLeft : new Sprite(2,3),
        wallLeftUp :new Sprite(2,5),
        floor : new Sprite(3,4)
    }
    window.sprites = sprites;
})()