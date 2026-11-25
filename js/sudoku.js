/**
 * NEXUS GAMING - SUDOKU LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const statusDisplay = document.getElementById('status');
    const restartBtn = document.getElementById('restart-btn');
    const checkBtn = document.getElementById('check-btn');

    // A simplified pre-generated board for demonstration
    const solution = [
        5,3,4,6,7,8,9,1,2,
        6,7,2,1,9,5,3,4,8,
        1,9,8,3,4,2,5,6,7,
        8,5,9,7,6,1,4,2,3,
        4,2,6,8,5,3,7,9,1,
        7,1,3,9,2,4,8,5,6,
        9,6,1,5,3,7,2,8,4,
        2,8,7,4,1,9,6,3,5,
        3,4,5,2,8,6,1,7,9
    ];
    
    // 0 means empty
    const puzzle = [
        5,3,0,0,7,0,0,0,0,
        6,0,0,1,9,5,0,0,0,
        0,9,8,0,0,0,0,6,0,
        8,0,0,0,6,0,0,0,3,
        4,0,0,8,0,3,0,0,1,
        7,0,0,0,2,0,0,0,6,
        0,6,0,0,0,0,2,8,0,
        0,0,0,4,1,9,0,0,5,
        0,0,0,0,8,0,0,7,9
    ];

    function createBoard() {
        grid.innerHTML = '';
        for (let i = 0; i < 81; i++) {
            const cell = document.createElement('div');
            cell.classList.add('sudoku-cell');
            
            if (puzzle[i] !== 0) {
                cell.textContent = puzzle[i];
                cell.classList.add('prefilled');
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                input.dataset.index = i;
                input.addEventListener('input', function() {
                    this.value = this.value.replace(/[^1-9]/g, '');
                });
                cell.appendChild(input);
            }
            grid.appendChild(cell);
        }
        statusDisplay.innerHTML = "Fill the grid!";
    }

    function checkAnswers() {
        let isComplete = true;
        let isCorrect = true;
        const inputs = document.querySelectorAll('.sudoku-cell input');
        
        inputs.forEach(input => {
            const index = parseInt(input.dataset.index);
            const val = parseInt(input.value);
            
            if (!val) {
                isComplete = false;
            } else if (val !== solution[index]) {
                isCorrect = false;
                input.style.color = 'var(--secondary-neon)';
                input.style.textShadow = '0 0 10px var(--secondary-neon)';
            } else {
                input.style.color = 'var(--primary-neon)';
                input.style.textShadow = '0 0 10px var(--primary-neon)';
            }
        });

        if (!isCorrect) {
            statusDisplay.innerHTML = "<span style='color:var(--secondary-neon)'>Some answers are wrong!</span>";
        } else if (!isComplete) {
            statusDisplay.innerHTML = "Grid is incomplete!";
        } else {
            statusDisplay.innerHTML = "<span style='color:var(--primary-neon)'>Puzzle Solved!</span>";
        }
    }

    restartBtn.addEventListener('click', createBoard);
    checkBtn.addEventListener('click', checkAnswers);

    createBoard();
});
