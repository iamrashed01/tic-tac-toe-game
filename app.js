const options = document.querySelectorAll('.option');
const gameWrapper = document.querySelector('body');
const restartGameBtn = document.getElementById('restart_game');
const currentPlayer = document.getElementById('currentPlayer');

// game class
class Game {
  constructor(fPlayer, sPlayer) {
    this.firstPlayer = fPlayer || 'user one';
    this.secondPlayer = sPlayer || 'user two';
    this.currentPlayer = fPlayer;
    this.gameOver = false;
    this.boards = ['', '', '', '', '', '', '', '', ''];
    this.winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  }

  fillTicPosition(index) {
    this.boards[index] = this.currentPlayer;
    const nextPlayer = this.currentPlayer === this.firstPlayer
      ? this.secondPlayer : this.firstPlayer;
    this.currentPlayer = nextPlayer;
  }

  resetGame() {
    this.currentPlayer = this.firstPlayer;
    this.gameOver = false;
    this.boards = ['', '', '', '', '', '', '', '', ''];
    this.clearClassFromOptions();
  }

  stopGame() {
    this.gameOver = true;
  }

  printTheWinner(cb) {
    for (let i = 0; i < 8; i++) {
      const winCombo = this.winningConditions[i];
      const a = this.boards[winCombo[0]];
      const b = this.boards[winCombo[1]];
      const c = this.boards[winCombo[2]];
      if (a && b && c && a === b && b === c) {
        let timer = null;
        timer = setTimeout(() => {
          cb(a);
          clearInterval(timer);
        }, 300);
        break;
      }
    }
  }
}
Game.prototype.clearClassFromOptions = () => {
  gameWrapper.classList.remove('c');
  options.forEach((option) => option.classList.remove('zero', 'cross'));
};

// taking player names
const firstPlayerInput = prompt('First Player Name?:');
const secondPlayerInput = prompt('Second Player Name?:');

// create ticTocToe game
const ticTocToe = new Game(firstPlayerInput, secondPlayerInput);

currentPlayer.innerText = ticTocToe.currentPlayer;

// fill my position
options.forEach((el) => el.addEventListener('click', function () {
  if (this.classList[1] || ticTocToe.gameOver) {
    return;
  }
  if (ticTocToe.currentPlayer === ticTocToe.firstPlayer) {
    this.classList.add('zero');
    gameWrapper.classList.add('c');
    ticTocToe.fillTicPosition(this.dataset.id);
  } else {
    this.classList.add('cross');
    gameWrapper.classList.remove('c');
    ticTocToe.fillTicPosition(this.dataset.id);
  }

  currentPlayer.innerText = ticTocToe.currentPlayer;
  ticTocToe.printTheWinner(async (winner) => {
    const userInput = confirm(`Winner is ${winner}\nWanna Play More!?`);
    if (userInput) {
      ticTocToe.resetGame();
    } else {
      ticTocToe.stopGame();
    }
  });
}));

restartGameBtn.addEventListener('click', () => {
  ticTocToe.resetGame();
});
