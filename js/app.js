// The API
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
let recognition = new SpeechRecognition();

class mainClass {
  constructor() {
    // All the fiedls
    this.icon = document.querySelector('.icon');
    this.guessBetween = document.querySelector('.welcome');
    this.speakInto = document.querySelector('.press-to-play');
    this.youSaid = document.querySelector('.you-said');
    this.result = document.querySelector('.result');
    this.advice = document.querySelector('.advice');
    this.playBtn = document.querySelector('.play-btn');

    // This will hold Guessing Number
    this.guessNum;

    // Initially hide the mic Icon
    this.icon.style.display = 'none';
  }

  playGame() {
    // Display the mic Icon
    this.icon.style.display = 'block';
    // Generate the guessing number
    this.guessNum = parseInt(Math.random() * (100 - 1 + 1) + 1);
    //  Start the speech API
    recognition.start();
    // Tell user to guess a number between a range
    this.guessBetween.textContent = 'Guess a number between 1 and 100';
    // Tell user to speak into the microphone
    this.speakInto.textContent = 'Speak into the Microphone of your device';
    // Hide the play button
    this.playBtn.style.display = 'none';
    /* These two fields are initially hidden but are displayed in the onresults
    function, so when the user wins and wants to play again we hide these fields */
    this.result.style.display = 'none';
    this.advice.style.display = 'none';
  }
}

// New Object
const gameClass = new mainClass();

// Event on the Play button
gameClass.playBtn.addEventListener('click', () => {
  gameClass.playGame();
});

/* Initially User has not Won */
let win = false;

recognition.onend = function () {
  /* If the user has not won then start the API again */
  if (!win) {
    recognition.start();
  }
};

// Do the following when result comes
recognition.onresult = function (e) {
  // Get the result
  let result = event.results[0][0].transcript;

  // Display both of these fields
  gameClass.result.style.display = 'inline-block';
  gameClass.advice.style.display = 'block';

  // Display the result
  gameClass.result.textContent = result;

  /* If the result is a finite number then do the following */
  if (isFinite(result)) {
    /* The API returns the input in string format so here we are
    changing it to int */
    result = parseInt(result);

    /* If the result is = to the guess number then the user has won */
    if (result === gameClass.guessNum) {
      /* Since the user won so win = true */
      win = true;
      gameClass.icon.style.display = 'none';
      gameClass.guessBetween.textContent = 'Congratulations! You Win!';
      gameClass.speakInto.textContent = 'The number was:';
      // gameClass.result.textContent = gameClass.guessNum;
      gameClass.playBtn.textContent = 'Play Again';
      gameClass.playBtn.style.display = 'block';
      gameClass.advice.style.display = 'none';

      /* Do the following if the result is lower than the guess number */
    } else if (result > gameClass.guessNum && result <= 100) {
      gameClass.speakInto.textContent = 'You Said:';
      gameClass.advice.textContent = 'Guess Lower';

      /* Do the following if the result is higher than the guess number */
    } else if (result < gameClass.guessNum && result <= 100) {
      gameClass.speakInto.textContent = 'You Said:';
      gameClass.advice.textContent = 'Guess Higher';

      /* Do the following if the result out of range */
    } else if (result > 100) {
      gameClass.speakInto.textContent = 'You Said:';
      gameClass.advice.textContent = 'The Number Must be between 1 and 100!';
    }

    /* If the result is not a finite number then do the following */
  } else {
    gameClass.speakInto.textContent = 'You Said:';
    gameClass.advice.textContent = 'This is not a valid number!';
  }
};
