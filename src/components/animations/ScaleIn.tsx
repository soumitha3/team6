
import React from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from './useScrollAnimation';

interface ScaleInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  duration?: number;
  scale?: number;
}

const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  duration = 0.6,
  scale = 0.9,
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold });

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all',
        isVisible ? 'opacity-100 scale-100' : `opacity-0 scale-[${scale}]`,
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

export default ScaleIn;
