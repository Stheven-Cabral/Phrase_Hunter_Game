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
         const overlay = document.getElementById('overlay');
         overlay.style.visibility = 'hidden';
         this.activePhrase = this.getRandomPhrase();

         const chosenPhrase = new Phrase(this.activePhrase.phrase);
         chosenPhrase.addPhraseToDisplay();
     }

     handleInteraction(selectedLetter) {
         const chosenPhrase = new Phrase(this.activePhrase.phrase);
         if (chosenPhrase.checkedLetter(selectedLetter) === true) {
             chosenPhrase.showMatchedLetter(selectedLetter);
         }
     }

     checkForWin() {
         const numHiddenLetters = document.querySelectorAll('li[class="hide"]');
         if (numHiddenLetters.length > 0) {
             return false;
         } else {
             return true;
         }

     }

     removeLife() {
        if (this.missed === 5) {
            this.gameOver();
        } else {
            const oneLife = document.querySelector('img[src="images/liveHeart.png"]');
            oneLife.src = 'images/lostHeart.png';
            this.missed += 1
        }
     }

     gameOver() {
         const overlay = document.getElementById('overlay');
         const gameOverMessage = document.getElementById('game-over-message');
         if (this.checkForWin() === true) {
             overlay.style.visibility = 'visible';
             overlay.className = 'win';
             gameOverMessage.textContent = 'YOU WIN!';
         } else {
            overlay.style.visibility = 'visible';
            overlay.className = 'lose';
            gameOverMessage.textContent = 'YOU RAN OUT OF LIVES!';
         }
     }
 }