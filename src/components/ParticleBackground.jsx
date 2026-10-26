import React, { useEffect, useRef } from 'react';

/**
 * Romantic Particle Background
 * Creates an elegant atmosphere with twinkling stars, soft floating copper dust,
 * and delicate glowing hearts drifting upwards gently.
 */
export default function ParticleBackground({ reducedMotion = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Particle types: Stars (twinkling), Dust (copper bokeh), Hearts (floating upward)
    let stars = [];
    let dust = [];
    let hearts = [];

    const initParticles = () => {
      // Star count based on screen size
      const starCount = Math.floor((width * height) / 10000);
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.3,
        alpha: Math.random(),
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        color: Math.random() > 0.4 ? '#fbf7ee' : '#e5b38d'
      }));

      // Copper dust bokeh
      const dustCount = Math.floor(width < 768 ? 16 : 30);
      dust = Array.from({ length: dustCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        alpha: Math.random() * 0.3 + 0.1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: Math.random() > 0.5 ? 'rgba(216, 150, 105,' : 'rgba(179, 57, 75,'
      }));

      // Subtle rising hearts
      const heartCount = Math.floor(width < 768 ? 8 : 14);
      hearts = Array.from({ length: heartCount }, () => createHeart(true));
    };

    const createHeart = (initial = false) => ({
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + 20,
      size: Math.random() * 9 + 6,
      speedY: Math.random() * 0.45 + 0.25,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
      wobbleAmp: Math.random() * 20 + 10,
      wobbleOffset: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.28 + 0.08,
      rotation: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.4 ? 'rgba(216, 150, 105,' : 'rgba(140, 37, 53,'
    });

    const drawHeart = (x, y, size, alpha, color, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = `${color} ${alpha})`;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      // top left curve
      ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      // bottom left curve
      ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size);
      // bottom right curve
      ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      // top right curve
      ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    initParticles();

    if (reducedMotion) {
      // Just draw static frame
      ctx.clearRect(0, 0, width, height);
      stars.forEach((s) => {
        ctx.fillStyle = s.color;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      return;
    }

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Twinkling Stars
      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed;
        const currentAlpha = 0.2 + (Math.sin(star.alpha) + 1) * 0.4;
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.9, currentAlpha));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Copper/Wine Dust Bokeh
      dust.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;

        if (d.x < 0) d.x = width;
        if (d.x > width) d.x = 0;
        if (d.y < 0) d.y = height;
        if (d.y > height) d.y = 0;

        ctx.fillStyle = `${d.color} ${d.alpha})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw Gentle Rising Hearts
      hearts.forEach((h, index) => {
        h.y -= h.speedY;
        const wobbleX = h.x + Math.sin(frame * h.wobbleSpeed + h.wobbleOffset) * h.wobbleAmp;

        drawHeart(wobbleX, h.y, h.size, h.alpha, h.color, h.rotation);

        if (h.y < -30) {
          hearts[index] = createHeart(false);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.88
      }}
      aria-hidden="true"
    />
  );
}
