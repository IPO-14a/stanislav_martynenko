(function (){
	function Man(h,v,width,height){
	this.h=h;
	this.v=v;
	this.width=typeof width =="undefined"?1:width;
	this.height=typeof height =="undefined"?1:height;
}

var man = {
	wallRightDown : new Man(0,3),
	wallUpDownLeft : new Man(0,4),
	wallUpDownRight : new Man(2,4), 
	wallUpRight : new Man(0,5),
	wallLeftRight : new Man(1,3),
	wallDownLeft : new Man(2,3),
	wallLeftUp :new Man(2,5),
	floor : new Man(3,4)
}
})()