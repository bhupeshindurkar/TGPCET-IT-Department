/**
 * ===================================================================
 * TGPCET IT Department - Cyber & Coding Ambient Canvas Engine
 * Developer: Bhupesh Indurkar
 * 
 * Features:
 * - Floating syntax tokens ({ }, </>, =>, async, const, return, git, etc.)
 * - Subtle digital matrix binary rain streams (010101)
 * - Interconnected neural/mesh network nodes with mouse magnetism
 * - Ultra-high performance 60fps with automatic tab visibility pause
 * - Non-intrusive ambient glow optimized for crisp content contrast
 * ===================================================================
 */

(function () {
    'use strict';

    // Prevent double initialization
    if (window.__TECH_BG_INITIALIZED__) return;
    window.__TECH_BG_INITIALIZED__ = true;

    function initTechBackground() {
        // Create canvas if not already present
        let canvas = document.getElementById('tech-bg-canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'tech-bg-canvas';
            canvas.setAttribute('aria-hidden', 'true');
            canvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                pointer-events: none;
                z-index: 0;
                opacity: 0.85;
                transition: opacity 1s ease;
            `;
            // Insert behind everything
            if (document.body) {
                document.body.insertBefore(canvas, document.body.firstChild);
            } else {
                document.addEventListener('DOMContentLoaded', () => {
                    document.body.insertBefore(canvas, document.body.firstChild);
                });
            }
        }

        // Ensure page content has relative z-index above canvas
        const style = document.createElement('style');
        style.id = 'tech-bg-styles';
        style.textContent = `
            #tech-bg-canvas {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100% !important;
                pointer-events: none !important;
                z-index: 0 !important;
            }
            body {
                position: relative;
                background-color: #080d1a !important;
            }
            .top-banner, header, section, footer, .container {
                position: relative;
                z-index: 1;
            }
            .glass-card, .card {
                background: rgba(13, 22, 41, 0.72) !important;
                backdrop-filter: blur(14px) !important;
                -webkit-backdrop-filter: blur(14px) !important;
                border: 1px solid rgba(59, 130, 246, 0.22) !important;
                box-shadow: 0 10px 30px -5px rgba(2, 6, 23, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
            }
            .glass-card:hover, .card:hover {
                border-color: rgba(96, 165, 250, 0.55) !important;
                box-shadow: 0 15px 40px -5px rgba(59, 130, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
            }
        `;
        if (!document.getElementById('tech-bg-styles')) {
            document.head.appendChild(style);
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let dpr = Math.min(window.devicePixelRatio || 1, 2);

        // Tech tokens & symbols to float
        const CODE_TOKENS = [
            '</>', '{ }', '=>', '0101', 'async', 'await', 'const', 'import',
            'return', 'git push', 'TGPCET.IT', 'npm run', 'void', 'Boolean',
            'AI / ML', 'CyberSec', 'Cloud', 'Data', 'SQL', 'fetch()',
            '0x7F', '1011', '[ ]', '===', '&&', '||', 'lambda', 'sudo', 'REST'
        ];

        const MATRIX_CHARS = '0123456789ABCDEF<>{}/*=+~-';

        // Mouse interaction state
        const mouse = {
            x: -1000,
            y: -1000,
            radius: 140,
            active: false
        };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        }, { passive: true });

        window.addEventListener('mouseleave', () => {
            mouse.x = -1000;
            mouse.y = -1000;
            mouse.active = false;
        });

        // Resize handler
        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        }
        window.addEventListener('resize', resize);
        resize();

        // Particle Class (Constellation Nodes + Code Tokens)
        class CodeParticle {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                this.x = Math.random() * width;
                this.y = initial ? Math.random() * height : height + 20;
                this.vx = (Math.random() - 0.5) * 0.45;
                this.vy = -(Math.random() * 0.55 + 0.25); // drift upwards
                this.size = Math.random() * 2 + 1.2;
                this.isToken = Math.random() > 0.65; // ~35% are code tokens
                this.token = CODE_TOKENS[Math.floor(Math.random() * CODE_TOKENS.length)];
                this.fontSize = Math.floor(Math.random() * 4 + 11);
                this.alpha = Math.random() * 0.4 + 0.15;
                this.baseAlpha = this.alpha;
                // Palette: Electric Blue, Cyan, Neon Purple, Emerald
                const colors = [
                    'rgba(59, 130, 246,',  // Blue
                    'rgba(6, 182, 212,',   // Cyan
                    'rgba(139, 92, 246,',  // Purple
                    'rgba(16, 185, 129,'   // Emerald
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Mouse interaction - gentle repulsion & brightening
                if (mouse.active) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius && dist > 0) {
                        const force = (1 - dist / mouse.radius) * 1.5;
                        this.x += (dx / dist) * force;
                        this.y += (dy / dist) * force;
                        this.alpha = Math.min(this.baseAlpha + 0.4, 0.9);
                    } else {
                        if (this.alpha > this.baseAlpha) {
                            this.alpha -= 0.01;
                        }
                    }
                } else if (this.alpha > this.baseAlpha) {
                    this.alpha -= 0.01;
                }

                // Wrap around edges
                if (this.y < -30) this.reset(false);
                if (this.x < -30) this.x = width + 20;
                if (this.x > width + 30) this.x = -20;
            }

            draw() {
                if (this.isToken) {
                    ctx.font = `600 ${this.fontSize}px 'JetBrains Mono', 'Fira Code', 'Courier New', monospace`;
                    ctx.fillStyle = `${this.color}${this.alpha})`;
                    ctx.shadowColor = `${this.color}0.5)`;
                    ctx.shadowBlur = 8;
                    ctx.fillText(this.token, this.x, this.y);
                    ctx.shadowBlur = 0; // reset
                } else {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = `${this.color}${this.alpha})`;
                    ctx.shadowColor = `${this.color}0.6)`;
                    ctx.shadowBlur = 6;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            }
        }

        // Matrix Rain Column Class (Very subtle, ambient in background)
        class MatrixColumn {
            constructor(x) {
                this.x = x;
                this.y = Math.random() * -500;
                this.speed = Math.random() * 1.2 + 0.8;
                this.chars = [];
                this.length = Math.floor(Math.random() * 12 + 6);
                for (let i = 0; i < this.length; i++) {
                    this.chars.push(MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]);
                }
                this.alpha = Math.random() * 0.12 + 0.05; // very subtle
            }

            update() {
                this.y += this.speed;
                if (this.y > height + 200) {
                    this.y = Math.random() * -200 - 50;
                    this.speed = Math.random() * 1.2 + 0.8;
                }
                // Randomly mutate characters
                if (Math.random() < 0.04) {
                    const idx = Math.floor(Math.random() * this.chars.length);
                    this.chars[idx] = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
                }
            }

            draw() {
                ctx.font = `11px 'Courier New', monospace`;
                for (let i = 0; i < this.chars.length; i++) {
                    const charY = this.y + i * 16;
                    if (charY > -20 && charY < height + 20) {
                        // Leading character is brighter
                        if (i === this.chars.length - 1) {
                            ctx.fillStyle = `rgba(56, 189, 248, ${this.alpha * 2.2})`;
                        } else {
                            ctx.fillStyle = `rgba(37, 99, 235, ${this.alpha * (i / this.chars.length)})`;
                        }
                        ctx.fillText(this.chars[i], this.x, charY);
                    }
                }
            }
        }

        // Initialize particles based on screen width
        const particleCount = Math.min(Math.floor(width / 22), 65);
        const particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new CodeParticle());
        }

        // Initialize matrix columns
        const colSpacing = 85;
        const columns = [];
        for (let x = 15; x < width; x += colSpacing) {
            columns.push(new MatrixColumn(x));
        }

        // Connect nearby particles with subtle glowing lines
        function drawMeshConnections() {
            const maxDist = 115;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.16;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
                        ctx.lineWidth = 0.75;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Connect particles to mouse cursor if near
            if (mouse.active) {
                for (let i = 0; i < particles.length; i++) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const alpha = (1 - dist / mouse.radius) * 0.35;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Animation loop
        let isRunning = true;
        let animationFrameId = null;

        function animate() {
            if (!isRunning) return;

            // Clear screen
            ctx.clearRect(0, 0, width, height);

            // Draw subtle matrix streams
            for (let i = 0; i < columns.length; i++) {
                columns[i].update();
                columns[i].draw();
            }

            // Draw particles & tokens
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            // Draw constellation lines
            drawMeshConnections();

            animationFrameId = requestAnimationFrame(animate);
        }

        // Pause animation when tab is not visible to save 100% battery & CPU
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                isRunning = false;
                if (animationFrameId) cancelAnimationFrame(animationFrameId);
            } else {
                isRunning = true;
                animate();
            }
        });

        // Start animation
        animate();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTechBackground);
    } else {
        initTechBackground();
    }
})();
