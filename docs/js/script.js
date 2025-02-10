const upButton = document.getElementById('upButton');
const downButton = document.getElementById('downButton');

const ownChoice = document.getElementById('thumb');
const endResult = document.getElementById('result');
const points = document.getElementById('score');
const playAgain = document.getElementById('playAgainButton');

let score = 0;

const winSound = new Audio("sound/win.mp3");
const loseSound = new Audio("sound/lose.mp3");

// Make random choice for the thumb
function thumbResult() {
  return Math.random() < 0.5 ? 'up' : 'down';
}

// Check if the user choice is correct
function handleGuess(userGuess) {
  const thumb = thumbResult();
  ownChoice.innerHTML = userGuess === 'up' ? '<img src="img/thumbs-up.png" style="width:30px;height:30px;"  alt="thumbs up" />' : '<img src="img/thumbs-down.png" style="width:30px;height:30px;"  alt="thumbs down" />';
  endResult.innerHTML = thumb === 'up' ? '<img src="img/thumbs-up.png" style="width:30px;height:30px;" alt="thumbs up" />' : '<img src="img/thumbs-down.png" style="width:30px;height:30px;" alt="thumbs down" />';

  // wins and losses
  if (userGuess === thumb) {
    alert('Correct guess! 🎉');
    score++;
    document.body.classList.add('flashy');
    winSound.play().then(() => {
    }).catch(error => {
      console.error('Error playing win sound:', error);
    });
    setTimeout(() => {
      document.body.classList.remove('flashy');
    }, 2000);
  } else {
    alert('Wrong guess! 😢');
    document.body.classList.add('loser');
    loseSound.play().then(() => {
    }).catch(error => {
      console.error('Error playing lose sound:', error);
    });
    setTimeout(() => {
      document.body.classList.remove('loser');
    }, 2000);
  }

  // Update the score display
  points.textContent = score.toString();

  // Set the active class on the clicked button
  if (userGuess === 'up') {
    upButton.classList.add('active');
    downButton.classList.remove('active');
  } else {
    downButton.classList.add('active');
    upButton.classList.remove('active');
  }
}

// Reset the game
playAgain.addEventListener('click', () => {
  ownChoice.textContent = '(Nothing yet!)';
  endResult.textContent = '(Awaiting guess!)';
  upButton.classList.remove('active');
  downButton.classList.remove('active');
  score = 0;
  points.textContent = score.toString();
});

// Add event listeners to buttons
upButton.addEventListener('click', () => handleGuess('up'));
downButton.addEventListener('click', () => handleGuess('down'));
