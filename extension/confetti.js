const createConfetti = () => {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return null;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
  
    canvas.width = 400;
    canvas.height = 600;
  
    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 10 + 5;
        this.speedY = -Math.random() * 8 - 2;
        this.speedX = Math.random() * 4 - 2;
        this.gravity = 0.1;
        this.opacity = 1;
      }
  
      update() {
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.01;
        return this.opacity > 0;
      }
  
      draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter(particle => {
        const alive = particle.update();
        if (alive) particle.draw();
        return alive;
      });
      if (particles.length > 0) {
        requestAnimationFrame(animate);
      }
    };
  
    return (options = {}) => {
      const colors = options.colors || ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
      const count = options.particleCount || 50;
      const x = (options.origin?.x || 0.5) * canvas.width;
      const y = (options.origin?.y || 0.5) * canvas.height;
  
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
      }
      requestAnimationFrame(animate);
    };
  };
  
  window.confetti = createConfetti();