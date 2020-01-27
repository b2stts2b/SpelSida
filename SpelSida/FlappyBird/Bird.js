class Bird{

	constructor(img){
		this.x = 100;
		this.y = height/2;
		this.vel = 0;
		this.acc = 0.4;
		this.r = 25;
		this.img = img;
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
		
	}

	jump(){
		this.vel -= this.vel += 9;
	}

	show(){
		imageMode(CENTER);
		image(img,this.x,this.y,this.r*2,this.r*2);
	}
}