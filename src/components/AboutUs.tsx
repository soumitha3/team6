import React from 'react';
import FadeIn from './animations/FadeIn';
import StaggeredFade from './animations/StaggeredFade';
import myImage from "../Images/about_logo.png";
const AboutUs: React.FC = () => {
  return (
    <section id="about" className="section bg-gradient-to-b from-background to-secondary/20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <FadeIn className="order-2 lg:order-1" delay={0.2}>
          <div className="chip mb-4 inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-lg font-semibold">
            About Ishanya
          </div>
          
          <h2 className="section-title text-3xl font-bold">
            “ISHANYA” - A Pathway to Education, Knowledge & Prosperity
          </h2>
          
          <p className="text-lg text-foreground/70 mb-6">
            Ishanya India Foundation (IIF) is a Centre for Individuals with Special Needs started in 2015, with the intent to make society more inclusive.
          </p>
          
          <StaggeredFade
  className="space-y-4 mb-8"
  baseDelay={0.3}
  incrementDelay={0.15}
  direction="left"
>
  {[
    <div className="flex items-start gap-3" key="vision">
      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
        <div className="w-2 h-2 rounded-full bg-primary"></div>
      </div>
      <div>
        <h3 className="font-medium text-foreground">Our Vision</h3>
        <p className="text-foreground/70">
          To create a society built on Diversity, Equity & Inclusion for Persons with Disabilities.
        </p>
      </div>
    </div>,

    <div className="flex items-start gap-3" key="mission">
      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
        <div className="w-2 h-2 rounded-full bg-primary"></div>
      </div>
      <div>
        <h3 className="font-medium text-foreground">Our Mission</h3>
        <p className="text-foreground/70">
          Build agency and advocacy for the Disability sector by capacity building, inclusive learning spaces, and person-centric solutions.
        </p>
      </div>
    </div>,

    <div className="flex items-start gap-3" key="inclusion">
      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
        <div className="w-2 h-2 rounded-full bg-primary"></div>
      </div>
      <div>
        <h3 className="font-medium text-foreground">Promoting Inclusion</h3>
        <p className="text-foreground/70">
          Creating opportunities, ensuring freedom of choice, and fostering independence for Persons with Disabilities.
        </p>
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
        <img src={myImage} alt="My Image" className="w-full h-full object-cover opacity-90 rounded-2xl" />
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
