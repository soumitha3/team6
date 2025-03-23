import React from 'react';
import { ArrowDown } from 'lucide-react';
import HeroImage from '../Images/kids3.png'; // Add a relevant image

const Hero: React.FC = () => {
  const handleApplyNow = () => {
    window.dispatchEvent(new Event('openApplyNow'));
  };

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 pt-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      
      {/* Left Side - Text Content */}
      <div className="max-w-2xl text-center lg:text-left">
        <div className="inline-block mb-4 px-4 py-2 rounded-full bg-indigo-300/20 text-indigo-700 text-sm font-medium">
          Empowering Every Ability
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-indigo-900">
          Unlock Your Child's <span className="text-indigo-600">Potential</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-6">
          At Ishanya India Foundation, we specialize in individualized programs for children with neurodevelopmental disabilities, fostering growth and integration into society. Our dedicated team works closely with families to nurture each child's unique abilities, ensuring they thrive both personally and socially.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <button onClick={handleApplyNow} className="primary-btn">
            Apply Now
          </button>
          <a href="#programs" className="secondary-btn">
            Explore
          </a>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
        <img 
          src={HeroImage} 
          alt="Child learning with support" 
          className="w-[85%] md:w-[70%] rounded-lg shadow-lg"
        />
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-indigo-300/20 filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-300/20 filter blur-3xl animate-pulse"></div>
      </div>

      {/* Scroll Down Indicator */}
      <a 
        href="#about" 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-indigo-300/20 shadow-lg animate-bounce"
      >
        <ArrowDown className="h-5 w-5 text-indigo-600" />
      </a>
    </section>
  );
};

export default Hero;
