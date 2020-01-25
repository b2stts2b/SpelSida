let currentPlayer = 0;

let board = [];
let winBoards = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[3,5,8],[0,4,8],[2,4,6]];
let hasWon = false;
let isEven = false;

let boardSize = 600;
let squareSize = boardSize/3;

function setup(){
	createCanvas(boardSize,boardSize);
	rectMode(CENTER);
	textAlign(CENTER);
	textSize(40);


	fill(255);
	strokeWeight(3);
	stroke(0);
	RestartGame();
}

function RestartGame(){
	currentPlayer = 0;
	board = [];
	hasWon = false;

	background(255);
	drawBoard();
	setupSquares();
}

function drawBoard(){	
	line(width/3,0,width/3,height);
	line(width*2/3,0,width*2/3,height);
	line(0,height/3,width,height/3);
	line(0,height*2/3,width,height*2/3);

	line(0,0,width,0);
	line(0,0,0,height);
	line(0,height,width,height);
	line(width,0,width,height);
}

function setupSquares(){
	for (let i = 0; i < 9; i++){
		let x = squareSize*(i%3) + squareSize/2;
		let y = floor(i/3)*squareSize + squareSize/2;
		board.push(new Square(x,y,i));
	}
}

function mousePressed(){
	if (!isEven && !hasWon && mouseX < width && mouseX > 0 && mouseY > 0 && mouseY < height){
		let x = mouseX;
		let y = mouseY;
		createSign(x,y);
	}
}

function keyTyped(){
	if((hasWon || isEven) && (key == "r" || key == "R")){
		RestartGame();
	} 
}

function createSign(x,y){
	let xVal = floor(x/squareSize);
	let yVal = floor(y/squareSize);
	let squareNum = yVal*3 + xVal;

	if (board[squareNum].isMarked == false){
		board[squareNum].value = currentPlayer;
		board[squareNum].isMarked = true;
		board[squareNum].show();
		checkWinningCondition();
		changePlayer();
	}
}

function changePlayer(){
	if(!hasWon){
		if (currentPlayer == 1){
			currentPlayer = 0;
		} else {
			currentPlayer = 1;
		}
	}
}

function checkWinningCondition(){
	for (let i = 0; i < winBoards.length; i++){
		let trio = winBoards[i];
		let s1 = board[trio[0]];
		let s2 = board[trio[1]];
		let s3 = board[trio[2]];
		
		if (s1.isMarked && s2.isMarked && s3.isMarked){
			if (s1.value == s2.value && s1.value == s3.value){
				hasWon = true;
				showWhoWon();
			}
		}

	}
	if (!hasWon){
		let temp = 0;
		for (let i = 0; i < board.length; i++){
			if (board[i].isMarked){
				temp += 1;
			}
		}	
		if (temp == board.length){
			isEven = true;
			showWhoWon();
		}

	}
}	

function showWhoWon(){
	fill(100,0,200);
	if(hasWon){
		text("Spelare " + (currentPlayer + 1) + " Vann!",boardSize/2,boardSize/2);
	} else if (isEven){
		text("Det blev lika!",boardSize/2,boardSize/2);
	}
	text("R=Start Om", boardSize/2,boardSize/2+100);
	fill(255);
}

class Square{
	constructor(x,y,i){
		this.num = i;
		this.x = x;
		this.y = y;
		this.isMarked = false;
		this.value = -1;
	}

	show(){
		if (this.value == 0) {
			ellipse(this.x,this.y,boardSize/7.5);
		} else {
			rect(this.x,this.y,boardSize/8.5,boardSize/8,5);
		}
	}
}