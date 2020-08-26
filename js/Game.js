 /***
 * Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * By Stheven Cabral
 */


/***
 * `Game` class represents the game.
 */
 class Game {
     /***
      * Sets a `missed` property that holds the number of missed guesses.
      * Sets a `phrases` property that holds 5 phrase objects in an array.
      * Sets an `activePhrase` property to null. Will hold a randomly chosen phrase.
      */
     constructor() {
         this.missed = 0;
         this.phrases = [
             {phrase: 'once in a blue moon'}, 
             {phrase: 'off the hook'}, 
             {phrase: 'best of both worlds'}, 
             {phrase: 'beat around the bush'}, 
             {phrase: 'hit the road'}
            ];
         this.activePhrase = null;
     }

     /***
      * `getRandomPhrase` method - randomly chooses and returns a phrase from the `phrases` array.
      */
     getRandomPhrase() {
        const randomNum = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomNum];
     }

     /***
      * `startGame` method - hides the overlay, sets the `activePhrase` property to a random phrase.
      * The method instantiates a new Phrase object using the current `activePhrase` and sets it to be displayed using the `addPhraseToDisplay` method.
      * In addition, the method restarts game components after a win or loss.
      */
     startGame() {
         const overlay = document.getElementById('overlay');
         overlay.style.visibility = 'hidden';
         this.activePhrase = this.getRandomPhrase();
         const chosenPhrase = new Phrase(this.activePhrase.phrase);
         chosenPhrase.addPhraseToDisplay();

         const keys = document.querySelectorAll('.key');
         const lives = document.querySelectorAll('.tries img');
         this.missed = 0;
         for (let i = 0; i < keys.length; i += 1) {
            keys[i].classList.remove('chosen');
            keys[i].classList.remove('wrong');
            keys[i].disabled = false;
         }
         for (let l = 0; l < lives.length; l += 1) {
            lives[l].src = 'images/liveHeart.png';
         }
     }

     /***
      * `handleInteraction` method: 
      * - If the phrase includes the guessed letter, the class name `chosen` is added to the selected letter key, and `showMatchedLetter` method is called.
      * - If the phrase does not include the guessed letter, the class name `wrong` is added to the selected letter key and the `removeLife` method is called.
      * - Disables selected game keyboard letters.
      * The `checkForWin` method is called to see if all the letters have been revealed and is set to a variable.
      * The `gameOver` method is called display if a player has won or lost. 
      */
     handleInteraction(letterKey) {
         const selectedLetter = letterKey.innerText;
         const chosenPhrase = new Phrase(this.activePhrase.phrase);
         if (chosenPhrase.checkLetter(selectedLetter) === true) {
             chosenPhrase.showMatchedLetter(selectedLetter);
             letterKey.classList.add('chosen');
         } else {
             this.removeLife();
             letterKey.classList.add('wrong');
         }

         letterKey.disabled = true;
         const check = this.checkForWin();
         this.gameOver(check);
     }

     /***
      * `checkForWin` method - checks if all the letters of the phrase have been revealed.
      * @return {boolean} - true if game has been won, false if game wasn't won.
      */
     checkForWin() {
         const numHiddenLetters = document.querySelectorAll('li[class="hide letter"]');
         if (numHiddenLetters.length > 0) {
             return false;
         } else {
             return true;
         }
     }

     /***
      * `removeLife` method - If missed guesses equals 5, `checkWin` and `gameOver` methods are called.
      * Else, the method removes a life and adds 1 to the `missed' property.
      */
     removeLife() {
        if (this.missed === 5) {
            const check = this.checkForWin();
            this.gameOver(check);
        } else {
            const oneLife = document.querySelector('img[src="images/liveHeart.png"]');
            oneLife.src = 'images/lostHeart.png';
            this.missed += 1;
        }
     }

     /***
      * `gameOver` method - displays the start overlay with either a "win" or "loss" message.
      * The method also assigns either a win or lose class name to the overlay depending on if the player has won or lost.
      */
     gameOver(gameWon) {
         const overlay = document.getElementById('overlay');
         const gameOverMessage = document.getElementById('game-over-message');
         if (gameWon) {
             overlay.style.visibility = 'visible';
             overlay.className = 'win';
             gameOverMessage.textContent = 'YOU WIN!';
         } else if (gameWon === false && this.missed === 5) {
            overlay.style.visibility = 'visible';
            overlay.className = 'lose';
            gameOverMessage.textContent = 'YOU RAN OUT OF LIVES!';
         }
     }
 }