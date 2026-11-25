/**
 * NEXUS GAMING - FLAPPY BIRD CLONE
 */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('flappyCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const startBtn = document.getElementById('start-btn');

    let gameActive = false;
    let frames = 0;
    let score = 0;
    let animationId;

    const bird = {
        x: 50,
        y: 150,
        radius: 12,
        velocity: 0,
        gravity: 0.25,
        jump: -5,
        draw() {
            ctx.font = '28px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            ctx.save();
            ctx.translate(this.x, this.y);
            // Rotate based on velocity
            let rotation = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, (this.velocity * 0.1)));
            ctx.rotate(rotation);
            ctx.fillText('🛸', 0, 0); // Using a UFO since it fits the neon theme!
            ctx.restore();
        },
        update() {
            this.velocity += this.gravity;
            this.y += this.velocity;
            if(this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
                gameOver();
            }
        },
        flap() {
            this.velocity = this.jump;
        }
    };

    const pipes = {
        position: [],
        width: 50,
        gap: 120,
        dx: 3,
        draw() {
            for (let i = 0; i < this.position.length; i++) {
                let p = this.position[i];
                let topY = p.y;
                let bottomY = p.y + this.gap;
                
                ctx.fillStyle = '#ff003c';
                ctx.shadowBlur = 5;
                ctx.shadowColor = '#ff003c';
                
                // Top pipe
                ctx.fillRect(p.x, 0, this.width, topY);
                // Bottom pipe
                ctx.fillRect(p.x, bottomY, this.width, canvas.height - bottomY);
                
                ctx.shadowBlur = 0;
            }
        },
        update() {
            if (frames % 90 === 0) {
                this.position.push({
                    x: canvas.width,
                    y: Math.random() * (canvas.height - this.gap - 100) + 50
                });
            }
            for (let i = 0; i < this.position.length; i++) {
                let p = this.position[i];
                p.x -= this.dx;

                // Collision detection
                if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.width) {
                    if (bird.y - bird.radius < p.y || bird.y + bird.radius > p.y + this.gap) {
                        gameOver();
                    }
                }

                // Score update
                if (p.x === bird.x) {
                    score++;
                    scoreElement.textContent = score;
                }

                // Remove off-screen pipes
                if (p.x + this.width <= 0) {
                    this.position.shift();
                    i--;
                }
            }
        },
        reset() {
            this.position = [];
        }
    };

    function gameOver() {
        gameActive = false;
        cancelAnimationFrame(animationId);
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '30px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2);
    }

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        bird.draw();
        pipes.draw();
        
        if(gameActive) {
            bird.update();
            pipes.update();
            frames++;
            animationId = requestAnimationFrame(loop);
        }
    }

    function flapAction(e) {
        if(e.type === 'keydown' && e.code !== 'Space') return;
        if(e.type === 'keydown') e.preventDefault();
        
        if (gameActive) {
            bird.flap();
        }
    }

    document.addEventListener('keydown', flapAction);
    canvas.addEventListener('mousedown', flapAction);

    startBtn.addEventListener('click', () => {
        gameActive = true;
        score = 0;
        frames = 0;
        scoreElement.textContent = score;
        bird.y = 150;
        bird.velocity = 0;
        pipes.reset();
        startBtn.textContent = "Restart Game";
        cancelAnimationFrame(animationId);
        loop();
    });

    // Initial draw
    bird.draw();
});
