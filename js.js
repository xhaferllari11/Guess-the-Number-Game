var minElement = document.querySelector('.mininput');
var maxElement = document.querySelector('.maxinput');
var startButton = document.querySelector('button');
var previousNumsIntro = document.querySelector('.previousNumsIntro');
var previousNums = document.querySelector('.previousNums');
var outputMessages = document.querySelector('.outputmessages');
var guessBox = document.querySelector('.guessbox');

const game = {
    title: 'Guess the Number!',
    biggestNum: 100,
    smallestNum: 1,
    secretNum: null,
    prevGuesses: [],
    play: function() {
        game.secretNum = Math.floor(Math.random() * (game.biggestNum - game.smallestNum + 1)) + game.smallestNum;
    },
    getGuess: function() {
        do {
            var guess = parseInt(prompt(`Enter a guess between ${this.smallestNum} and ${this.biggestNum}`));
        } while (isNaN(guess) || guess > this.biggestNum || guess<this.smallestNum);
        return guess;
    },
    render: function(currentGuess) {
        if (currentGuess === this.secretNum) {
            alert(`Congrats! You guessed the number in ${game.prevGuesses.length} guesses!`);
            return false;
        } else {
            let guessDirection =  (currentGuess>game.secretNum) ? 'HIGH' : 'LOW';
            previousNumsIntro.innerHTML = `Your last guess was too ${guessDirection}. Guess again between ${this.smallestNum} to ${this.biggestNum}.`;
            previousNums.innerHTML = `Previous guesses: ${game.prevGuesses.join(', ')}`;

            //alert(`Your guess is too ${guessDirection}
            //Previous guesses: ${this.prevGuesses.join(', ')}`);
            return true;
        }
    }
};


//need to change so when game.play is called from a button, this refers to game object not button element
startButton.addEventListener('click', startButtonEvent);
//Need to add event listener to initialize game if user presses enter on min or max field

function startButtonEvent(evt) {
    outputMessages.textContent = "";
    game.smallestNum = parseInt(minElement.value);
    game.biggestNum = parseInt(maxElement.value);
    if (isNaN(game.smallestNum)) {
        outputMessages.textContent = `Min digit needs to be a number`;
        return;
    }
    if (isNaN(game.biggestNum)) {
        outputMessages.textContent = `Max digit needs to be a number`;
        return;
    } else if (game.biggestNum<game.smallestNum) {
        outputMessages.textContent = `Max digit needs to be higher than min`;
        return;
    }
    game.play();
    console.log(game.secretNum);
    var direction = document.createElement('h4');
    direction.textContent = 'Enter Guess here:';
    direction.classList.add('enterguess');
    guessBox.appendChild(direction);
    var guessInputBox = document.createElement('input');
    guessInputBox.classList.add('guessinput');
    guessInputBox.setAttribute('type','text');
    guessInputBox.setAttribute('placeholder','Enter Guess');
    guessBox.appendChild(guessInputBox);
    startButton.style.display = 'none';
    guessInputBox.addEventListener('keyup', guessEnterEvent);
    guessInputBox.focus();
};


function guessEnterEvent(evt){
    if (evt.keyCode === 13){
        outputMessages.textContent = "";
        var userGuess = parseInt(evt.target.value);
        if (isNaN(userGuess)) {
            outputMessages.textContent = `Guess must be an integer`;
            return;
        } else if (userGuess>game.biggestNum || userGuess<game.smallestNum){
            outputMessages.textContent = `Guess must an integer from ${game.smallestNum} to ${game.biggestNum}`;
            return;
        }
        game.prevGuesses.push(userGuess);
        game.render(userGuess);
        evt.target.value = "";
    }
}

//Add event handler for user pressing enter on a min/max field or on Guess field


minElement.addEventListener('keyup', minValueEntered)
function minValueEntered(evt){
    if (evt.keyCode === 13 || evt.keyCode === 9){
        outputMessages.textContent = "";
        game.smallestNum = parseInt(minElement.value);
        if (isNaN(game.smallestNum)) {
            outputMessages.textContent = `Min digit needs to be a number`;
            evt.target.focus();
            return;
        }
        maxElement.focus();
    }
}

maxElement.addEventListener('keyup', function(evt) {
    if (evt.keyCode === 13 ){
        startButtonEvent();
    }
});




