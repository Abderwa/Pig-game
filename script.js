'use strict';

//Selecting elements

const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//starting condiction

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  // switch player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};
//Rolling dice function

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //remove hidden class for dice
    diceEl.classList.remove('hidden');
    //load dice picture using dice number
    diceEl.src = `dice-${dice}.png`;

    //check if rolled == 1, yes(switch, no add currnet score)
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //change later
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // add currnet score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
