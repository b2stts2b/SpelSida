let bird;
let walls = [];
let gap = 200;
let alive = true;
let wallWidth = 20;

function setup(){
	createCanvas(600,400);
	bird = new Bird();
	setInterval(spawnWalls,1000);
}

function restartGame(){
	walls = [];
	gap = 200;
	alive = true;
}

function draw(){
	if (alive){
		background(40,20,200);

		//Move Walls
		for (let i = 0; i < walls.length; i++){
		walls[i].update();
		walls[i].show();
		}


		//Check if bird hit wall
		for (let i = 0; i < walls.length; i++){
			if (walls[i].crash(bird.x,bird.y,bird.r)){
				//We are dead
				alive = false;
			}
		}



		//Update Bird
		bird.update();
		bird.show();


		//Check if wall is outside
		for (let j = walls.length-1; j >= 0; j--){
		if (walls[j].isOutSide()){
			walls.splice(j,1);
		}
		}
	}

	textSize(50);
	text("Score: " + (200-gap), 10,50);

}

function keyPressed(){
	if (keyCode == 32){
		bird.jump();
	}
	else if (!alive){
		restartGame();
	}
}

function spawnWalls(){
	if (alive){
		let x = wallWidth;
		let y = random(20,height/2-20);
		walls.push(new Wall(y/2,y,x));
		
		y = (height-(gap+y)); 
		walls.push(new Wall(height-y/2,y,x));

		gap--;
	}
}