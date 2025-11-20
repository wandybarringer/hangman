var startButtonEl = document.querySelector('.start');
var blanksEl = document.querySelector('.blanks');

// TODO: create an array of words to guess
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

startButtonEl.addEventListener('click', function () {
  // determining the word to play
  var index = Math.floor(Math.random() * pokemonNames.length);
  chosenWord = pokemonNames[index];
  addBlanks();
  console.log(chosenWord);

  // When a user presses a letter key, the user's guess should be captured as a key event.
  // When a user correctly guesses a letter, the corresponding blank "_" should be replaced by the letter. For example, if the user correctly selects "a", then "a _ _ a _" should appear.
  // TODO: create a function that listens to keydown events and replaces any blanks with the letter if it is correct
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
  });
});

// the game is timed.
// TODO: create a timer that starts at 10

// win the game when I have guessed all the letters in the word.
// lose the game when the timer runs out before I have guessed all the letters.
// When a user wins or loses a game, a message should appear and the timer should stop.
// TODO: create a function that determines winning conditions based on letters guessed or losing conditions based on timer

// see total wins and losses on the screen.
// TODO: track wins and loses, append to DOM

// When a user refreshes or returns to the brower page, the win and loss counts should persist.
// TODO: save score to local storage
