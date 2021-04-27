'use strict'

let ticTacToe = {
	init: function() {
		ticTacToe.players = [];

		ticTacToe.playerOptions = document.getElementById('players__options');
		ticTacToe.playersNumber = document.getElementById('playersNumber');
		ticTacToe.playersNumberValue = document.getElementById('playersNumber').value;

		ticTacToe.board = document.getElementById('board');
		ticTacToe.columnSetterField = document.getElementById('columnSetterField');
		ticTacToe.columnSetterFieldValue = document.getElementById('columnSetterField').value;

		ticTacToe.squares = document.getElementsByClassName('board__square');

		this.setNumberOfPlayerOptions();
		this.addPlayerNumberChangeListener();
		this.setHtmlBoardSize();
		this.addBoardChangeListener();
	},

	addBoardChangeListener: function() {
		this.columnSetterField.addEventListener('change', (e) => {
			document.documentElement.style.setProperty('--columnRow', e.target.value);
			this.clearHtmlBoard();
			this.columnSetterFieldValue = e.target.value;
			this.setHtmlBoardSize();
		})
	},

	addPlayerNumberChangeListener: function() {
		this.playersNumber.addEventListener('change', (e) => {
			this.clearPlayerOptions();
			this.playersNumberValue = e.target.value;
			this.setNumberOfPlayerOptions();
		})
	},

	setNumberOfPlayerOptions: function() {
		let playerNameArray = [];
		let playerMarkArray = [];
		let playerNameInputArray = [];
		let playerMarkInputArray = [];
		for (let i = 0; i < this.playersNumberValue; i++) {
			playerNameArray[i] = document.createElement('div');
			playerNameArray[i].className = 'player__field--name';
			playerNameArray[i].textContent = `Player${i+1}: `;

			playerNameInputArray[i] = document.createElement('input');
			playerNameInputArray[i].className = 'player__field--nameInput';

			playerMarkArray[i] = document.createElement('div');
			playerMarkArray[i].className = 'player__field--mark';
			playerMarkArray[i].textContent = 'Sign to use: ';

			playerMarkInputArray[i] = document.createElement('input');
			playerMarkInputArray[i].className = 'player__field--markInput';
			
			this.playerOptions.appendChild(playerNameArray[i]);
			this.playerOptions.appendChild(playerNameInputArray[i]);
			this.playerOptions.appendChild(playerMarkArray[i]);
			this.playerOptions.appendChild(playerMarkInputArray[i]);
		}
	},

	clearPlayerOptions: function() {
		while (this.playerOptions.firstChild) {
			this.playerOptions.removeChild(this.playerOptions.firstChild);
		}
	},

	addSquareClickListener: function() {
		this.squares.forEach(element => {
			element.addEventListener('click', handleClick, { once: true })
		});
	},

	handleClick: function() {
	},

	setHtmlBoardSize: function() {
		let squareArray = [];
		for (let i = 0; i < this.columnSetterFieldValue * this.columnSetterFieldValue; i++) {
			squareArray[i] = document.createElement('div');
			squareArray[i].className = 'board__square';
			
			this.board.appendChild(squareArray[i]);
		}
	},

	clearHtmlBoard: function() {
		while (this.board.firstChild) {
			this.board.removeChild(this.board.firstChild);
		}
	}
}

window.onload = ticTacToe.init()
