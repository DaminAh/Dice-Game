'use strict';

let dice = document.querySelector('.dice');
let scoreP1El = document.querySelector('#score--0');
let scoreP2El = document.querySelector('#score--1');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');

let playing, activePlayer, playerScores, currentScore;

function initializeGame() {
  playing = true;
  activePlayer = 0;
  playerScores = [0, 0];
  currentScore = 0;
  dice.style.visibility = 'hidden';
  scoreP1El.textContent = playerScores[0];
  scoreP2El.textContent = playerScores[1];
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;

  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
}

initializeGame();

function rollDice() {
  let roll = Math.floor(Math.random() * 6) + 1;
  return roll;
}

function displayDice(rolledNum) {
  dice.style.visibility = 'visible';
  dice.src = `dice-${rolledNum}.png`;
}

function activePlayerOverlay() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
}

btnRoll.addEventListener('click', function (e) {
  if (playing) {
    let rolledNum = rollDice();
    displayDice(rolledNum);

    if (rolledNum !== 1) {
      currentScore += rolledNum;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      currentScore = 0;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      activePlayerOverlay();
    }
  }
});

btnHold.addEventListener('click', e => {
  if (playing) {
    playerScores[activePlayer] = playerScores[activePlayer] + currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      playerScores[activePlayer];
    currentScore = 0;

    if (playerScores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      dice.style.visibility = 'hidden';
      playing = false;
    }
    activePlayerOverlay();
  }
});

btnNew.addEventListener('click', initializeGame);
