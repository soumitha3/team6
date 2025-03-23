import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import FadeIn from './animations/FadeIn'; 
import { cn } from '@/lib/utils';

const Testimonial = ({ quote, author, role, image, active, onClick }) => {
  return (
    <div 
      className={cn(
        "transition-all duration-500 bg-white dark:bg-white/5 rounded-2xl p-6 cursor-pointer border hover:scale-105",
        active 
          ? "opacity-100 scale-100 border-primary/30 shadow-xl animate-slideUp"
          : "opacity-50 scale-95 hover:opacity-80 border-transparent"
      )}
      onClick={onClick}
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <blockquote className="text-lg mb-6 text-gray-800 dark:text-gray-200">{quote}</blockquote>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src={image} alt={author} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-medium text-primary dark:text-yellow-400">{author}</h4>
          <p className="text-sm text-foreground/70">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Impact = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    {
      quote: "This platform has helped us stay on top of our child's progress like never before.",
      author: "Maria Gonzalez",
      role: "Parent",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
    {
      quote: "The ability to track both grades and behavioral insights has been a game-changer for us.",
      author: "John Smith",
      role: "Parent",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
    {
      quote: "We've never felt more connected to our child's learning journey. The updates are invaluable.",
      author: "Linda Brown",
      role: "Parent",
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
    <section className="section bg-gradient-to-b from-blue-500/20 to-blue-900/20 py-16">
      <FadeIn>
        <div className="text-center mb-16">
          <h2 className="section-title text-black text-4xl font-bold animate-slideUp">What Parents Say</h2>
        </div>
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
      <style jsx>{`
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Impact;
