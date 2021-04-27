'use strict';

let ticTacToe = {
	init: function () {
		ticTacToe.players = [];

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
			this.squares = document.querySelectorAll('board__square')
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
				} else if (counter < reserveMarks.length) {
					this.players.push({ [`Player${[i+1]}`]: reserveMarks[counter] });
				} else {
					counter = 0;
					this.players.push({ [`Player${[i+1]}`]: reserveMarks[counter] });
				}
				counter++;
			}
			console.log(this.players);
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
		let squares = Array.from(document.getElementsByClassName('board__square'))
		squares.forEach(square => {
			square.addEventListener('click', this.handleClick, { once: true });
		});
	},

	handleClick: function (e) {
		const square = e.target;
		console.log(square)
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
