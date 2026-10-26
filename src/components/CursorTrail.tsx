import React, { useEffect, useState } from 'react';

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const colors = ['#FF8FB8', '#FFD6E7', '#DCD6FF', '#A99AEF', '#FFF8FC'];

export const CursorTrail: React.FC<{ enabled?: boolean }> = ({ enabled = true }) => {
  const [points, setPoints] = useState<TrailPoint[]>([]);

  useEffect(() => {
    if (!enabled) return;

    // Only enable on fine pointer (mouse/trackpad), not touch screens
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let idCounter = 0;
    let throttleTimeout = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (throttleTimeout) return;
      throttleTimeout = true;
      setTimeout(() => {
        throttleTimeout = false;
      }, 40);

      const newPoint: TrailPoint = {
        id: ++idCounter,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setPoints(prev => [...prev.slice(-14), newPoint]);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Clean up expired points
    const interval = setInterval(() => {
      setPoints(prev => prev.filter(p => p.id > idCounter - 15));
    }, 150);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [enabled]);

  if (!enabled || points.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {points.map((pt, i) => {
        const opacity = (i + 1) / points.length;
        return (
          <div
            key={pt.id}
            className="absolute rounded-full transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${pt.x}px`,
              top: `${pt.y}px`,
              width: `${pt.size}px`,
              height: `${pt.size}px`,
              backgroundColor: pt.color,
              opacity: opacity * 0.65,
              boxShadow: `0 0 10px ${pt.color}`,
              filter: 'blur(0.5px)',
            }}
          >
            {/* Tiny mini heart shape center */}
            <span
              className="block w-full h-full text-[8px] leading-none text-center select-none"
              style={{ color: pt.color }}
            >
              ♥
            </span>
          </div>
        );
      })}
    </div>
  );
};
