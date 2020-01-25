class Bird{

	constructor(){
		this.x = 100;
		this.y = height/2;
		this.vel = 0;
		this.acc = 0.4;
		this.r = 10;
	}

	update(){
		this.vel += this.acc;
		this.y += this.vel;
		if (this.y > height-this.r){
			this.y = height-this.r;
		}
		if (this.y < this.r){
			this.y = this.r;
			this.vel = 0;
		}
	}

	jump(){
		this.vel -= this.vel += 9;
	}

	show(){
		fill(255,255,0);
		ellipse(this.x,this.y,this.r*2);
	}
}