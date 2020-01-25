class Wall{
	constructor(y,h,w){
		this.x = width;
		this.y = y;
		this.speed = 3;
		this.h = h;
		this.w = w;
	}

	isOutSide(){
		if (this.x <= -this.w/2){
			return true;
		}
		else {		
			return false;
		}
	}

	crash(x,y,r){
		if (x > this.x-this.w/2-r && x < this.x+this.w/2+r && y > (this.y - this.h/2-r) && y < (this.y + this.h/2+r)){
			return true;
		}
		return false;
	}

	update(){
		this.x -= this.speed;
	}

	show(){
		rectMode(CENTER);
		fill(0);
		rect(this.x,this.y,this.w,this.h)
	}
}