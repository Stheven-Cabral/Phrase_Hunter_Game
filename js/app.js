 /***
 * Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * By Stheven Cabral 
 */


 /***
  * A new game is instantiated for the `Game` class and is set to the variable `game`.
  * `resetBtn` global variable is set to the button element with id `btn__reset`.
  * `keys` global variable captures all on screen keyboard buttons into an array.
  * `keyUpKeys` contains an array of physical keyboard codes.
  * `usedKeyUpKeys` is an empty array meant to hold pressed physical keyboard buttons.
  */
const game = new Game();
const resetBtn = document.getElementById('btn__reset');
const keys = document.querySelectorAll('.key');
const keyUpKeys = ['a', 'b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
let usedKeyUpKeys = [];


/***
 * A click event listener assigned to the `resetBtn` variable. 
 * the `startGame` method is called after a click event.
 * The `usedKeyUpKeys` array is reset to hold no keyboard codes.
 */
resetBtn.addEventListener('click', () => {
    game.startGame();
    usedKeyUpKeys = [];
});


/***
 * A click event listener assigned to all onboard keyboard buttons. 
 * the `handleInteraction` method is called on a target after a click event.
 */
for (let i = 0; i < keys.length; i += 1) {
    keys[i].addEventListener('click', (e) => {
        game.handleInteraction(e.target);
    });
}


/***
 * A keyup event listener assigned to the game. Listens for physical keyboard button presses.
 * Once the game starts, if the physical keyboard button has not already been pressed 
   and the button key matches the text of an onscreen keyboard button, the `handleInteraction` method is called on the matched onscreen key.
 * The pressed keyboard button 'key' property value is pushed to the `usedKeyUpKeys` array.
 */
document.addEventListener('keyup', (e) => {
    if (game.activePhrase !== null) {
        if (keyUpKeys.includes(e.key) === true && usedKeyUpKeys.includes(e.key) === false) {
            for (let i = 0; i < keys.length; i += 1) {
                if (e.key.toLowerCase() === keys[i].innerText && keys[i].disabled !== true) {
                    game.handleInteraction(keys[i]);
                }
            }
        }
        if (usedKeyUpKeys.includes(e.code) === false) {
            usedKeyUpKeys.push(e.code);
        }
    }
});
