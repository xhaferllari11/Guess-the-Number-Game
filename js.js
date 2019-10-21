const game = {
    title: 'Guess the Number!',
    biggestNum: 100,
    smallestNum: 1,
    secretNum: null,
    prevGuesses: [],
    play: function() {
        do {
            this.smallestNum = parseInt(prompt('Enter samllest number'));
        } while (isNaN(this.smallestNum));
        do {         
            this.biggestNum = parseInt(prompt('Enter biggest number'));
        } while (isNaN(this.biggestNum) || this.biggestNum<=this.smallestNum);
        this.secretNum = Math.floor(Math.random() * 
        (this.biggestNum - this.smallestNum + 1)) + this.smallestNum;
        console.log(this.secretNum);
        do  {
            var currentGuess = this.getGuess();
            this.prevGuesses.push(currentGuess);
            console.log(currentGuess);
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
            alert(`Your guess is too ${guessDirection}
            Previous guesses: ${this.prevGuesses.join(', ')}`);
            return true;
        }
    }
  };
  
  game.play();
  