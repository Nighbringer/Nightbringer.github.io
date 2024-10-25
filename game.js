const characters = ['Cinnamoroll', 'Cappuccino', 'Chiffon', 'Milk', 'Mocha', 'Hello Kitty'];
const images = [
    'images/cinnamoroll.png',
    'images/cappuccino.png',
    'images/chiffon.png',
    'images/milk.png',
    'images/mocha.png',
    'images/hello_kitty.png',
];
let cardValues = [...images, ...images];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let pairsFound = 0;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    shuffle(cardValues);
    const gameBoard = document.getElementById('game-board');

    cardValues.forEach((value) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', value);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');
    this.innerHTML = `<img src="${this.getAttribute('data-value')}" alt="Cinnamoroll" />`;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    if (firstCard.innerHTML === secondCard.innerHTML) {
        pairsFound++;
        resetBoard();
        if (pairsFound === characters.length) {
            setTimeout(() => alert('Parabéns! Você encontrou todos os pares!'), 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.innerHTML = '';
            secondCard.innerHTML = '';
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

document.getElementById('reset-button').addEventListener('click', () => {
    document.getElementById('game-board').innerHTML = '';
    pairsFound = 0;
    createBoard();
});

createBoard();
// Adiciona variáveis para os sons
const acertoSound = new Audio('sons/acerto.mp3');
const erroSound = new Audio('sons/erro.mp3');

// Modifica a função checkForMatch para tocar os sons
function checkForMatch() {
    if (firstCard.innerHTML === secondCard.innerHTML) {
        pairsFound++;
        acertoSound.play(); // Toca som de acerto
        resetBoard();
        if (pairsFound === characters.length) {
            setTimeout(() => alert('Parabéns! Você encontrou todos os pares!'), 500);
        }
    } else {
        erroSound.play(); // Toca som de erro
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.innerHTML = '';
            secondCard.innerHTML = '';
            resetBoard();
        }, 1000);
    }
}
cardValues.forEach((value) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-value', value);

    // Adicionar a parte de trás da carta
    card.innerHTML = `
        <div class="card-back" style="background-image: url('images/card-back.png');"></div>
        <div class="card-front" style="display: none;">
            <img src="${value}" alt="Cinnamoroll" />
        </div>
    `;
    
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
});
