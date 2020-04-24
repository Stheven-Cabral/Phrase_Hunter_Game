/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
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

     getRandomPhrase() {
        const randomNum = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomNum];
     }

     startGame() {
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

         const overlay = document.getElementById('overlay');
         overlay.style.visibility = 'hidden';
         this.activePhrase = this.getRandomPhrase();

         const chosenPhrase = new Phrase(this.activePhrase.phrase);
         chosenPhrase.addPhraseToDisplay();
     }

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
      * Checks for winning move
      * @return {boolean} True if game has been won, false if game wasn't won
      */

     checkForWin() {
         const numHiddenLetters = document.querySelectorAll('li[class="hide letter"]');
         if (numHiddenLetters.length > 0) {
             return false;
         } else {
             return true;
         }
     }

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