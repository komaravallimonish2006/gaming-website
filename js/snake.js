/**
 * NEXUS GAMING - SNAKE LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const startBtn = document.getElementById('start-btn');

    const gridSize = 20;
    const tileCount = canvas.width / gridSize;
    
    let snake = [];
    let food = {};
    let dx = 0;
    let dy = 0;
    let score = 0;
    let gameLoop;
    let gameActive = false;

    function initGame() {
        snake = [
            { x: 10, y: 10 },
            { x: 9, y: 10 },
            { x: 8, y: 10 }
        ];
        dx = 1;
        dy = 0;
        score = 0;
        scoreElement.textContent = score;
        gameActive = true;
        placeFood();
        startBtn.textContent = "Restart Game";
        
        if (gameLoop) clearInterval(gameLoop);
        gameLoop = setInterval(update, 150); // Increased from 100ms to 150ms to reduce speed
    }

    function placeFood() {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        // Ensure food is not on snake
        snake.forEach(part => {
            if (part.x === food.x && part.y === food.y) {
                placeFood();
            }
        });
    }

    function update() {
        if (!gameActive) return;
        
        // Move snake
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        
        // Wall collision (wrap around or die, let's do die)
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
            gameOver();
            return;
        }

        // Self collision
        for (let i = 0; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                gameOver();
                return;
            }
        }

        snake.unshift(head);

        // Food collision
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreElement.textContent = score;
            placeFood();
        } else {
            snake.pop();
        }

        draw();
    }

    function draw() {
        // Clear canvas
        ctx.fillStyle = '#0a0a0f';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw food (Glowing Energy Core)
        let foodX = food.x * gridSize + gridSize / 2;
        let foodY = food.y * gridSize + gridSize / 2;
        
        ctx.beginPath();
        ctx.arc(foodX, foodY, gridSize/2 - 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ff003c';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#ff003c';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(foodX, foodY, gridSize/4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff'; // White inner core
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw snake connected body
        if (snake.length > 0) {
            ctx.beginPath();
            ctx.strokeStyle = '#00f0ff';
            ctx.lineWidth = gridSize - 4;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#00f0ff';
            
            ctx.moveTo(snake[0].x * gridSize + gridSize/2, snake[0].y * gridSize + gridSize/2);
            for(let i = 1; i < snake.length; i++) {
                ctx.lineTo(snake[i].x * gridSize + gridSize/2, snake[i].y * gridSize + gridSize/2);
            }
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Draw Head (Bright White Core with Cyberpunk Eyes)
            let headX = snake[0].x * gridSize + gridSize/2;
            let headY = snake[0].y * gridSize + gridSize/2;
            
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#00f0ff';
            ctx.beginPath();
            ctx.arc(headX, headY, (gridSize-4)/2 + 2, 0, Math.PI*2);
            ctx.fill();
            
            // Draw cyberpunk 'eyes'
            ctx.fillStyle = '#0a0a0f'; // Dark eyes
            ctx.shadowBlur = 0;
            ctx.save();
            ctx.translate(headX, headY);
            if (dx === 1) { ctx.rotate(0); } // Right
            else if (dx === -1) { ctx.rotate(Math.PI); } // Left
            else if (dy === -1) { ctx.rotate(-Math.PI / 2); } // Up
            else if (dy === 1) { ctx.rotate(Math.PI / 2); } // Down
            
            // Draw angular eyes facing forward
            ctx.fillRect(2, -6, 4, 3);
            ctx.fillRect(2, 3, 4, 3);
            ctx.restore();
        }
    }

    function gameOver() {
        gameActive = false;
        clearInterval(gameLoop);
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = '#ff003c';
        ctx.font = '30px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2);
    }

    document.addEventListener('keydown', (e) => {
        if (!gameActive) return;
        switch(e.key) {
            case 'ArrowUp':
                if (dy === 0) { dx = 0; dy = -1; }
                break;
            case 'ArrowDown':
                if (dy === 0) { dx = 0; dy = 1; }
                break;
            case 'ArrowLeft':
                if (dx === 0) { dx = -1; dy = 0; }
                break;
            case 'ArrowRight':
                if (dx === 0) { dx = 1; dy = 0; }
                break;
        }
    });

    startBtn.addEventListener('click', initGame);
    
    // Initial draw
    draw();
});
