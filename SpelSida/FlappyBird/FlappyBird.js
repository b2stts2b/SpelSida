let bird;
let walls = [];
let gap = 200;
let alive = true;
let wallWidth = 20;
let img;
let hs;
let newHs;
let hSText;

function preload(){
	img = loadImage("Images/Bird.png");
}

function setup(){
	createCanvas(600,400);
	bird = new Bird(img);
	setInterval(spawnWalls,1000);
	hSText = createP("HighScore: 0");
	hs = 0;
	newHs = 0;
}

function restartGame(){
	walls = [];
	gap = 200;
	alive = true;
	newHs = 0;
}

function draw(){
	if (alive){
		background(0,255,255);

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
				if (newHs > hs){
					hs = newHs;
				}
				hSText.html("HighScore: " + hs);
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

function mousePressed(){
	bird.jump();
	if (!alive){
		restartGame();
	}
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
		newHs++;
	}
}