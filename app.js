const options = document.querySelectorAll('.option');
const box = document.querySelector('.box');
const restartGameBtn = document.getElementById('restart_game');

let amIZero = true;
let userOne = 'User One';
let userTwo = 'User Two';
let winnerFound = false;
let values = ['', '', '', '', '', '', '', '', ''];
const f_user = prompt('First User Name?:');
if (f_user) {
  userOne = f_user;
}
const s_user = prompt('Second User Name?:');
if (s_user) {
  userTwo = s_user;
}

// fill my position
options.forEach((el) => el.addEventListener('click', function () {
  if (this.classList[1] || winnerFound) {
    return;
  }
  if (amIZero) {
    this.classList.add('zero');
    values[this.dataset.id] = userOne;
    box.classList.add('c');
    amIZero = false;
  } else {
    this.classList.add('cross');
    values[this.dataset.id] = userTwo;
    box.classList.remove('c');
    amIZero = true;
  }

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < 8; i++) {
    const winCombo = winningConditions[i];
    const a = values[winCombo[0]];
    const b = values[winCombo[1]];
    const c = values[winCombo[2]];
    if (a && b && c && a === b && b === c) {
      const printResult = confirm(`Winner is ${a}\nWanna Play More!?`);
      winnerFound = true;
      if (printResult) {
        restartGame();
      } else {
        restartGame();
      }
    }
  }
}));

function restartGame() {
  winnerFound = false;
  options.forEach((option) => option.classList.remove('zero', 'cross'));
  values = ['', '', '', '', '', '', '', '', ''];
}

restartGameBtn.addEventListener('click', () => {
  restartGame();
});
