const state = {
	board: []
}

//HTML ELEMENTS
const appElement = document.getElementById("app");
const boardElement = document.createElement("div");

//state initializer
function buildBoard() {
	for(let rowIdx = 0; rowIdx < 6; rowIdx++) {
		const row = [];
		for(let colIdx = 0; colIdx < 7; colIdx++) {
			row.push("");
		}
		state.board.push(row);
	}
	console.log(state.board);
}

//this will display my board into my html page
function renderBoard() {
	for(let i = 0; i < state.board.length; i++) { // goes through the rows
		for(let j = 0; j < state.board[i].length; j++) { // goes throught the columns
			const cellElement = document.createElement("div");
			cellElement.classList.add("cell");
			boardElement.appendChild(cellElement);
		}
	}
}

function bootstrap() {
	appElement.appendChild(boardElement);
	boardElement.classList.add("board");
	buildBoard();
	renderBoard();
}


//global function calls
bootstrap();