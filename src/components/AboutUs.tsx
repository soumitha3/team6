
import React from 'react';
import FadeIn from './animations/FadeIn';
import StaggeredFade from './animations/StaggeredFade';

const AboutUs: React.FC = () => {
  return (
    <section id="about" className="section bg-gradient-to-b from-background to-secondary/20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <FadeIn className="order-2 lg:order-1" delay={0.2}>
          <div className="chip mb-4 inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            About Us
          </div>
          
          <h2 className="section-title">
            Empowering Education with AI-Driven Insights
          </h2>
          
          <p className="text-lg text-foreground/70 mb-6">
            We believe in data-driven learning for better student outcomes. Our platform combines elegant design with powerful analytics to transform how educational institutions operate.
          </p>
          
          <StaggeredFade
            className="space-y-4 mb-8"
            baseDelay={0.3}
            incrementDelay={0.15}
            direction="left"
          >
            {[
              <div className="flex items-start gap-3" key="design">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Human-Centered Design</h3>
                  <p className="text-foreground/70">Creating intuitive interfaces that simplify complex information.</p>
                </div>
              </div>,
              
              <div className="flex items-start gap-3" key="data">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Data-Driven Decisions</h3>
                  <p className="text-foreground/70">Leveraging analytics to improve educational outcomes.</p>
                </div>
              </div>,
              
              <div className="flex items-start gap-3" key="innovation">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Continuous Innovation</h3>
                  <p className="text-foreground/70">Always refining our approach based on research and feedback.</p>
                </div>
              </div>
            ]}
          </StaggeredFade>
          
          <a href="#programs" className="primary-btn inline-block hover:scale-105 transition-transform duration-300">
            Explore Our Programs
          </a>
        </FadeIn>
        
        <FadeIn direction="left" className="order-1 lg:order-2" delay={0.4}>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-tr from-primary/20 to-primary/5 overflow-hidden glass-card hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80')] bg-cover bg-center opacity-90"></div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-xl bg-primary/10 -z-10 animate-pulse"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-xl bg-primary/10 -z-10 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutUs;
