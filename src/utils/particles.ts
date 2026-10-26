import confetti from 'canvas-confetti';

// Launch romantic heart and rose petal celebration
export const fireRomanticCelebration = () => {
  const duration = 4.5 * 1000;
  const animationEnd = Date.now() + duration;

  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 80,
    zIndex: 100,
    disableForReducedMotion: true,
  };

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);

    // Left bloom
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#FFD6E7', '#FF8FB8', '#DCD6FF', '#A99AEF', '#FFF8FC', '#FFAECB'],
      shapes: ['circle'],
      scalar: randomInRange(0.8, 1.4),
    });

    // Right bloom
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#FF8FB8', '#FFB8D6', '#DCD6FF', '#FFF8FC', '#E11D48'],
      shapes: ['circle'],
      scalar: randomInRange(0.8, 1.4),
    });
  }, 350);
};

// Subtle heart sparkle burst for clicked bubbles or buttons
export const fireHeartSparkle = (xPercent: number, yPercent: number) => {
  confetti({
    particleCount: 18,
    angle: 90,
    spread: 70,
    origin: { x: xPercent, y: yPercent },
    colors: ['#FF8FB8', '#FFD6E7', '#DCD6FF', '#FFF8FC'],
    ticks: 45,
    startVelocity: 15,
    scalar: 0.9,
    disableForReducedMotion: true,
  });
};
