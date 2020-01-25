var screenSize = 500;
var isLost = false;

var player = {
	xPos: screenSize-50,
	yPos: 250,
	ySpeed: 4,
	width: 20,
	height: 100
}
var enemy = {
	xPos: 50,
	yPos: 250,
	width: 20,
	height: 100
}
var ball = {
	xPos: 250,
	yPos: 250,
	radius: 10,
	xSpeed: 0,
	ySpeed: 0,
}
function setup(){
	createCanvas(screenSize,screenSize);
	rectMode(CENTER);
	stroke(0);
	fill(255);
	ball.xSpeed = random(1.5,3);
	ball.ySpeed = random(1.5,3);
}

function draw(){
	background(0);

	if (ball.xPos >= player.xPos - player.width/2) {
		isLost = true;
	}

	if (ball.yPos<=25+ball.radius/2 || ball.yPos>=475-ball.radius/2) {
		ball.ySpeed*=-1;
	}
	if (!isLost && ball.xPos > player.xPos-player.width/2-ball.radius/2 && ball.yPos < player.yPos+player.height/2 && ball.yPos>player.yPos-player.height/2 || !isLost && ball.xPos < enemy.xPos+enemy.width/2+ball.radius/2 && ball.yPos < enemy.yPos+enemy.height/2 && ball.yPos>enemy.yPos-enemy.height/2) {
		ball.xSpeed*=-1.01;
	}

	
	if (keyIsDown(UP_ARROW)) {
		player.yPos -= player.ySpeed;
	} else if (keyIsDown(DOWN_ARROW)) {
		player.yPos += player.ySpeed;
	}

	ball.xPos += ball.xSpeed;
	ball.yPos += ball.ySpeed;
	
	enemy.yPos = constrain(ball.yPos,50,450);
	player.yPos = constrain(player.yPos,50,450);

	rect(player.xPos,player.yPos,player.width,player.height);
	rect(enemy.xPos,enemy.yPos,enemy.width,enemy.height);
	rect(250,25,450,10);
	rect(250,475,450,10);
	ellipse(ball.xPos,ball.yPos,ball.radius,ball.radius);

	if (isLost){
		startaOm();
	}
}

function startaOm(){
	ball.xPos = 250;
	ball.yPos = 250;
	isLost = false;
}