/**
 * NEXUS GAMING - DINO RUNNER
 */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('dinoCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const startBtn = document.getElementById('start-btn');

    let gameActive = false;
    let frames = 0;
    let score = 0;
    let animationId;
    let gameSpeed = 5;

    const dino = {
        x: 50,
        y: 150,
        width: 30,
        height: 30,
        originalHeight: 30,
        duckHeight: 15,
        velocity: 0,
        gravity: 0.6,
        jumpPower: -10,
        isJumping: false,
        isDucking: false,
        
        draw() {
            ctx.font = this.isDucking ? '30px Arial' : '40px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            // Add a little bobbing animation if running
            let bobY = 0;
            if(!this.isJumping && gameActive) {
                bobY = (frames % 20 < 10) ? -2 : 0;
            }
            ctx.save();
            ctx.translate(this.x + this.width / 2, this.y + bobY - 5);
            ctx.scale(-1, 1); // Flips the T-Rex to face right
            ctx.fillText('🦖', 0, 0);
            ctx.restore();
        },
        update() {
            if (this.isJumping) {
                this.velocity += this.gravity;
                this.y += this.velocity;
            }
            if (this.y >= 150) {
                this.y = 150;
                this.isJumping = false;
                this.velocity = 0;
            }
            if(this.isDucking && !this.isJumping) {
                this.height = this.duckHeight;
                this.y = 150 + (this.originalHeight - this.duckHeight);
            } else {
                this.height = this.originalHeight;
            }
        },
        jump() {
            if (!this.isJumping) {
                this.isJumping = true;
                this.velocity = this.jumpPower;
            }
        }
    };

    const obstacles = {
        items: [],
        draw() {
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            for (let i = 0; i < this.items.length; i++) {
                let obs = this.items[i];
                if(obs.type === 'cactus') {
                    ctx.font = '30px Arial';
                    ctx.fillText('🌵', obs.x - 5, obs.y - 5);
                } else {
                    ctx.font = '25px Arial';
                    let wingFlap = (frames % 20 < 10) ? '🦇' : '🦅'; // Fake pterodactyl animation
                    ctx.fillText(wingFlap, obs.x - 5, obs.y - 5);
                }
            }
        },
        update() {
            if (frames % 100 === 0) {
                let type = Math.random();
                if(type > 0.5) {
                    // Cactus (Ground)
                    this.items.push({ x: canvas.width, y: 150, width: 20, height: 30, type: 'cactus' });
                } else {
                    // Pterodactyl (Flying)
                    this.items.push({ x: canvas.width, y: 120, width: 30, height: 15, type: 'bird' });
                }
            }
            
            for (let i = 0; i < this.items.length; i++) {
                let obs = this.items[i];
                obs.x -= gameSpeed;

                // Collision
                if (dino.x < obs.x + obs.width &&
                    dino.x + dino.width > obs.x &&
                    dino.y < obs.y + obs.height &&
                    dino.height + dino.y > obs.y) {
                    gameOver();
                }

                if (obs.x + obs.width <= 0) {
                    this.items.shift();
                    i--;
                    score += 10;
                    scoreElement.textContent = score;
                    if(score % 100 === 0) gameSpeed += 0.5;
                }
            }
        },
        reset() {
            this.items = [];
        }
    };

    function drawGround() {
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.beginPath();
        ctx.moveTo(0, 180);
        ctx.lineTo(canvas.width, 180);
        ctx.stroke();
    }

    function gameOver() {
        gameActive = false;
        cancelAnimationFrame(animationId);
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '30px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2 - 10);
        ctx.font = '20px Orbitron';
        ctx.fillText(`Final Score: ${score}`, canvas.width/2, canvas.height/2 + 30);
    }

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGround();
        
        if (gameActive) {
            dino.update();
            obstacles.update();
            frames++;
            animationId = requestAnimationFrame(loop);
        }
        
        dino.draw();
        obstacles.draw();
    }

    document.addEventListener('keydown', (e) => {
        if (!gameActive) return;
        if (e.code === 'Space' || e.code === 'ArrowUp') {
            e.preventDefault();
            dino.jump();
        } else if (e.code === 'ArrowDown') {
            e.preventDefault();
            dino.isDucking = true;
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.code === 'ArrowDown') {
            dino.isDucking = false;
        }
    });

    startBtn.addEventListener('click', () => {
        gameActive = true;
        score = 0;
        frames = 0;
        gameSpeed = 5;
        scoreElement.textContent = score;
        dino.y = 150;
        dino.velocity = 0;
        dino.isJumping = false;
        obstacles.reset();
        startBtn.textContent = "Restart Game";
        cancelAnimationFrame(animationId);
        loop();
    });

    dino.draw();
    drawGround();
});
