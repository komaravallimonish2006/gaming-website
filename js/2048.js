/**
 * NEXUS GAMING - 2048 LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.getElementById('grid');
    const scoreDisplay = document.getElementById('score');
    const restartBtn = document.getElementById('restart-btn');
    
    let squares = [];
    let score = 0;
    
    function createBoard() {
        gridDisplay.innerHTML = '';
        squares = [];
        for (let i = 0; i < 16; i++) {
            let square = document.createElement('div');
            square.className = 'grid-cell';
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
        updateBoard();
    }
    
    function generate() {
        let emptySquares = squares.filter(sq => sq.innerHTML == 0);
        if (emptySquares.length === 0) return;
        let randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        randomSquare.innerHTML = 2;
    }
    
    function updateBoard() {
        for (let i = 0; i < 16; i++) {
            squares[i].className = 'grid-cell';
            let val = parseInt(squares[i].innerHTML);
            if (val > 0) {
                squares[i].classList.add('tile-' + val);
            } else {
                squares[i].innerHTML = '';
            }
        }
    }
    
    function moveRight() {
        let moved = false;
        for (let i = 0; i < 16; i += 4) {
            let row = [
                parseInt(squares[i].innerHTML) || 0,
                parseInt(squares[i+1].innerHTML) || 0,
                parseInt(squares[i+2].innerHTML) || 0,
                parseInt(squares[i+3].innerHTML) || 0
            ];
            
            let filteredRow = row.filter(num => num);
            let missing = 4 - filteredRow.length;
            let zeros = Array(missing).fill(0);
            let newRow = zeros.concat(filteredRow);
            
            for (let j = 0; j < 4; j++) {
                if((parseInt(squares[i+j].innerHTML)||0) !== newRow[j]) moved = true;
                squares[i+j].innerHTML = newRow[j];
            }
        }
        return moved;
    }
    
    function moveLeft() {
        let moved = false;
        for (let i = 0; i < 16; i += 4) {
            let row = [
                parseInt(squares[i].innerHTML) || 0,
                parseInt(squares[i+1].innerHTML) || 0,
                parseInt(squares[i+2].innerHTML) || 0,
                parseInt(squares[i+3].innerHTML) || 0
            ];
            
            let filteredRow = row.filter(num => num);
            let missing = 4 - filteredRow.length;
            let zeros = Array(missing).fill(0);
            let newRow = filteredRow.concat(zeros);
            
            for (let j = 0; j < 4; j++) {
                if((parseInt(squares[i+j].innerHTML)||0) !== newRow[j]) moved = true;
                squares[i+j].innerHTML = newRow[j];
            }
        }
        return moved;
    }
    
    function moveDown() {
        let moved = false;
        for (let i = 0; i < 4; i++) {
            let col = [
                parseInt(squares[i].innerHTML) || 0,
                parseInt(squares[i+4].innerHTML) || 0,
                parseInt(squares[i+8].innerHTML) || 0,
                parseInt(squares[i+12].innerHTML) || 0
            ];
            
            let filteredCol = col.filter(num => num);
            let missing = 4 - filteredCol.length;
            let zeros = Array(missing).fill(0);
            let newCol = zeros.concat(filteredCol);
            
            for (let j = 0; j < 4; j++) {
                if((parseInt(squares[i+(j*4)].innerHTML)||0) !== newCol[j]) moved = true;
                squares[i+(j*4)].innerHTML = newCol[j];
            }
        }
        return moved;
    }
    
    function moveUp() {
        let moved = false;
        for (let i = 0; i < 4; i++) {
            let col = [
                parseInt(squares[i].innerHTML) || 0,
                parseInt(squares[i+4].innerHTML) || 0,
                parseInt(squares[i+8].innerHTML) || 0,
                parseInt(squares[i+12].innerHTML) || 0
            ];
            
            let filteredCol = col.filter(num => num);
            let missing = 4 - filteredCol.length;
            let zeros = Array(missing).fill(0);
            let newCol = filteredCol.concat(zeros);
            
            for (let j = 0; j < 4; j++) {
                if((parseInt(squares[i+(j*4)].innerHTML)||0) !== newCol[j]) moved = true;
                squares[i+(j*4)].innerHTML = newCol[j];
            }
        }
        return moved;
    }
    
    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (i % 4 === 3) continue;
            if (squares[i].innerHTML !== '' && squares[i].innerHTML === squares[i+1].innerHTML) {
                let total = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
                squares[i].innerHTML = total;
                squares[i+1].innerHTML = 0;
                score += total;
                scoreDisplay.innerHTML = score;
            }
        }
    }
    
    function combineCol() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML !== '' && squares[i].innerHTML === squares[i+4].innerHTML) {
                let total = parseInt(squares[i].innerHTML) + parseInt(squares[i+4].innerHTML);
                squares[i].innerHTML = total;
                squares[i+4].innerHTML = 0;
                score += total;
                scoreDisplay.innerHTML = score;
            }
        }
    }
    
    function control(e) {
        if(e.key === 'ArrowRight') {
            moveRight();
            combineRow();
            moveRight();
            generate();
        } else if(e.key === 'ArrowLeft') {
            moveLeft();
            combineRow();
            moveLeft();
            generate();
        } else if(e.key === 'ArrowDown') {
            moveDown();
            combineCol();
            moveDown();
            generate();
        } else if(e.key === 'ArrowUp') {
            moveUp();
            combineCol();
            moveUp();
            generate();
        }
        updateBoard();
        checkForGameOver();
    }
    
    function checkForGameOver() {
        let zeros = 0;
        for(let i=0; i<16; i++) {
            if(squares[i].innerHTML == '') zeros++;
        }
        if(zeros === 0) {
            // Check if any combines are possible
            // Simplified check: just alert game over
            // alert('Game Over!');
            // document.removeEventListener('keydown', control);
        }
    }
    
    document.addEventListener('keydown', control);
    restartBtn.addEventListener('click', () => {
        score = 0;
        scoreDisplay.innerHTML = score;
        createBoard();
    });
    
    createBoard();
});
