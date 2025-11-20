var startButtonEl = document.querySelector('.start');
var blanksEl = document.querySelector('.blanks');
var winsEl = document.querySelector('#wins');
var lossesEl = document.querySelector('#losses');
var timerEl = document.querySelector('#seconds-remaining');
var resetEl = document.querySelector('.reset');
var hardEl = document.querySelector('#hard');
var normalEl = document.querySelector('#normal');
var easyEl = document.querySelector('#easy');

// TODO: create an array of words to guess ✅
var pokemonNames = [
  'pikachu',
  'charizard',
  'bulbasaur',
  'squirtle',
  'jigglypuff',
  'gengar',
  'eevee',
  'snorlax',
  'lucario',
  'greninja',
];

var chosenWord;
var blanks;
var letters;
var secondsLeft = 0;
var difficulty = 'normal';

// TODO: create difficulty function ✅
function difficultySelection() {
  hardEl.addEventListener('click', function () {
    difficulty = 'hard';
  });
  normalEl.addEventListener('click', function () {
    difficulty = 'normal';
  });
  easyEl.addEventListener('click', function () {
    difficulty = 'easy';
  });
}

// TODO: Call scores from local storage so they are displayed on refresh ✅
// assigning wins and losses to what is store in local storage, or setting to zero if there's nothing in local storage
var wins = localStorage.getItem('wins') || 0;
var losses = localStorage.getItem('losses') || 0;

// start the game by clicking on a button.
// try and guess a word by filling in a number of blanks that match the number of letters in that word.
// When a user clicks the start button, the timer should reset.
// TODO: create an event listener for start button - starts timer and tracks user's key inputs
// TODO: when the button is clicked, a random word from the array is chosen and the number of _'s should match the word
function addBlanks() {
  //   turns the word into an array of letters making it easier to iterate over to determin the blanks
  letters = chosenWord.split('');
  //   getting the amount of blanks
  var numBlanks = letters.length;
  //   created a blanks array to store the number of blanks in
  blanks = [];
  // adding the number of blanks (numBlanks) to the blanks array as _'s by iterating
  for (var i = 0; i < numBlanks; i++) {
    blanks.push('_');
  }
  //   creating a string of _'s using the blanks array and adding a space to seperate each char
  displayedBlanks = blanks.join(' ');
  blanksEl.textContent = displayedBlanks;
}

// see total wins and losses on the screen.
// TODO: track wins and loses, append to DOM ✅
function addWinLoss() {
  winsEl.textContent = wins;
  lossesEl.textContent = losses;
}

// TODO: reset the timer to 0 ✅
// win the game when I have guessed all the letters in the word.
// lose the game when the timer runs out before I have guessed all the letters.
// When a user wins or loses a game, a message should appear and the timer should stop.
// TODO: create a function that determines winning conditions based on letters guessed or losing conditions based on timer ✅
// the game is timed.
// TODO: create a timer that starts at 10 ✅
function timer() {
  var timerInterval = setInterval(function () {
    secondsLeft--;

    if (blanks.join('') === letters.join('')) {
      clearInterval(timerInterval);
      blanksEl.textContent = 'YOU WIN!';
      wins++;
      //   re-enables the start button
      startButtonEl.disabled = false;
    } else if (secondsLeft === 0) {
      clearInterval(timerInterval);
      //   Forces white space on CSS to add a line break
      blanksEl.style.whiteSpace = 'pre-line';
      blanksEl.textContent = 'YOU LOSE! \nAnswer: ' + chosenWord;
      losses++;
      startButtonEl.disabled = false;
    }
    timerEl.textContent = secondsLeft;
    addWinLoss();
    // When a user refreshes or returns to the brower page, the win and loss counts should persist.
    // TODO: save score to local storage
    localStorage.setItem('wins', wins);
    localStorage.setItem('losses', losses);
  }, 1000);
}

// When a user presses a letter key, the user's guess should be captured as a key event.
// When a user correctly guesses a letter, the corresponding blank "_" should be replaced by the letter. For example, if the user correctly selects "a", then "a _ _ a _" should appear.
// TODO: create a function that listens to keydown events and replaces any blanks with the letter if it is correct ✅
function checkKeys() {
  document.addEventListener('keydown', function (event) {
    console.log(event.key);
    // TODO: figure out how to find the index of the letter key pressed in the chosenWord and replace it on the blanks ✅
    // iterates through the string and compares the letters (index) to the key pressed
    // then assigns blanks corresponding index to the key
    for (i = 0; i < chosenWord.length; i++) {
      if (chosenWord[i] === event.key) {
        blanks[i] = event.key;
      }
    }
    // re-appending the blanks string to the html with the space seperators
    blanksEl.textContent = blanks.join(' ');
    console.log(blanks);
    console.log(letters);
  });
}

function play() {
  startButtonEl.addEventListener('click', function () {
    // edge case: user clicks button multiple times, which increases the interval
    startButtonEl.disabled = true;
    // starting at 10 seconds left
    if (difficulty === 'hard') {
      secondsLeft = 5;
    } else if (difficulty === 'normal') {
      secondsLeft = 10;
    } else {
      secondsLeft = 20;
    }
    timerEl.textContent = secondsLeft;
    // determining the word to play
    var index = Math.floor(Math.random() * pokemonNames.length);
    chosenWord = pokemonNames[index];
    addBlanks();
    checkKeys();
    timer();

    console.log(letters);
    console.log(blanks);
  });
}

// TODO: Reset button to clears wins ✅
function reset() {
  resetEl.addEventListener('click', function () {
    wins = 0;
    losses = 0;
    winsEl.textContent = wins;
    lossesEl.textContent = losses;
    localStorage.setItem('wins', wins);
    localStorage.setItem('losses', losses);
  });
}

difficultySelection();
addWinLoss();
play();
reset();
