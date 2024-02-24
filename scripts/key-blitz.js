let isGamePlayOn = false; // tracks if game play is on or not to play audio source

const artBoard = document.getElementById('art-board');
const textElement = document.getElementById('text');

let timeOutId; 

// capture keyboard capture
document.addEventListener('keyup', handleKeyboardButtonPress);

function handleKeyboardButtonPress(e) {
    // check if game play is not on, then do not play audio source
    if (isGamePlayOn === false) {
        return;
    }

    const pressedKey = e.key;

    // stop game if 'Esc' is pressed
    if (pressedKey === 'Escape') {
        gameOver();
    }

    // get the expected key to press
    const currentAlphabetElement = document.getElementById('current-alphabet');
    const currentAlphabet = currentAlphabetElement.innerText;
    const expectedAlphabet = currentAlphabet.toLowerCase();

    // check the key pressed and expected key to press matched or not
    if (pressedKey === expectedAlphabet) {
        handleCorrectKeyPress(expectedAlphabet);

        // continue the game
        continueGame();
    }
    else if (pressedKey !== expectedAlphabet && pressedKey !== 'Escape') {
        handleWrongKeyPress();
    }
}

function handleCorrectKeyPress(alphabet) {
    // play audio for right key pressed
    playAudio('../audio/success.mp3');

    // update score
    const currentScore = getElementValueById('current-score');
    updatedScore = currentScore + 1;
    setInnerTextById('current-score', updatedScore);

    // reset the last randomly generated alphabet highlight
    removeBgColorById(alphabet);
}

function handleWrongKeyPress() {
    // play audio for wrong key pressed
    playAudio('../audio/wrong.mp3');

    const currentLife = getElementValueById('current-life');
    updatedLife = currentLife - 1;
    setInnerTextById('current-life', updatedLife);

    // life loss alert
    const currentLifePercentage = (updatedLife / 3) * 100;
    artBoard.style.background = `linear-gradient(#FFFFFF33 ${currentLifePercentage}%, #F88379)`;

    // game over if no more life left
    if (updatedLife === 0) {
        gameOver();
    }
}

function continueGame() {
    // generate a random alphabet
    const alphabet = getRandomAlphabet();

    // set randomly generated alphabet to screen
    setInnerTextById('current-alphabet', alphabet);

    // set background color of the generated alphabet
    setBgColorById(alphabet);
}

function play() {
    // if play button is clicked, then change the value of game play so that audios play for pressed keys
    isGamePlayOn = true;

    // hide everything and show playground
    hideElementById('homepage');
    hideElementById('game-over');
    showElementById('playground');

    // reset score and life
    setInnerTextById('current-life', 3);
    setInnerTextById('current-score', 0);

    // continue the game
    continueGame();
    interChangeText();
}

function gameOver() {
    // if game closed or no life left, then change the value of game play so that audios don't play for pressed keys 
    isGamePlayOn = false;

    // hide playground and show game over
    hideElementById('playground');
    showElementById('game-over');

    // show game score
    const gameScore = getElementValueById('current-score');
    setInnerTextById('game-score', gameScore);

    // reset the last randomly generated alphabet highlight
    const lastAlphabet = getElementTextById('current-alphabet');
    removeBgColorById(lastAlphabet);

    // reset the life loss alert
    artBoard.style.background = `linear-gradient(#FFFFFF33 100%, #F88379)`;

    // reset time out
    clearTimeout(timeOutId);
}

function home() {
    // hide everything and show homepage
    hideElementById('playground');
    hideElementById('game-over');
    showElementById('homepage');
}

function muteUnmute() {
    audio.muted = !audio.muted;

    // show tooltip based on audio muted or not
    let tooltip = document.querySelector('.tooltip');
    if (audio.muted) {
        tooltip.dataset.tip = 'Unmute';
    }
    else {
        tooltip.dataset.tip = 'Mute';
    }
}

function interChangeText() {
    const text1 = "Don't watch keyboard while playing...";
    const text2 = 'Press the Esc key to quit the game.';

    // if game play on, check the current text and interchange
    if (textElement.innerText === text1) {
        textElement.innerText = text2;
    }
    else {
        textElement.innerText = text1;
    }

    // call the function again after 5000 milliseconds (5 seconds)
    timeOutId = setTimeout(interChangeText, 5000);
}