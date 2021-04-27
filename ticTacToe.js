'use strict'

let ticTacToe = {
	init: function() {
		ticTacToe.board = document.getElementById('board')
		ticTacToe.columnSetterField = document.getElementById('columnSetterField'),
		ticTacToe.columnSetterFieldValue = document.getElementById('columnSetterField').value;
		this.setHtmlBoardSize();
		this.boardChangeListener();
	},

	boardChangeListener: function() {
		this.columnSetterField.addEventListener('change', (e) => {
			document.documentElement.style.setProperty('--columnRow', e.target.value);
			this.clearHtmlBoard();
			this.columnSetterFieldValue = document.getElementById('columnSetterField').value;
			this.setHtmlBoardSize();
		})
	},

	setHtmlBoardSize: function() {
		let squareArray = [];
		for (let i = 0; i < this.columnSetterFieldValue * this.columnSetterFieldValue; i++) {
			squareArray[i] = document.createElement('div');
			squareArray[i].className = 'board__square';
			squareArray[i].textContent = i;
			
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
