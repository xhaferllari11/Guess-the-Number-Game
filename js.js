var minElement = document.querySelector('.min');
var maxElement = document.querySelector('.max');
var startButton = document.querySelector('button');
var previousNumsIntro = document.querySelector('.previousNumsIntro');
var previousNums = document.querySelector('.previousNums');


const game = {
    title: 'Guess the Number!',
    biggestNum: 100,
    smallestNum: 1,
    secretNum: null,
    prevGuesses: [],
    play: function() {
        // need to work on this because text input is comeing back NaN
        do {
            this.smallestNum = parseInt(minElement.value);
            console.log(this.smallestNum);
        } while (false);
            //isNaN(this.smallestNum));
        do {         
            this.biggestNum = parseInt(maxElement.value);
        } while (false);
            //isNaN(this.biggestNum) || this.biggestNum<=this.smallestNum);
        this.secretNum = Math.floor(Math.random() * 
        (this.biggestNum - this.smallestNum + 1)) + this.smallestNum;
        do  {
            var currentGuess = this.getGuess();
            this.prevGuesses.push(currentGuess);
        } while (this.render(currentGuess));
    },
    getGuess: function() {
        do {
            var guess = parseInt(prompt(`Enter a guess between ${this.smallestNum} and ${this.biggestNum}`));
        } while (isNaN(guess) || guess > this.biggestNum || guess<this.smallestNum);
        return guess;
    },
    render: function(currentGuess) {
        if (currentGuess === this.secretNum) {
            alert(`Congrats! You guessed the number in ${this.prevGuesses.length} guesses!`);
            return false;
        } else {
            let guessDirection =  (currentGuess>this.secretNum) ? 'high' : 'low';
            previousNumsIntro.innerHTML = `Your last guess was too ${guessDirection}. Guess again between ${this.smallestNum} to ${this.biggestNum}.`;
            previousNums.innerHTML = `Previous guesses: ${this.prevGuesses.join(', ')}`;

            //alert(`Your guess is too ${guessDirection}
            //Previous guesses: ${this.prevGuesses.join(', ')}`);
            return true;
        }
    }
};


//need to change so when game.play is called from a button, this refers to game object not button element
startButton.addEventListener("click", game.play.bind(game));
//game.play();
