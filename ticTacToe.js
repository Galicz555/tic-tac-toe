'use strict';

let ticTacToe = {
	init: function () {
		ticTacToe.players = [];
		ticTacToe.squares = [];

		ticTacToe.playerOptions = document.getElementById('players__options');
		ticTacToe.playersNumber = document.getElementById('playersNumber');
		ticTacToe.playersNumberValue = document.getElementById(
			'playersNumber'
		).value;
		ticTacToe.playerOptionButton = document.getElementById('optionAccepter');

		ticTacToe.playerNameArray = [];
		ticTacToe.playerMarkArray = [];
		ticTacToe.playerNameInputArray = [];
		ticTacToe.playerMarkInputArray = [];

		ticTacToe.board = document.getElementById('board');
		ticTacToe.columnSetterField = document.getElementById('columnSetterField');
		ticTacToe.columnSetterFieldValue = document.getElementById(
			'columnSetterField'
		).value;

		ticTacToe.playerTurnIndicator = document.getElementById('turnIndicator');
		ticTacToe.turn = 0;


		this.setNumberOfPlayerOptions();
		this.addOptionAccepterListener();
		this.addPlayerNumberChangeListener();
		this.setHtmlBoardSize();
		this.addBoardChangeListener();
		this.addSquareClickListener();
	},

	addBoardChangeListener: function () {
		this.columnSetterField.addEventListener('change', (e) => {
			document.documentElement.style.setProperty('--columnRow', e.target.value);
			this.clearHtmlBoard();
			this.columnSetterFieldValue = e.target.value;
			this.setHtmlBoardSize();
			this.squares = document.querySelectorAll('board__square');
			this.addSquareClickListener();
		});
	},

	addPlayerNumberChangeListener: function () {
		this.playersNumber.addEventListener('change', (e) => {
			this.clearPlayerOptions();
			this.playersNumberValue = e.target.value;
			this.setNumberOfPlayerOptions();
		});
	},

	addOptionAccepterListener: function () {
		this.playerOptionButton.addEventListener('click', (e) => {
			// hide options
			// set player array
			this.players = [];
			let reserveMarks = ['x', 'o', '#', '|', '[', ']', '$'];
			let counter = 0;
			for (let i = 0; i < this.playersNumberValue; i++) {
				let nameInput = document.getElementsByClassName(
					'player__field--nameInput'
				)[i].value;
				let markInput = document.getElementsByClassName(
					'player__field--markInput'
				)[i].value;
				if (nameInput && markInput) {
					this.players.push({ [nameInput]: markInput });
				} else if (nameInput && !markInput) {
					this.players.push({ [nameInput]: reserveMarks[counter] });
				} else if (counter < reserveMarks.length) {
					this.players.push({ [`Player${[i+1]}`]: reserveMarks[counter] });
				} else {
					counter = 0;
					this.players.push({ [`Player${[i+1]}`]: reserveMarks[counter] });
				}
				counter++;
			}
			document.getElementById('turnIndicator').textContent =
				Object.keys(this.players[this.turn])
				+ this.playerTurnIndicator.textContent;
		});
	},

	setNumberOfPlayerOptions: function () {
		for (let i = 0; i < this.playersNumberValue; i++) {
			this.playerNameArray[i] = document.createElement('div');
			this.playerNameArray[i].className = 'player__field--name';
			this.playerNameArray[i].textContent = `Player${i + 1}: `;

			this.playerNameInputArray[i] = document.createElement('input');
			this.playerNameInputArray[i].className = 'player__field--nameInput';

			this.playerMarkArray[i] = document.createElement('div');
			this.playerMarkArray[i].className = 'player__field--mark';
			this.playerMarkArray[i].textContent = 'Sign to use: ';

			this.playerMarkInputArray[i] = document.createElement('input');
			this.playerMarkInputArray[i].className = 'player__field--markInput';

			this.playerOptions.appendChild(this.playerNameArray[i]);
			this.playerOptions.appendChild(this.playerNameInputArray[i]);
			this.playerOptions.appendChild(this.playerMarkArray[i]);
			this.playerOptions.appendChild(this.playerMarkInputArray[i]);
		}
	},

	clearPlayerOptions: function () {
		while (this.playerOptions.firstChild) {
			this.playerOptions.removeChild(this.playerOptions.firstChild);
		}
	},

	addSquareClickListener: function () {
		this.squares = Array.from(document.getElementsByClassName('board__square'))
		this.squares.forEach(square => {
			square.addEventListener('click', this.handleClick, { once: true });
		});
	},

	handleClick: function (e) {
		const square = e.target;
		square.textContent = Object.values(ticTacToe.players[ticTacToe.turn])
		const valueArray = ticTacToe.squares.map(element => element.textContent)
		const matrix = ticTacToe.toMatrix(valueArray, ticTacToe.columnSetterFieldValue)
		ticTacToe.isWin(matrix, square.textContent);
		ticTacToe.turnProgress();
		// console.log(isWin())
		//checkdraw
	},

	toMatrix: function(arr, width) {
		return arr.reduce((rows, key, index) => (
			index % width == 0
			? rows.push([key]) 
			: rows[rows.length-1].push(key)) && rows
			,[]);
	},

	isWin: function (matrix, mark) {
		this.checkDiagonal1(matrix, mark)
		/*return this.checkVertical(matrix, mark) 
			|| this.checkHorizontal(matrix, mark)
			|| this.checkDiagonal1(matrix, mark)
			|| this.checkDiagonal2(matrix, mark);*/
	},

	checkVertical: function (matrix, mark) {
		for (let i = 0; i < matrix.length; i++) {
			for (let k = 0; k <= matrix[i].length - 5; k++ ) {
				if ((matrix[k][i] === mark
					&& matrix[k+1][i] === mark
					&& matrix[k+2][i] === mark
					&& matrix[k+3][i] === mark
					&& matrix[k+4][i] === mark)) {
					return true;
				}
			}
		}
		return false;
	},

	checkHorizontal: function (matrix, mark) {
		for (let i = 0; i < matrix.length; i++) {
			for (let k = 0; k <= matrix[i].length - 5; k++ ) {
				if ((matrix[i][k] === mark
					&& matrix[i][k+1] === mark
					&& matrix[i][k+2] === mark
					&& matrix[i][k+3] === mark
					&& matrix[i][k+4] === mark)) {
					return true;
				}
			}
		}
		return false;
	},

	checkDiagonal1: function (matrix, mark) {
		for (let k = 0; k <= 2 * (matrix.length - 1); k++) {
			let array = [];
			for (let y = matrix.length -1; y >= 0; y--) {
				let x = k - y;
				if (x >= 0 && x < matrix.length && matrix[y][x] === mark) {
					array.push(true)
				}
				if (x >= 0 && x < matrix.length && matrix[y][x] !== mark) {
					array.push(false)
				}
			}
			if (array.length >= 5) {
				for (let z = 0; z <= array.length-5; z++) {
					if (array[z] === true
						&& array[z+1] === true
						&& array[z+2] === true
						&& array[z+3] === true
						&& array[z+4] === true) {
							alert('winner');
					}
				}
			}
		}
		return false;
	},
	
	checkDiagonal2: function (matrix, mark) {
		return false;
	},

	turnProgress: function () {
		ticTacToe.turn++;
		let stringArray = document.getElementById('turnIndicator').textContent.split("'");
		if (ticTacToe.turn >= ticTacToe.players.length) {
			ticTacToe.turn = 0;
		}
		stringArray[0] = Object.keys(this.players[this.turn]);
		let newString = stringArray.join("'")
		document.getElementById('turnIndicator').textContent = newString;
	},

	setHtmlBoardSize: function () {
		let squareArray = [];
		for (let i = 0;i < this.columnSetterFieldValue * this.columnSetterFieldValue; i++) {
			squareArray[i] = document.createElement('div');
			squareArray[i].className = 'board__square';

			this.board.appendChild(squareArray[i]);
		}
	},

	clearHtmlBoard: function () {
		while (this.board.firstChild) {
			this.board.removeChild(this.board.firstChild);
		}
	},
};

window.onload = ticTacToe.init();
