
import React from 'react';
import { Linkedin, Github, Twitter } from 'lucide-react';
import FadeIn from './animations/FadeIn';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  delay: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  image,
  linkedin,
  github,
  twitter,
  delay,
}) => {
  return (
    <FadeIn direction="up" delay={delay} className="group">
      <div className="relative overflow-hidden rounded-xl glass-card p-6">
        <div className="aspect-square w-full mb-4 rounded-lg overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-foreground/70 mb-4">{role}</p>
        
        <div className="flex gap-2 mt-2">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          
          {twitter && (
            <a
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </FadeIn>
  );
};

const Team: React.FC = () => {
  const teamMembers = [
    {
      name: "Alexandra Chen",
      role: "CEO & Design Lead",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
    {
      name: "Michael Rivera",
      role: "CTO & AI Specialist",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      linkedin: "#",
      github: "#",
    },
    {
      name: "Sophia Johnson",
      role: "Education Director",
      image: "https://images.unsplash.com/photo-1584361853901-dd1904bb7987?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "James Wilson",
      role: "Data Science Lead",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      linkedin: "#",
      github: "#",
    },
  ];

  return (
    <section id="team" className="section">
      <FadeIn>
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Team
          </div>
          <h2 className="section-title">
            Meet Our Leadership
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            The experts behind our innovative educational solutions, bringing together design and technology expertise.
          </p>
        </div>
      </FadeIn>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <TeamMember
            key={member.name}
            name={member.name}
            role={member.role}
            image={member.image}
            linkedin={member.linkedin}
            github={member.github}
            twitter={member.twitter}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default Team;
