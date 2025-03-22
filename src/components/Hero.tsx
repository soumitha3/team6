
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background to-transparent opacity-80"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-primary/10 filter blur-3xl animate-spin-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 filter blur-3xl animate-spin-slow" style={{ animationDelay: '-4s' }}></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 pt-20 text-center z-10">
        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
          Welcome to elegantUX
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight md:leading-tight lg:leading-tight animate-slide-down" style={{ animationDelay: '0.1s' }}>
          Minimalist Design<br />
          <span className="text-primary">Maximum Impact</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/70 mb-10 animate-slide-down" style={{ animationDelay: '0.2s' }}>
          We believe in data-driven learning for better student outcomes through elegant, intuitive interfaces that simplify complex information.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-slide-down" style={{ animationDelay: '0.3s' }}>
          <a href="#programs" className="primary-btn">
            Explore Programs
          </a>
          <a href="#about" className="secondary-btn">
            Learn More
          </a>
        </div>
      </div>
      
      <a 
        href="#about" 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-10 h-10 flex items-center justify-center rounded-full glass animate-bounce"
        style={{ animationDuration: '2s' }}
      >
        <ArrowDown className="h-5 w-5 text-primary" />
      </a>
    </section>
  );
};

export default Hero;
