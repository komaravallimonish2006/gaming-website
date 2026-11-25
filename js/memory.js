/**
 * NEXUS GAMING - MEMORY MATCH LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('memory-grid');
    const movesDisplay = document.getElementById('moves');
    const restartBtn = document.getElementById('restart-btn');

    const icons = [
        'fa-ghost', 'fa-gamepad', 'fa-rocket', 'fa-meteor',
        'fa-robot', 'fa-space-awesome', 'fa-jedi', 'fa-dragon'
    ];
    let cardsArray = [...icons, ...icons];
    
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let moves = 0;
    let matches = 0;

    function shuffle() {
        cardsArray.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        grid.innerHTML = '';
        shuffle();
        cardsArray.forEach(icon => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.icon = icon;

            card.innerHTML = `
                <div class="card-front">
                    <i class="fa-solid fa-question"></i>
                </div>
                <div class="card-back">
                    <i class="fa-solid ${icon}" style="color:var(--secondary-neon); text-shadow:0 0 10px var(--secondary-neon);"></i>
                </div>
            `;
            
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        moves++;
        movesDisplay.textContent = moves;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.icon === secondCard.dataset.icon;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        matches++;
        
        if(matches === icons.length) {
            setTimeout(() => alert(`You won in ${moves} moves!`), 500);
        }
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    restartBtn.addEventListener('click', () => {
        moves = 0;
        matches = 0;
        movesDisplay.textContent = moves;
        createBoard();
    });

    createBoard();
});
