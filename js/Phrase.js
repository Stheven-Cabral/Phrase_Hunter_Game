 /***
 * Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * By Stheven Cabral 
 * */


 /***
  * `Phrase` class represents a phrase.
  */
 class Phrase {
     /***
      * Accepts a phrase and sets a `phrase` property.
      */
     constructor(phrase) {
        this.phrase = phrase.toLowerCase();
     }

     /***
      * `addPhraseToDisplay` function - displays the randomly chosen phrase to the gameboard display.
      */
     addPhraseToDisplay() {
         const phraseContainer = document.querySelector('#phrase ul');
         phraseContainer.style.whiteSpace = 'nowrap';
         let phraseDisplayHTML = ``;
         for (let i = 0; i < this.phrase.length; i += 1) {
             if (/[A-Za-z]/.test(this.phrase[i])) {
                 phraseDisplayHTML += `<li class="hide letter">${this.phrase[i]}</li>`;
             } else {
                 phraseDisplayHTML += `<li class="space"></li><li class="space"></li>`;
             }
         }
         phraseContainer.innerHTML = phraseDisplayHTML;
     }


     /***
      * `checkLetter` function - checks if a selected key from the game keyboard is in the `phrase`.
      * @param {string} letter - accepts a letter.
      */
     checkLetter(selectedLetter) {
         if (this.phrase.includes(selectedLetter)) {
             return true;
         } else {
             return false;
         }
     }

     /***
      * `showedMatchedLetter` function - reveals one of the `phrase` letters that matches a player's selection.
      * @param {string} letter - accepts a letter.
      */
     showMatchedLetter(selectedLetter) {
         const phraseLetters = document.querySelectorAll('.letter');
         for (let i = 0; i < phraseLetters.length; i += 1) {
             if (selectedLetter === phraseLetters[i].innerText) {
                 phraseLetters[i].classList.remove('hide');
                 phraseLetters[i].classList.add('show');
             }
         }
     }
 }