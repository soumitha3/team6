
import React, { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from './useScrollAnimation';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  delay?: number;
  threshold?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
  delay = 0,
  threshold = 0.1,
}) => {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold });
  const countStarted = useRef(false);

  useEffect(() => {
    if (isVisible && !countStarted.current) {
      countStarted.current = true;
      
      // Delay the animation if needed
      const timer = setTimeout(() => {
        let startTime: number;
        let animationFrameId: number;
        
        const updateCount = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const elapsedTime = timestamp - startTime;
          
          const progress = Math.min(elapsedTime / (duration * 1000), 1);
          const currentCount = Math.floor(progress * end);
          
          setCount(currentCount);
          
          if (progress < 1) {
            animationFrameId = requestAnimationFrame(updateCount);
          } else {
            setCount(end);
          }
        };
        
        animationFrameId = requestAnimationFrame(updateCount);
        
        return () => {
          cancelAnimationFrame(animationFrameId);
        };
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, end, duration, delay]);

  return (
    <div ref={ref} className={className}>
      {prefix}{count}{suffix}
    </div>
  );
};

export default AnimatedCounter;
