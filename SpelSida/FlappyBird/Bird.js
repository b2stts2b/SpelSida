class Bird{

	constructor(img){
		this.x = 100;
		this.y = height/2;
		this.vel = 0;
		this.acc = 0.4;
		this.r = 25;
		this.img = img;
		this.v = 0;
	}

	update(){
		this.vel += this.acc;
		this.y += this.vel;
		if (this.y > height-this.r){
			this.y = height-this.r;
			this.vel = 0;
		}
		if (this.y < this.r){
			this.y = this.r;
			this.vel = 0;
		}
		this.v = map(this.vel,-8,16,-22.5,45);
	}

	jump(){
		this.vel -= this.vel += 9;
	}

	show(){
		push();
		angleMode(DEGREES);
		translate(this.x,this.y);
		rotate(this.v);
		imageMode(CENTER);
		image(img,0,0,this.r*2,this.r*2);
		pop();
	}
}z