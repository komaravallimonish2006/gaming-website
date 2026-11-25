/**
 * NEXUS GAMING - WORD GUESSING LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const statusDisplay = document.getElementById('status');
    const restartBtn = document.getElementById('restart-btn');

    // A small word list for demonstration
    const wordList = ['GAMES', 'NEXUS', 'LASER', 'RETRO', 'PIXEL', 'SPACE', 'ALIEN', 'BOARD', 'CHESS', 'SCORE'];
    let targetWord = "";
    
    let currentRow = 0;
    let currentTile = 0;
    let gameActive = true;
    
    // Create 6 rows of 5 tiles
    function initBoard() {
        grid.innerHTML = '';
        for (let r = 0; r < 6; r++) {
            const row = document.createElement('div');
            row.classList.add('wordle-row');
            row.id = `row-${r}`;
            for (let c = 0; c < 5; c++) {
                const tile = document.createElement('div');
                tile.classList.add('wordle-tile');
                tile.id = `tile-${r}-${c}`;
                row.appendChild(tile);
            }
            grid.appendChild(row);
        }
    }

    function startGame() {
        targetWord = wordList[Math.floor(Math.random() * wordList.length)];
        currentRow = 0;
        currentTile = 0;
        gameActive = true;
        statusDisplay.innerHTML = "Guess the 5-letter word!";
        initBoard();
    }

    function handleKeyPress(e) {
        if (!gameActive) return;

        if (e.key === 'Backspace') {
            if (currentTile > 0) {
                currentTile--;
                const tile = document.getElementById(`tile-${currentRow}-${currentTile}`);
                tile.textContent = '';
            }
        } else if (e.key === 'Enter') {
            if (currentTile === 5) {
                checkGuess();
            } else {
                statusDisplay.innerHTML = "Word must be 5 letters!";
                setTimeout(() => { if(gameActive) statusDisplay.innerHTML = "Guess the 5-letter word!"; }, 1500);
            }
        } else if (/^[a-zA-Z]$/.test(e.key)) {
            if (currentTile < 5) {
                const tile = document.getElementById(`tile-${currentRow}-${currentTile}`);
                tile.textContent = e.key.toUpperCase();
                currentTile++;
            }
        }
    }

    function checkGuess() {
        const guess = [];
        for (let i = 0; i < 5; i++) {
            guess.push(document.getElementById(`tile-${currentRow}-${i}`).textContent);
        }
        
        const guessString = guess.join('');
        let targetArr = targetWord.split('');
        
        // First pass: correct
        for (let i = 0; i < 5; i++) {
            const tile = document.getElementById(`tile-${currentRow}-${i}`);
            if (guess[i] === targetArr[i]) {
                tile.classList.add('tile-correct');
                targetArr[i] = null;
            }
        }
        
        // Second pass: present
        for (let i = 0; i < 5; i++) {
            const tile = document.getElementById(`tile-${currentRow}-${i}`);
            if (!tile.classList.contains('tile-correct')) {
                const index = targetArr.indexOf(guess[i]);
                if (index > -1) {
                    tile.classList.add('tile-present');
                    targetArr[index] = null;
                } else {
                    tile.classList.add('tile-absent');
                }
            }
        }

        if (guessString === targetWord) {
            statusDisplay.innerHTML = "<span style='color:#538d4e'>You won!</span>";
            gameActive = false;
            return;
        }

        currentRow++;
        currentTile = 0;

        if (currentRow >= 6) {
            statusDisplay.innerHTML = `Game Over! Word was: <span style="color:var(--secondary-neon)">${targetWord}</span>`;
            gameActive = false;
        }
    }

    document.addEventListener('keydown', handleKeyPress);
    restartBtn.addEventListener('click', startGame);

    startGame();
});
