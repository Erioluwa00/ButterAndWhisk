import React, { useEffect, useRef } from 'react';

export const FlourParticles = ({ count = 60, speedFactor = 0.5, color = '250, 247, 242' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const mouse = { x: -1000, y: -1000, radius: 120 };

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      initParticles();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2.5 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 20) + 10;
        this.vx = (Math.random() - 0.5) * speedFactor;
        this.vy = (Math.random() * 0.8 + 0.2) * speedFactor;
        this.opacity = Math.random() * 0.5 + 0.15;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
        ctx.shadowBlur = this.radius * 2;
        ctx.shadowColor = `rgba(${color}, 0.2)`;
        ctx.fill();
      }

      update() {
        // Fall down
        this.y += this.vy;
        this.x += this.vx;

        // Wrap around borders
        if (this.y > canvas.height) {
          this.y = -5;
          this.x = Math.random() * canvas.width;
        }
        if (this.x < 0 || this.x > canvas.width) {
          this.vx = -this.vx;
        }

        // Mouse collision (repulsion)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = mouse.radius;
          const force = (maxDistance - distance) / maxDistance;
          const directionX = forceDirectionX * force * this.density * 0.6;
          const directionY = forceDirectionY * force * this.density * 0.6;

          this.x -= directionX;
          this.y -= directionY;
        }
      }
    }

    const initParticles = () => {
      particles = [];
      const actualCount = Math.min(count, Math.floor((canvas.width * canvas.height) / 15000));
      for (let i = 0; i < actualCount; i++) {
        particles.push(new Particle());
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleScroll = () => {
      // Temporarily speed up particles on scroll
      particles.forEach(p => {
        p.y += (Math.random() * 2) * speedFactor;
      });
    };

    window.addEventListener('resize', resizeCanvas);
    canvas.parentElement.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    resizeCanvas();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      if (canvas.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
        canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, speedFactor, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};
