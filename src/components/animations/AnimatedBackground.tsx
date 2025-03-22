
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'gradient' | 'particles' | 'wave';
  intensity?: 'subtle' | 'medium' | 'strong';
  color1?: string;
  color2?: string;
  color3?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  className,
  variant = 'gradient',
  intensity = 'subtle',
  color1 = 'rgba(59, 130, 246, 0.1)', // blue-500 with 0.1 opacity
  color2 = 'rgba(139, 92, 246, 0.1)', // purple-500 with 0.1 opacity
  color3 = 'rgba(236, 72, 153, 0.1)', // pink-500 with 0.1 opacity
}) => {
  const intensityValue = {
    subtle: { duration: '15s', scale: '1.05' },
    medium: { duration: '10s', scale: '1.1' },
    strong: { duration: '5s', scale: '1.2' },
  }[intensity];

  const getBackgroundStyles = () => {
    switch (variant) {
      case 'gradient':
        return {
          background: `linear-gradient(-45deg, ${color1}, ${color2}, ${color3}, ${color1})`,
          backgroundSize: '400% 400%',
          animation: `gradient-animation ${intensityValue.duration} ease infinite`,
        };
      case 'particles':
        return {
          position: 'relative',
          overflow: 'hidden',
        };
      case 'wave':
        return {
          position: 'relative',
          overflow: 'hidden',
        };
      default:
        return {};
    }
  };

  return (
    <div
      className={cn('relative', className)}
      style={getBackgroundStyles() as React.CSSProperties}
    >
      {variant === 'particles' && (
        <div className="absolute inset-0 z-0">
          <div className="particles">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  '--x': `${Math.random() * 100}%`,
                  '--y': `${Math.random() * 100}%`,
                  '--size': `${Math.random() * 2 + 0.5}px`,
                  '--duration': `${Math.random() * 20 + 10}s`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      )}
      {variant === 'wave' && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="wave" 
            style={{ 
              animationDuration: intensityValue.duration 
            }}
          />
          <div className="wave" 
            style={{ 
              animationDuration: `${parseInt(intensityValue.duration) * 1.5}s`,
              animationDelay: '0.5s',
              opacity: 0.5
            }}
          />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedBackground;
