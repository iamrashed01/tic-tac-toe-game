const options = document.querySelectorAll('.option');
const gameWrapper = document.querySelector('body');
const restartGameBtn = document.getElementById('restart_game');
const currentPlayer = document.getElementById('currentPlayer');

// game class
class Game {
  constructor(fPlayer, sPlayer) {
    this.firstPlayer = fPlayer || 'user one';
    this.secondPlayer = sPlayer || 'user two';
    this.currentPlayer = this.firstPlayer;
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
    this.currentPlayer = this.currentPlayer === this.firstPlayer
      ? this.firstPlayer : this.secondPlayer;
    this.boards[index] = this.currentPlayer;
  }

  resetGame() {
    this.currentPlayer = this.firstPlayer;
    this.gameOver = false;
    this.boards = ['', '', '', '', '', '', '', '', ''];
  }

  stopGame() {
    this.gameOver = true;
  }

  printTheWinner(func) {
    for (let i = 0; i < 8; i++) {
      const winCombo = this.winningConditions[i];
      const a = this.boards[winCombo[0]];
      const b = this.boards[winCombo[1]];
      const c = this.boards[winCombo[2]];
      if (a && b && c && a === b && b === c) {
        let timer = null;
        timer = setTimeout(() => {
          confirm(`Winner is ${a}\nWanna Play More!?`);
          this.resetGame();
          func();
          clearInterval(timer);
        }, 300);
        break;
      }
    }
  }
}

// taking player names
const pOne = prompt('First Player Name?:');
const pTwo = prompt('Second Player Name?:');

// create ticTocToe game
const ticTocToe = new Game(pOne, pTwo);
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
  ticTocToe.printTheWinner(clearClassFromOptions);
}));

restartGameBtn.addEventListener('click', () => {
  clearClassFromOptions();
  ticTocToe.resetGame();
});

function clearClassFromOptions() {
  options.forEach((option) => option.classList.remove('zero', 'cross'));
}
