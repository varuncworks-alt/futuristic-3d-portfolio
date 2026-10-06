import { useState, useEffect, useRef, useCallback } from 'react';

export function useSmoothScroll(totalChapters = 6) {
  const [progress, setProgress] = useState(0); // 0 to 1
  const [currentChapter, setCurrentChapter] = useState(0);
  const [velocity, setVelocity] = useState(0);

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const lastTime = useRef(performance.now());
  const isDragging = useRef(false);
  const startY = useRef(0);

  // Jump directly to chapter index (0 to totalChapters - 1)
  const jumpToChapter = useCallback((index) => {
    const clamped = Math.max(0, Math.min(totalChapters - 1, index));
    targetProgress.current = clamped / (totalChapters - 1);
  }, [totalChapters]);

  useEffect(() => {
    let animId;

    const onWheel = (e) => {
      e.preventDefault();
      // Sensitivity factor
      const delta = e.deltaY * 0.00065;
      targetProgress.current = Math.max(0, Math.min(1, targetProgress.current + delta));
    };

    const onKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        targetProgress.current = Math.min(1, targetProgress.current + 1 / (totalChapters - 1));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        targetProgress.current = Math.max(0, targetProgress.current - 1 / (totalChapters - 1));
      } else if (e.key === 'Home') {
        e.preventDefault();
        targetProgress.current = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        targetProgress.current = 1;
      }
    };

    // Touch support for mobile
    const onTouchStart = (e) => {
      isDragging.current = true;
      startY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (!isDragging.current) return;
      const deltaY = startY.current - e.touches[0].clientY;
      startY.current = e.touches[0].clientY;
      targetProgress.current = Math.max(0, Math.min(1, targetProgress.current + deltaY * 0.0018));
    };

    const onTouchEnd = () => {
      isDragging.current = false;
    };

    // Smooth animation loop with spring inertia
    const updateLoop = (now) => {
      const dt = Math.min(0.1, (now - lastTime.current) / 1000);
      lastTime.current = now;

      // Exponential damping
      const diff = targetProgress.current - currentProgress.current;
      const step = diff * 0.085;
      currentProgress.current += step;

      const currentVel = Math.abs(diff);
      setVelocity(currentVel);

      setProgress(currentProgress.current);

      // Determine active chapter based on progress
      const exactIndex = Math.round(currentProgress.current * (totalChapters - 1));
      setCurrentChapter(exactIndex);

      animId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      cancelAnimationFrame(animId);
    };
  }, [totalChapters]);

  return {
    progress,
    currentChapter,
    velocity,
    jumpToChapter
  };
}
