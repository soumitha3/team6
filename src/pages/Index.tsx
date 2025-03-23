
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import Programs from '@/components/Programs';
import Impact from '@/components/Impact';
import Team from '@/components/Team';
import Contact from '@/components/Contact';

import ScaleIn from '@/components/animations/ScaleIn';

const Index = () => {
  // Smooth scroll to section when clicking on anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (
        anchor && 
        anchor.hash && 
        anchor.hash.startsWith('#') && 
        document.querySelector(anchor.hash)
      ) {
        e.preventDefault();
        
        const section = document.querySelector(anchor.hash);
        if (section) {
          const offsetTop = section.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <ScaleIn duration={0.8} scale={0.95}>
          <Hero />
        </ScaleIn>
        <AboutUs />
        <Programs />
        <Impact />
        <Team />
        <Contact />
      </main>
      
    </div>
  );
};

export default Index;
