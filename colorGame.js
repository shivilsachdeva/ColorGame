// default color array
var numSquares = 6; 
var pickedColor;
var colors;
var squares = document.querySelectorAll(".square"); 
var colorDisplay = document.querySelector("#colorDisplay");
var msgDisplay = document.querySelector("#msg"); 
var h1 = document.querySelector("h1"); 
var resetButton = document.querySelector("#reset"); 
var modeButtons = document.querySelectorAll(".mode");
var scoreDisplay = document.querySelector("#scoreDisplay")
var score = 0; 

init(); 

/** -----------------------------------------------------
// 						FUNCTIONS
** ------------------------------------------------------ */ 
function init(){ 

setupModeButtons();
setupSquares(); 
reset();
resetButton.addEventListener("click", reset);
}

function setupModeButtons() { 
		// mode buttons event listeners
	for(var i = 0; i < modeButtons.length; i++) { 
		modeButtons[i].addEventListener("click", function(){
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected"); 
		//turnary operator (if else)
		this.textContent === "Easy" ? numSquares = 3: numSquares = 6; 
		reset(); 
		});
	}
}

function setupSquares () { 
		// click listeners for squares
	for(var i = 0; i < squares.length; i++) { 
	// add listener to square -- click
	squares[i].addEventListener("click", function(){
		// grab color of clicked square
		var clickedColor = this.style.backgroundColor; 
		// compare user-clickedColor to random-pickedColor
		// 	CORRECT
		if(clickedColor === pickedColor) { 
			msgDisplay.textContent = "Correct!";
			changeColors(clickedColor);
			h1.style.backgroundColor = clickedColor;
			resetButton.textContent = "Play Again?";
			score++;
			scoreDisplay.textContent = score;
		// IF INCORRECT
		} else {
			this.style.backgroundColor = "#232323";
			msgDisplay.textContent = "Try Again";
			score = 0;
			scoreDisplay.textContent = 0; 
		} 
	});
}

}
 

function reset() {
	// generate all new colors
	colors = generateRandomColors(numSquares); 
	// pick a new random color from array
	pickedColor = pickColor(); 
	// change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	// change colors of squares
	for(var i = 0; i < squares.length; i++) { 
		if(colors[i]){ 
			squares[i].style.display = "block"; 
			squares[i].style.backgroundColor = colors[i]; 
		} else { 
			squares[i].style.display = "none"; 
		}
	}
	winningIndex();
	
	// change background color h1
	h1.style.backgroundColor = "steelblue";
	// clear win/lose message
	msgDisplay.textContent = "";
	// change play again to reset
	resetButton.textContent = "New Colors"
}

function changeColors(color) {
	// loop through all squares
	for(var i = 0; i < squares.length; i++) { 	
	// change color to match color
	squares[i].style.backgroundColor = color; 
	}
}

function pickColor() { 
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	// make an array
	var arr = [];  
	// add num random colors to array
	for(var i = 0; i < num; i++) { 
	// get random color & push it onto array
	arr.push(randomColor()); 
	}
	// return array
	return arr; 
}

function randomColor() { 
	// pick a "red" from 0 to 255
	var r = Math.floor(Math.random() * 256);
	// pick a "green" from 0 to 255
	var g = Math.floor(Math.random() * 256);
	// pick a "blue" from 0 to 255
	var b = Math.floor(Math.random() * 256);
	// string synthesis
	return "rgb(" + r + ", " + g + ", " + b + ")"; 
}

function winningIndex() { 
	for(var i = 0; i < colors.length; i++) {
		if (pickedColor === colors[i]) console.log("Winning Index: " + i);
	}
}
