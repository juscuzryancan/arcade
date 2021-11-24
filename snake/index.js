//State

//make sure to establish default values within the sstate
let state = {
	score: 0,
	board: [],
	gameInterval: null,
	food: [5,5],
	snake: {
	 	nextDirection: [0, -1],
		body: [ [10,5], [10,6], [10,7], [10,8]],
	}
}

//Html Elements
const appElement = document.getElementById("app");
const boardElement = document.createElement("div");
const scoreElement = document.createElement("div")
const startButton = document.createElement("BUTTON")
const resetButton = document.createElement("BUTTON");

//Other functions

function checkSnakeAteItself() {
	const [snakeHeadRow, snakeHeadCol] = state.snake.body[0]
	for(let i = 1; i < state.snake.body.length; i++) {
		const [rowIdx, colIdx] = state.snake.body[i]
		if(snakeHeadRow === rowIdx && snakeHeadCol === colIdx) {
			return true;
		}
	}
	return false;
}

function checkBoundary() {
	const {snake: {body}, board} = state;
	const [snakeHeadRow, snakeHeadCol]  = body[0]
	if (snakeHeadRow < 0 || snakeHeadRow > board.length - 1 || snakeHeadCol < 0 || snakeHeadCol > board.length - 1) {
		return true;
	}
	return false;
}

function checkFoodCollision() {
	const {snake: {body, nextDirection}} = state;
	const [snakeHeadRow, snakeHeadCol]  = body[0]
	if(snakeHeadRow === state.food[0] && snakeHeadCol === state.food[1]) {
		return true;
	}
	return false;
}

//establisssh the state of my board
function buildBoard() {
	//building bare bone board
	state.board = []
	for(let rowIndex = 0; rowIndex < 20; rowIndex++) {
		const row = []
		for(let colIndex = 0; colIndex < 20; colIndex++) {
			row.push("");
		}
		state.board.push(row);
	}

	//different for loop for food
	setFoodInBoard();
	//different for loop for snake
	setSnakeInBoard();
}


function setSnakeInBoard() {
	for (let i = 0; i < state.snake.body.length; i++) {
		const currentSnakeSegment = state.snake.body[i]; //[10, 5]
		const currentSegmentRowIndex = currentSnakeSegment[0];
		const currentSegmentColIndex = currentSnakeSegment[1];
		state.board[currentSegmentRowIndex][currentSegmentColIndex] = "snake";
	}
}

function createNewFood() {
	let newCol, newRow;
	do {
		newCol = Math.floor(Math.random() * (state.board.length - 1));
		newRow = Math.floor(Math.random() * (state.board.length - 1));
	} while (isFoodASnakeTile([newCol, newRow]));
	state.food = [newRow, newCol];
}

function isFoodASnakeTile(food) {
	for(let i = 0; i < state.snake.body.length; i++) {
		if(state.snake.body[i][0] === food[0] && state.snake.body[i][0] === food[0]) {
			return true;
		}
	}
	return false;
}

function setFoodInBoard() {
	const foodPosition = state.food
	state.board[foodPosition[0]/* food row index */][foodPosition[1]/*food col index*/] = "food";
}

function moveSnake() {
	const snakeHead = state.snake.body[0];
	const newSnakeHeadRowIdx = snakeHead[0] + state.snake.nextDirection[0] ;
	const newSnakeHeadColIdx = snakeHead[1] + state.snake.nextDirection[1] ;
	state.snake.body.unshift([newSnakeHeadRowIdx, newSnakeHeadColIdx]);
	if(!checkFoodCollision()) {
		state.snake.body.pop();
	}
}


function bootstrap() {
	//setting text into elements before inserting them into the dom
	boardElement.classList.add("board")
	
	startButton.classList.add("start")
	startButton.innerText = "Yo start here";

	scoreElement.classList.add("score")
	scoreElement.innerText = "Yo score is here: 0";

	resetButton.classList.add("reset");
	resetButton.innerText = "Yo reset here"

	appElement.appendChild(scoreElement);
	appElement.appendChild(boardElement);
	appElement.appendChild(startButton);
	appElement.appendChild(resetButton);

	buildBoard();	
	renderBoard();
}

//Renders
function renderBoard() {

	boardElement.innerHTML = "";
	for(let row = 0; row < state.board.length; row++) {
		//row element to append to the board
		for(let col = 0; col < state.board[row].length; col++) {
			const tile = document.createElement("div");
			if (state.board[row][col] === "snake") {
				tile.classList.add("snake");
			} else if (state.board[row][col] === "food") {
				tile.classList.add("food");
			}			
			tile.classList.add("tile")
			boardElement.appendChild(tile);
		}
	}
}

function renderScore() {
	scoreElement.innerText = `Yo score is here: ${state.score}`
}

//Event Handlers
function handleReset() {
	state = {
		score: 0,
		board: [],
		gameInterval: null,
		food: [5, 5],
		snake: {
			nextDirection: [1, 0],
			body: [[10, 5], [10, 6], [10, 7], [10, 8]],
		}
	}
	bootstrap();
}

//Event Listeners
resetButton.addEventListener("click", handleReset);

document.addEventListener("keydown", function(event) {
	if(!state.gameInterval) {
		state.gameInterval = setInterval(function () {
			moveSnake();

			if(checkFoodCollision()) {
				createNewFood();
			}

			if(checkBoundary() || checkSnakeAteItself()){
				clearInterval(state.gameInterval);
			} else {
				buildBoard();
				renderBoard();
			}
		}, 167);
	}

	if((event.key === "w" || event.key == "ArrowUp") && state.snake.nextDirection[0] !== 1) {
		state.snake.nextDirection = [-1, 0];
	} else if ((event.key === "a" || event.key == "ArrowLeft") && state.snake.nextDirection[1] !== 1) {
		state.snake.nextDirection = [0, -1];
	} else if ((event.key === "s" || event.key == "ArrowDown") && state.snake.nextDirection[0] !== -1) {
		state.snake.nextDirection = [1, 0];
	} else if ((event.key === "d" || event.key == "ArrowRight") && state.snake.nextDirection[1] !== -1) {
		state.snake.nextDirection = [0, 1];
	}
})

//Global Function call biznezz logic megalul
bootstrap();