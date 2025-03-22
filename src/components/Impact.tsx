
import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import FadeIn from './animations/FadeIn';
import { useScrollAnimation } from './animations/useScrollAnimation';
import { cn } from '@/lib/utils';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  image: string;
  active: boolean;
  onClick: () => void;
}

const Testimonial: React.FC<TestimonialProps> = ({ 
  quote, author, role, image, active, onClick 
}) => {
  return (
    <div 
      className={cn(
        "transition-all duration-500 bg-white dark:bg-white/5 rounded-2xl p-6 cursor-pointer border",
        active 
          ? "opacity-100 scale-100 border-primary/30 shadow-lg" 
          : "opacity-50 scale-95 hover:opacity-80 border-transparent"
      )}
      onClick={onClick}
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
        ))}
      </div>
      
      <blockquote className="text-lg mb-6">"{quote}"</blockquote>
      
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img 
            src={image} 
            alt={author} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium">{author}</h4>
          <p className="text-sm text-foreground/70">{role}</p>
        </div>
      </div>
    </div>
  );
};

interface StatProps {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

const Stat: React.FC<StatProps> = ({ value, label, suffix = "", delay = 0 }) => {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    if (isVisible) {
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const duration = 2000;
        
        // Ease out cubic: 1 - (1 - x)^3
        const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
        
        // Calculate the current count based on the easing function
        const percentage = Math.min(progress / duration, 1);
        const easedPercentage = easeOut(percentage);
        const currentCount = Math.floor(value * easedPercentage);
        
        setCount(currentCount);
        
        if (progress < duration) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };
      
      // Delay the start of the animation
      setTimeout(() => {
        animationFrame = requestAnimationFrame(animate);
      }, delay);
    }
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, value, delay]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-bold mb-2 text-primary">
        {count}{suffix}
      </div>
      <div className="text-foreground/70">{label}</div>
    </div>
  );
};

const Impact: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const testimonials = [
    {
      quote: "This platform transformed how we track and improve student performance. The interface is beautiful and intuitive.",
      author: "Sarah Johnson",
      role: "Principal, Lincoln High School",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
    {
      quote: "The analytics tools have given us insights we never had before. Our student engagement has improved dramatically.",
      author: "David Chen",
      role: "Education Director, Future Academy",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
    {
      quote: "The elegant design makes complex data accessible to all our staff. It's been a game-changer for our institution.",
      author: "Amelia Rodriguez",
      role: "Technology Coordinator, Westview College",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="impact" className="section bg-gradient-to-b from-secondary/20 to-background">
      <FadeIn>
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Impact
          </div>
          <h2 className="section-title">
            Real-World Results
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            See how our solutions are making a difference in educational institutions around the world.
          </p>
        </div>
      </FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
        <Stat value={40} label="Improvement in Student Performance" suffix="%" delay={0} />
        <Stat value={200} label="Schools Benefited" suffix="+" delay={300} />
        <Stat value={5000} label="Students Tracked & Supported" suffix="+" delay={600} />
      </div>
      
      <FadeIn className="mb-16">
        <h3 className="text-2xl font-bold text-center mb-10">What Our Users Say</h3>
      </FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Testimonial
            key={index}
            quote={testimonial.quote}
            author={testimonial.author}
            role={testimonial.role}
            image={testimonial.image}
            active={index === activeTestimonial}
            onClick={() => setActiveTestimonial(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Impact;
