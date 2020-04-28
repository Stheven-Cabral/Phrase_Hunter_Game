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
const keyUpKeys = ['KeyA', 'KeyB','KeyC','KeyD','KeyE','KeyF','KeyG','KeyH','KeyI','KeyJ','KeyK','KeyL','KeyM','KeyN','KeyO','KeyP','KeyQ','KeyR','KeyS','KeyT','KeyU','KeyV','KeyW','KeyX','KeyY','KeyZ'];
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
   and the button code matches the text of an onscreen keyboard button, the `handleInteraction` method is called on the matched onscreen key.
 * The pressed physical keyboard button code is pushed to the `usedKeyUpKeys` array.
 */
document.addEventListener('keyup', (e) => {
    if (game.activePhrase !== null) {
        const onscreenKeys = document.querySelectorAll('.key');
        if (keyUpKeys.includes(e.code) === true && usedKeyUpKeys.includes(e.code) === false) {
            for (let i = 0; i < onscreenKeys.length; i += 1) {
                if (e.code[3].toLowerCase() === onscreenKeys[i].innerText) {
                    game.handleInteraction(onscreenKeys[i]);
                }
            }
        }
        if (usedKeyUpKeys.includes(e.code) === false) {
            usedKeyUpKeys.push(e.code);
        }
    }
});
