/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

//  Displays the phrase:
// const game = new Game();
// const randomPhrase = game.getRandomPhrase();
// const phrase = new Phrase(randomPhrase.phrase);
// phrase.addPhraseToDisplay();

// starts the game and adds the phrase to display:
// const game = new Game();
// game.startGame();
// console.log(`Active Phrase - phrase: ${game.activePhrase.phrase}`);

let game = new Game();
const resetBtn = document.getElementById('btn__reset');
const keys = document.querySelectorAll('.key');


resetBtn.addEventListener('click', () => {
    game.startGame();
});

for (let i = 0; i < keys.length; i += 1) {
    keys[i].addEventListener('click', (e) => {
        game.handleInteraction(e.target.innerText);
    });
}

