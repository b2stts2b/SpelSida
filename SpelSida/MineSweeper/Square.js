class Square {
	constructor(x,y,r,i){
		this.x = x;
		this.y = y;
		this.r = r;
		this.i = i;

		this.hasBeenPressed = false;

		this.bomb = false;
		this.bombAround = 0;
	}

	checkAround(squares, col, row){
		if(!this.bomb){
			//Inte längst till vänster
			if ((this.i % col != 0)){
				//Kolla om det finns bomb till vänster
				if (squares[this.i-1].bomb){
					this.bombAround++;
					
				}
			} 
			//Inte längst till höger
			if ((this.i % col) != (col-1)){
				//Kolla om det finns bomb till höger
				if(squares[this.i+1].bomb){
					this.bombAround++;

				}
			}
			//Inte högst upp
			if (!(this.i < col)){
				//Kolla om det finns bomb precis över
				if(squares[this.i-col].bomb){
					this.bombAround++;
				}
			}
			//Inte längst ner
			if(!(this.i >= (squares.length-col)))
				//Kolla om det finns bomb precis under
				if(squares[this.i+col].bomb){
					this.bombAround++;
				}
			//Inte längst till vänster eller högst upp
			if ((this.i % col != 0) && !(this.i < col)){
				//Kolla om det finns bomb upptill vänster
				if(squares[this.i-1-col].bomb){
					this.bombAround++;
				}
			}
			//Inte längst till vänster eller längst ner
			if ((this.i % col != 0) && !(this.i >= (squares.length-col))){
				//Kolla om det finns bomb ner till vänster
				if(squares[this.i-1+col].bomb){
					this.bombAround++;
				}
			}
			//Inte längst till höger eller högst upp
			if ((this.i % col) != (col-1) && !(this.i < col)){
				//Kolla om det finns bomb upp till höger
				if(squares[this.i+1-col].bomb){
					this.bombAround++;
				}
			}
			//Inte längst till höger eller längst ner
			if ((this.i % col) != (col-1) && !(this.i >= (squares.length-col))){
				//Kolla om det finns bomb ner till vänster
				if(squares[this.i+1+col].bomb){
					this.bombAround++;
				}
			}
		}
	}

	pressed(x, y){
		if (!this.hasBeenPressed){
			let bx = (x > this.x) && (x < this.x+this.r);
			let by = (y > this.y) && (y < this.y+this.r);
			if (bx && by){
				this.hasBeenPressed = true;
				return true;
			}
		
		}
	}

	show(){
		if (!this.hasBeenPressed){
			stroke(0);
			fill(200);
			rect(this.x,this.y,this.r,this.r);
		}		
		else if (this.hasBeenPressed && this.bomb){
			stroke(0);
			fill(255);
			ellipse(this.x+this.r/2,this.y+this.r/2,this.r/3,this.r/3);
		}	
		else if (this.hasBeenPressed && !this.bomb){
			stroke(0);
			fill(100);
			rect(this.x,this.y,this.r,this.r);
			
			textSize(floor(this.r/2));
			textAlign(CENTER,CENTER);
			//fill(0);
			rect(this.x,this.y,this.r,this.r);
			fill(255);
			text(this.bombAround,this.x+this.r/2,this.y+this.r/2);
		}
	}
}