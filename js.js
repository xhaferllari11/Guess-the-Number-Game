const game = {
    title: 'Guess the Number!',
    biggestNum: 100,
    smallestNum: 1,
    secretNum: null,
    prevGuesses: [],
    play: function() {
      this.secretNum = Math.floor(Math.random() * 
        (this.biggestNum - this.smallestNum + 1)) + this.smallestNum;
    },
    getGuess: function() {
      let acceptableGuess = true;
      //while (acceptableGuess) {
        let guess = prompt(`Enter a guess between ${this.smallestNum} and ${this.biggestNum}`);
        console.log(typeof(guess));
      //}
    },
  };
  
  game.getGuess();
  