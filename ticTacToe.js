'use strict'

let ticTacToe = {
	init: function() {
		ticTacToe.players = [];

		ticTacToe.board = document.getElementById('board')
		ticTacToe.columnSetterField = document.getElementById('columnSetterField'),
		ticTacToe.columnSetterFieldValue = document.getElementById('columnSetterField').value;

		ticTacToe.squares = document.getElementsByClassName('board__square');

		this.setHtmlBoardSize();
		this.addBoardChangeListener();
	},

	addBoardChangeListener: function() {
		this.columnSetterField.addEventListener('change', (e) => {
			document.documentElement.style.setProperty('--columnRow', e.target.value);
			this.clearHtmlBoard();
			this.columnSetterFieldValue = document.getElementById('columnSetterField').value;
			this.setHtmlBoardSize();
		})
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
			if (i === 0) {
				squareArray[i].className = 'board__square x';
				squareArray[i].textContent = 'X'
			} else {
			squareArray[i].className = 'board__square';
			}
			
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
