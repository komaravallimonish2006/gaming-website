/**
 * NEXUS GAMING - TIC-TAC-TOE LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.ttt-cell');
    const statusDisplay = document.getElementById('status');
    const resetBtn = document.getElementById('reset-btn');
    
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    function handleCellPlayed(clickedCell, clickedCellIndex) {
        board[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
    }
    
    function handlePlayerChange() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.innerHTML = `Player <span style="color:var(--${currentPlayer === 'X' ? 'primary' : 'secondary'}-neon)">${currentPlayer}</span>'s Turn`;
    }
    
    function handleResultValidation() {
        let roundWon = false;
        let winLine = [];
        
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = board[winCondition[0]];
            let b = board[winCondition[1]];
            let c = board[winCondition[2]];
            
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                winLine = winCondition;
                break;
            }
        }
        
        if (roundWon) {
            statusDisplay.innerHTML = `Player <span style="color:var(--${currentPlayer === 'X' ? 'primary' : 'secondary'}-neon)">${currentPlayer}</span> Wins!`;
            gameActive = false;
            
            // Highlight winning cells
            winLine.forEach(index => {
                cells[index].classList.add('win-cell');
            });
            return;
        }
        
        let roundDraw = !board.includes('');
        if (roundDraw) {
            statusDisplay.innerHTML = 'Game ended in a Draw!';
            gameActive = false;
            return;
        }
        
        handlePlayerChange();
    }
    
    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        if (board[clickedCellIndex] !== '' || !gameActive) {
            return;
        }
        
        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }
    
    function handleRestartGame() {
        gameActive = true;
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        statusDisplay.innerHTML = `Player <span style="color:var(--primary-neon)">X</span>'s Turn`;
        
        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('x', 'o', 'win-cell');
        });
    }
    
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetBtn.addEventListener('click', handleRestartGame);
});
