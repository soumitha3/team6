
import React from 'react';
import { ChevronRight, BarChart3, Users, Brain, Database } from 'lucide-react';
import FadeIn from './animations/FadeIn';
import { cn } from '@/lib/utils';

interface ProgramCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ title, description, icon, delay }) => {
  return (
    <FadeIn 
      direction="up" 
      delay={delay} 
      className="glass-card rounded-xl p-6 group hover:translate-y-[-5px]"
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-foreground/70 mb-4">{description}</p>
      
      <a 
        href="#" 
        className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
      >
        Read More <ChevronRight className="h-4 w-4 ml-1" />
      </a>
    </FadeIn>
  );
};

const Programs: React.FC = () => {
  const programs = [
    {
      title: "AI-Powered Student Analytics",
      description: "Track student performance with machine learning algorithms that identify patterns and predict outcomes.",
      icon: <BarChart3 className="h-6 w-6" />,
    },
    {
      title: "Collaborative Learning Tools",
      description: "Foster teamwork and communication with our suite of collaborative educational tools.",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Adaptive Learning Pathways",
      description: "Personalized learning experiences that adapt to each student's pace and learning style.",
      icon: <Brain className="h-6 w-6" />,
    },
    {
      title: "Education Data Management",
      description: "Centralized data management system for schools and educational institutions.",
      icon: <Database className="h-6 w-6" />,
    },
  ];

  return (
    <section id="programs" className="section">
      <FadeIn>
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Programs
          </div>
          <h2 className="section-title">
            Transformative Educational Solutions
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Discover our suite of tools designed to enhance educational outcomes through elegant design and powerful analytics.
          </p>
        </div>
      </FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {programs.map((program, index) => (
          <ProgramCard
            key={program.title}
            title={program.title}
            description={program.description}
            icon={program.icon}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default Programs;
