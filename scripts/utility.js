const audio = new Audio();

function hideElementById(id) {
    const element = document.getElementById(id);
    element.classList.add('hidden');
}

function showElementById(id) {
    const element = document.getElementById(id);
    element.classList.remove('hidden');
}

function setBgColorById(id) {
    const element = document.getElementById(id);
    element.classList.add('bg-primary/50', 'animate-bounce');
}

function removeBgColorById(alphabetId) {
    const element = document.getElementById(alphabetId);
    element.classList.remove('bg-primary/50', 'animate-bounce');
}

function setInnerTextById(id, value) {
    const element = document.getElementById(id);
    element.innerText = value;
}

function getElementTextById(id) {
    const element = document.getElementById(id);
    return element.innerText;
}

function getElementValueById(id) {
    const element = document.getElementById(id);
    return parseInt(element.innerText);
}

function getRandomAlphabet() {
    const alphabetString = 'abcdefghijklmnopqrstuvwxyz';
    const alphabets = alphabetString.split('');

    const randomNumber = Math.random() * 25;
    const index = Math.round(randomNumber);

    const alphabet = alphabets[index];
    return alphabet;
}

function playAudio(src) {
    audio.src = src;
    audio.play();
}