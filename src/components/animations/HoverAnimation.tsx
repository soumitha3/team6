
import React from 'react';
import { cn } from '@/lib/utils';

interface HoverAnimationProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
  rotate?: number;
  translateY?: number;
  shadow?: boolean;
  color?: boolean;
  border?: boolean;
}

const HoverAnimation: React.FC<HoverAnimationProps> = ({
  children,
  className,
  scale = 1.05,
  rotate = 0,
  translateY = 0,
  shadow = false,
  color = false,
  border = false,
}) => {
  const hoverClasses = cn(
    'transition-all duration-300',
    shadow && 'hover:shadow-lg',
    color && 'hover:bg-primary hover:text-primary-foreground',
    border && 'hover:border-primary',
    className
  );

  const hoverStyle = {
    '--hover-scale': scale,
    '--hover-rotate': `${rotate}deg`,
    '--hover-translate-y': `${translateY}px`,
  } as React.CSSProperties;

  return (
    <div 
      className={hoverClasses}
      style={hoverStyle}
      onMouseEnter={(e) => {
        const target = e.currentTarget;
        target.style.transform = `scale(var(--hover-scale)) rotate(var(--hover-rotate)) translateY(var(--hover-translate-y))`;
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget;
        target.style.transform = 'scale(1) rotate(0deg) translateY(0)';
      }}
    >
      {children}
    </div>
  );
};

export default HoverAnimation;
