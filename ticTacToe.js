'use strict';

let ticTacToe = {
	init() {
		ticTacToe.RESERVE_MARKS = ['X', 'O', '#', '|', '[', ']', '$'];
		ticTacToe.players = [];
		ticTacToe.squares = [];
		ticTacToe.playerNameArray = [];
		ticTacToe.playerMarkArray = [];
		ticTacToe.playerNameInputArray = [];
		ticTacToe.playerMarkInputArray = [];

		ticTacToe.playerOptions = document.getElementById('playerOptions');
		ticTacToe.playersSetter = document.getElementById('playersSetter');
		ticTacToe.playerOptionButton = document.getElementById('optionAccepter');

		ticTacToe.restartButton = document.getElementById('restartButton');

		ticTacToe.messageContainer = document.getElementById('messageContainer');
		ticTacToe.winningMessage = document.getElementById('winningMessage');
		ticTacToe.drawMessage = document.getElementById('drawMessage');

		ticTacToe.board = document.getElementById('board');
		ticTacToe.columnSetterField = document.getElementById('columnSetterField');

		ticTacToe.playerTurnIndicator = document.getElementById('turnIndicator');
		ticTacToe.turnCounter = 0;

		this.setNumberOfPlayerOptions();
		this.addOptionAccepterListener();
		this.addPlayerNumberChangeListener();
		this.setHtmlBoardSize();
		this.addBoardChangeListener();
		this.addSquareClickListener();
		this.addRestartButtonListener();
	},

	addBoardChangeListener() {
		this.columnSetterField.addEventListener('change', (e) => {
			document.documentElement.style.setProperty('--columnRow', e.target.value);
			this.deleteHtmlBoard();
			this.columnSetterField.value = e.target.value;
			this.setHtmlBoardSize();
			this.squares = Array.from(
				document.getElementsByClassName('board__square')
			).concat(
				Array.from(document.getElementsByClassName('board__square--filled'))
			);
			this.addSquareClickListener();
		});
	},

	addPlayerNumberChangeListener() {
		this.playersSetter.addEventListener('change', (e) => {
			this.clearPlayerOptions();
			this.playersSetter.value = e.target.value;
			this.setNumberOfPlayerOptions();
		});
	},

	addOptionAccepterListener() {
		this.playerOptionButton.addEventListener('click', (e) => {
			// hide options
			this.playerOptions.style.setProperty('display', 'none');
			// set player array
			this.players = [];
			let counter = 0;
			for (let i = 0; i < this.playersSetter.value; i++) {
				let nameInput = document.getElementsByClassName(
					'player__field--nameInput'
				)[i].value;
				let markInput = document.getElementsByClassName(
					'player__field--markInput'
				)[i].value;
				if (nameInput && markInput) {
					this.players.push({ [nameInput]: markInput.toUpperCase() });
				} else if (nameInput && !markInput) {
					this.players.push({ [nameInput]: this.RESERVE_MARKS[counter] });
				} else if (counter < this.RESERVE_MARKS.length) {
					this.players.push({
						[`Player${[i + 1]}`]: this.RESERVE_MARKS[counter],
					});
				} else {
					counter = 0;
					this.players.push({
						[`Player${[i + 1]}`]: this.RESERVE_MARKS[counter],
					});
				}
				counter++;
			}
			this.playerTurnIndicator.textContent =
				Object.keys(this.players[this.turnCounter]) + "'s turn";
			this.inGame(true);
			this.addSquareClickListener();
		});
	},

	inGame(status) {
		if (status) {
			this.playersSetter.disabled = true;
			this.columnSetterField.disabled = true;
		} else {
			this.playersSetter.disabled = false;
			this.columnSetterField.disabled = false;
		}
	},

	setNumberOfPlayerOptions() {
		for (let i = 0; i < this.playersSetter.value; i++) {
			this.playerNameArray[i] = document.createElement('div');
			this.playerNameArray[i].className = 'player__field--name';
			this.playerNameArray[i].textContent = `Player${i + 1}: `;

			this.playerNameInputArray[i] = document.createElement('input');
			this.playerNameInputArray[i].className = 'player__field--nameInput';

			this.playerMarkArray[i] = document.createElement('div');
			this.playerMarkArray[i].className = 'player__field--mark';
			this.playerMarkArray[i].textContent = 'Mark: ';

			this.playerMarkInputArray[i] = document.createElement('input');
			this.playerMarkInputArray[i].className = 'player__field--markInput';

			this.playerOptions.appendChild(this.playerNameArray[i]);
			this.playerOptions.appendChild(this.playerNameInputArray[i]);
			this.playerOptions.appendChild(this.playerMarkArray[i]);
			this.playerOptions.appendChild(this.playerMarkInputArray[i]);
		}
	},

	clearPlayerOptions() {
		while (this.playerOptions.firstChild) {
			this.playerOptions.removeChild(this.playerOptions.firstChild);
		}
	},

	addSquareClickListener() {
		this.squares = Array.from(
			document.getElementsByClassName('board__square')
		).concat(
			Array.from(document.getElementsByClassName('board__square--filled'))
		);
		this.squares.forEach((square) => {
			square.addEventListener('click', this.handleClick, { once: true });
		});
	},

	handleClick(e) {
		const square = e.target;
		square.textContent = Object.values(
			ticTacToe.players[ticTacToe.turnCounter]
		);
		const valueArray = ticTacToe.squares.map((element) => element.textContent);
		const matrix = ticTacToe.toMatrix(
			valueArray,
			ticTacToe.columnSetterField.value
		);
		square.className += '--filled';
		if (ticTacToe.isWin(matrix, square.textContent)) {
			ticTacToe.messageContainer.style.setProperty('display', 'flex');
			ticTacToe.winningMessage.textContent = `Victory for ${
				Object.keys(ticTacToe.players[ticTacToe.turnCounter])[0]
			}`;
			ticTacToe.drawMessage.classList.add('hide');
			return;
		}
		if (ticTacToe.isDraw(matrix)) {
			ticTacToe.messageContainer.style.setProperty('display', 'flex');
			ticTacToe.winningMessage.classList.add('hide');
			return;
		}
		ticTacToe.turnProgress();
	},

	toMatrix(arr, width) {
		return arr.reduce(
			(rows, key, index) =>
				(index % width == 0
					? rows.push([key])
					: rows[rows.length - 1].push(key)) && rows,
			[]
		);
	},

	isWin(matrix, mark) {
		return (
			this.checkVertical(matrix, mark) ||
			this.checkHorizontal(matrix, mark) ||
			this.checkDiagonal1(matrix, mark) ||
			this.checkDiagonal2(matrix, mark)
		);
	},

	isDraw(matrix) {
		if (
			matrix
				.map((element) => element.filter((element2) => element2 === ''))
				.flat(1).length < 4
		) {
			return true;
		}
		return false;
	},

	checkVertical(matrix, mark) {
		for (let i = 0; i < matrix.length; i++) {
			for (let k = 0; k <= matrix[i].length - 5; k++) {
				if (
					matrix[k][i] === mark &&
					matrix[k + 1][i] === mark &&
					matrix[k + 2][i] === mark &&
					matrix[k + 3][i] === mark &&
					matrix[k + 4][i] === mark
				) {
					return true;
				}
			}
		}
		return false;
	},

	checkHorizontal(matrix, mark) {
		for (let i = 0; i < matrix.length; i++) {
			for (let k = 0; k <= matrix[i].length - 5; k++) {
				if (
					matrix[i][k] === mark &&
					matrix[i][k + 1] === mark &&
					matrix[i][k + 2] === mark &&
					matrix[i][k + 3] === mark &&
					matrix[i][k + 4] === mark
				) {
					return true;
				}
			}
		}
		return false;
	},

	checkDiagonal1(matrix, mark) {
		for (let k = 0; k <= 2 * (matrix.length - 1); k++) {
			let array = [];
			for (let y = matrix.length - 1; y >= 0; y--) {
				let x = k - y;
				if (x >= 0 && x < matrix.length && matrix[y][x] === mark) {
					array.push(true);
				}
				if (x >= 0 && x < matrix.length && matrix[y][x] !== mark) {
					array.push(false);
				}
			}
			if (array.length >= 5) {
				for (let z = 0; z <= array.length - 5; z++) {
					if (
						array[z] === true &&
						array[z + 1] === true &&
						array[z + 2] === true &&
						array[z + 3] === true &&
						array[z + 4] === true
					) {
						return true;
					}
				}
			}
		}
		return false;
	},

	checkDiagonal2(matrix, mark) {
		for (let k = 0; k <= 2 * (matrix.length - 1); k++) {
			let array = [];
			for (let y = matrix.length - 1; y >= 0; y--) {
				let x = k - (matrix.length - y);
				if (x >= 0 && x < matrix.length && matrix[y][x] === mark) {
					array.push(true);
				}
				if (x >= 0 && x < matrix.length && matrix[y][x] !== mark) {
					array.push(false);
				}
			}
			if (array.length >= 5) {
				for (let z = 0; z <= array.length - 5; z++) {
					if (
						array[z] === true &&
						array[z + 1] === true &&
						array[z + 2] === true &&
						array[z + 3] === true &&
						array[z + 4] === true
					) {
						return true;
					}
				}
			}
		}
		return false;
	},

	turnProgress() {
		ticTacToe.turnCounter++;
		let stringArray = document
			.getElementById('turnIndicator')
			.textContent.split("'");
		if (ticTacToe.turnCounter >= ticTacToe.players.length) {
			ticTacToe.turnCounter = 0;
		}
		stringArray[0] = Object.keys(this.players[this.turnCounter]);
		document.getElementById('turnIndicator').textContent = stringArray.join(
			"'"
		);
		document.documentElement.style.setProperty(
			'--mark',
			`\'${Object.values(this.players[this.turnCounter])[0]}\'`
		);
	},

	setHtmlBoardSize() {
		let squareArray = [];
		for (
			let i = 0;
			i < this.columnSetterField.value * this.columnSetterField.value;
			i++
		) {
			squareArray[i] = document.createElement('div');
			squareArray[i].className = 'board__square';

			this.board.appendChild(squareArray[i]);
		}
	},

	deleteHtmlBoard() {
		while (this.board.firstChild) {
			this.board.removeChild(this.board.firstChild);
		}
	},

	clearGame() {
		this.squares = Array.from(
			document.getElementsByClassName('board__square')
		).concat(
			Array.from(document.getElementsByClassName('board__square--filled'))
		);
		this.squares.forEach((element) => {
			element.textContent = '';
			element.className = 'board__square';
		});
		this.turnCounter = 0;
		this.playerTurnIndicator.textContent =
			Object.keys(this.players[this.turnCounter]) + "'s turn";
		ticTacToe.messageContainer.style.setProperty('display', 'none');
	},

	addRestartButtonListener() {
		this.restartButton.addEventListener('click', (e) => {
			this.playerOptions.style.setProperty('display', 'grid');
			this.inGame();
			ticTacToe.clearGame();
		});
	},
};

window.onload = ticTacToe.init();
