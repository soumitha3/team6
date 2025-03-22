
import React from 'react';
import { useScrollAnimation } from './useScrollAnimation';

interface StaggeredFadeProps {
  children: React.ReactNode[];
  className?: string;
  baseDelay?: number;
  incrementDelay?: number;
  duration?: number;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

const StaggeredFade: React.FC<StaggeredFadeProps> = ({
  children,
  className = '',
  baseDelay = 0,
  incrementDelay = 0.1,
  duration = 0.6,
  threshold = 0.1,
  direction = 'up',
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold });

  const getDirectionStyles = (visible: boolean) => {
    if (!visible) {
      switch (direction) {
        case 'up':
          return 'translate-y-8 opacity-0';
        case 'down':
          return '-translate-y-8 opacity-0';
        case 'left':
          return 'translate-x-8 opacity-0';
        case 'right':
          return '-translate-x-8 opacity-0';
        case 'none':
          return 'opacity-0';
        default:
          return 'translate-y-8 opacity-0';
      }
    }
    return 'translate-y-0 translate-x-0 opacity-100';
  };

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          className={`transition-all ${getDirectionStyles(isVisible)}`}
          style={{
            transitionDuration: `${duration}s`,
            transitionDelay: `${baseDelay + index * incrementDelay}s`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default StaggeredFade;
