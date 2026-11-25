/**
 * NEXUS GAMING - PONG LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pongCanvas');
    const ctx = canvas.getContext('2d');
    const statusDisplay = document.getElementById('status');
    const startBtn = document.getElementById('start-btn');

    let gameActive = false;
    let animationId;

    // Game objects
    const player = { x: 20, y: 150, width: 10, height: 100, color: '#00f0ff', score: 0 };
    const cpu = { x: 570, y: 150, width: 10, height: 100, color: '#ff003c', score: 0, speed: 4 };
    const ball = { x: 300, y: 200, radius: 8, speed: 5, velocityX: 5, velocityY: 5, color: '#fff' };

    function drawRect(x, y, w, h, color) {
        ctx.fillStyle = color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = color;
        ctx.fillRect(x, y, w, h);
        ctx.shadowBlur = 0;
    }

    function drawCircle(x, y, r, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI*2, false);
        ctx.closePath();
        ctx.fill();
    }

    function drawNet() {
        for(let i = 0; i <= canvas.height; i+=15) {
            drawRect(canvas.width/2 - 1, i, 2, 10, 'rgba(255,255,255,0.2)');
        }
    }

    function render() {
        ctx.fillStyle = '#0a0a0f';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        drawNet();
        drawRect(player.x, player.y, player.width, player.height, player.color);
        drawRect(cpu.x, cpu.y, cpu.width, cpu.height, cpu.color);
        drawCircle(ball.x, ball.y, ball.radius, ball.color);
    }

    function collision(b, p) {
        b.top = b.y - b.radius;
        b.bottom = b.y + b.radius;
        b.left = b.x - b.radius;
        b.right = b.x + b.radius;
        
        p.top = p.y;
        p.bottom = p.y + p.height;
        p.left = p.x;
        p.right = p.x + p.width;
        
        return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
    }

    function resetBall() {
        ball.x = canvas.width/2;
        ball.y = canvas.height/2;
        ball.velocityX = -ball.velocityX;
        ball.speed = 5;
    }

    function update() {
        if (!gameActive) return;

        ball.x += ball.velocityX;
        ball.y += ball.velocityY;
        
        // Simple CPU AI
        cpu.y += ((ball.y - (cpu.y + cpu.height/2))) * 0.1;

        if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
            ball.velocityY = -ball.velocityY;
        }

        let playerOrCpu = (ball.x < canvas.width/2) ? player : cpu;

        if(collision(ball, playerOrCpu)) {
            let collidePoint = ball.y - (playerOrCpu.y + playerOrCpu.height/2);
            collidePoint = collidePoint / (playerOrCpu.height/2);
            let angleRad = (Math.PI/4) * collidePoint;
            let direction = (ball.x < canvas.width/2) ? 1 : -1;
            
            ball.velocityX = direction * ball.speed * Math.cos(angleRad);
            ball.velocityY = ball.speed * Math.sin(angleRad);
            
            ball.speed += 0.5;
        }

        if(ball.x - ball.radius < 0) {
            cpu.score++;
            statusDisplay.innerHTML = `Player: ${player.score} | CPU: ${cpu.score}`;
            resetBall();
        } else if(ball.x + ball.radius > canvas.width) {
            player.score++;
            statusDisplay.innerHTML = `Player: ${player.score} | CPU: ${cpu.score}`;
            resetBall();
        }
    }

    function gameLoop() {
        update();
        render();
        if(gameActive) animationId = requestAnimationFrame(gameLoop);
    }

    canvas.addEventListener('mousemove', (e) => {
        let rect = canvas.getBoundingClientRect();
        player.y = e.clientY - rect.top - player.height/2;
    });

    startBtn.addEventListener('click', () => {
        gameActive = true;
        player.score = 0;
        cpu.score = 0;
        statusDisplay.innerHTML = `Player: 0 | CPU: 0`;
        startBtn.textContent = "Restart Game";
        resetBall();
        cancelAnimationFrame(animationId);
        gameLoop();
    });

    render();
});
