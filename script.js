'use strict';

const $ = document.querySelector.bind(document);

const player0El = $('.player--0');
const player1El = $('.player--1');
const score0El = $('#score--0');
const score1El = $('#score--1');
const current0El = $('#current--0');
const current1El = $('#current--1');

const diceEl = $('.dice');
const btnNew = $('.btn--new');
const btnRoll = $('.btn--roll');
const btnHold = $('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  $(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    // nếu dice === 1 thì đổi lượt chơi
    if (dice !== 1) {
      currentScore = currentScore + dice;
      $(`#current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    $(`#score--${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 200) {
      playing = false;
      diceEl.classList.add('hidden');
      $(`.player--${activePlayer}`).classList.add('player--winner');
      $(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
