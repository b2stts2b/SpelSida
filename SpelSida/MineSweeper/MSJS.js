let rez = 40;
let bombsPercentage = 15;

let col;
let row;

let squares = [];
let squaresIndex = [];
let indexesFound = [];

let hasLost = false;
let hasWon = false;

let bombs;

let squaresPressed = 0;

let totalPlays;
let totalPlaysNum = 0;

let totalWins;
let totalWinsNum = 0;

let statusText;
let rectLeftText;
let totalSquares; 

let bombInputSlider;
let bombInputP;

function setup(){
	createCanvas(800,400);
	background(100);

	statusText = createP("Status: ");
	totalPlays = createP("Plays: 0");
	totalWins = createP("Wins: 0");
	rectLeftText = createP("Sqaures left: ");
	totalSquares = createP("Total Squares: ");

	bombInputSlider = createSlider(0,100,15,1);
	bombInputP = createP("Bombs: " + bombsPercentage + "%");

	reset();
}

function keyPressed(){
	if (hasLost || hasWon) {
		totalWins.html("Wins: " + totalWinsNum);
		totalPlays.html("Plays: " + totalPlaysNum);
		reset();
	}
}

function reset(){
	statusText.html("Status: ");
	squares = [];
	squaresIndex = [];
	indexesFound = [];
	col = floor(width/rez);
	row = floor(height/rez);
	hasLost = false;
	hasWon = false;
	bombsPercentage = bombInputSlider.value();
	bombs = floor(col*row*bombsPercentage/100);
	squaresPressed = 0;
	setupSquares();
	setupBombs();
	setupNumbers();
	rectLeftText.html("Rect left: " + (squares.length-bombs-squaresPressed));
	totalSquares.html("Totalt amount of squares: " + squares.length);
}

function sliderMoved(){
	bombsPercentage = bombInputSlider.value();
	bombInputP.html("Bombs: " + bombsPercentage + "%");
}

function draw(){
	background(100);

	bombInputSlider.mouseReleased(sliderMoved);
	bombInputSlider.mouseMoved(sliderMoved);

	for (let i = 0; i < squares.length; i++){
		squares[i].show();
	}
}

function setupSquares(){
	for (let r = 0; r < row; r++) {
		for (let c = 0; c < col; c++) {
			squares.push(new Square(c*rez,r*rez,rez,r*col+c));
			squaresIndex.push(r*col+c);
		}
	}
}

function setupBombs(){
	for (let i = 0; i < bombs; i++){
		let j = squaresIndex[floor(random(0,squaresIndex.length))];
		squares[j].bomb = true;
		squaresIndex.splice(j,1);
	}
}

function setupNumbers(){
	for (let i = 0; i < squares.length; i++){
		squares[i].checkAround(squares, col, row);
	}
}

function mousePressed(){
	if(!hasLost && !hasWon){
		for (let i = 0; i < squares.length; i++){
			if (squares[i].pressed(mouseX,mouseY)){
				if (squares[i].bombAround == 0 && !squares[i].bomb) {
					removeZero(i);
					rectLeftText.html("Rect left: " + (squares.length-bombs-squaresPressed));
				}
				else if (!squares[i].bomb){
					squaresPressed++;
					rectLeftText.html("Rect left: " + (squares.length-bombs-squaresPressed));
				}
				if (squares[i].bomb){
					//Vi har förlorat
					statusText.html("Status: You have lost! Press any key to restart.");
					totalPlaysNum++;
					hasLost = true;
				} else if (squaresPressed == (squares.length-bombs)) {
					//Vi har vunnit
					statusText.html("Status: You have won!");
					totalPlaysNum++;
					totalWinsNum++;
					hasWon = true;
				}
			}
		}
	}
}

function removeZero(i){
	let zeroRect = [];
	let newRect = [];
	newRect.push(squares[i]);
	zeroRect.push(newRect);	
	indexesFound.push(i);
	for (let j = 0; j < zeroRect.length; j++){
		newRect = [];
		let zeroFound = 0;
		for (k = 0; k < zeroRect[j].length;k++){
			let index = zeroRect[j][k].i;
			if (!(squares[index].i < col)){
				if (squares[index-col].bombAround == 0 && !squares[index-col].bomb){
					//noll över
					let hasBeenFound = false;
					for (let l = 0; l < indexesFound.length; l++){
						if (indexesFound[l] == (index-col)){
							hasBeenFound = true;
							break;
						}
					}
					if (!hasBeenFound){
						newRect.push(squares[index-col]);
						zeroFound++;
						indexesFound.push(index-col);
					}
				}
			}	
			if (!(squares[index].i >= (squares.length-col))){
				if (squares[index+col].bombAround == 0 && !squares[index+col].bomb){
					//Bomb under
					let hasBeenFound = false;
					for (let l = 0; l < indexesFound.length; l++){
						if (indexesFound[l] == (index+col)){
							hasBeenFound = true;
							break;
						}
					}
					if (!hasBeenFound){
						newRect.push(squares[index+col]);
						zeroFound++;
						indexesFound.push(index+col);
					}
				}
			}
			if ((squares[index].i % col) != 0){
				if (squares[index-1].bombAround == 0 && !squares[index-1].bomb){
					//Bomb vänster
					let hasBeenFound = false;
					for (let l = 0; l < indexesFound.length; l++){
						if (indexesFound[l] == (index-1)){
							hasBeenFound = true;
							break;
						}
					}
					if (!hasBeenFound){
						newRect.push(squares[index-1]);
						zeroFound++;
						indexesFound.push(index-1);
					}
				}
			}
			if ((squares[index].i % col) != col-1){
				if (squares[index+1].bombAround == 0 && !squares[index+1].bomb){
					//Bomb höger
					let hasBeenFound = false;
					for (let l = 0; l < indexesFound.length; l++){
						if (indexesFound[l] == (index+1)){
							hasBeenFound = true;
							break;
						}
					}
					if (!hasBeenFound){
						newRect.push(squares[index+1]);
						zeroFound++;
						indexesFound.push(index+1);
					}
				}	
			}
		}
		if (zeroFound != 0){
			zeroRect.push(newRect);
		}
	}
	
	for (let m = 0; m < zeroRect.length; m++){
		for (let n = 0; n < zeroRect[m].length; n++){
			zeroRect[m][n].hasBeenPressed = true;
			squaresPressed++;
		}
	}
}
