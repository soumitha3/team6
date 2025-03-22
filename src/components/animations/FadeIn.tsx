
import React from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from './useScrollAnimation';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
  duration?: number;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  className,
  delay = 0,
  direction = 'up',
  threshold = 0.1,
  duration = 0.6,
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold });

  const getDirectionStyles = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return 'translate-y-10 opacity-0';
        case 'down':
          return '-translate-y-10 opacity-0';
        case 'left':
          return 'translate-x-10 opacity-0';
        case 'right':
          return '-translate-x-10 opacity-0';
        case 'none':
          return 'opacity-0';
        default:
          return 'translate-y-10 opacity-0';
      }
    }
    return 'translate-y-0 translate-x-0 opacity-100';
  };

  return (
    <div
      ref={ref}
      className={cn(
        getDirectionStyles(),
        'transition-all',
        className
      )}
      style={{ 
        transitionDuration: `${duration}s`, 
        transitionDelay: `${delay}s` 
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
