import React from 'react';
import FadeIn from './animations/FadeIn';

// Import images
import SwathiImage from '../Images/Swathi.jpg';
import RaghuImage from '../Images/Raghu.jpg'
import AshwanathImage from '../Images/Ashwathanarayana.jpg';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  delay: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  image,
  delay,
}) => {
  return (
    <FadeIn direction="up" delay={delay} className="group">
      <div className="relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl">
        <div className="aspect-square w-full mb-4 rounded-lg overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600 mb-4">{role}</p>
      </div>
    </FadeIn>
  );
};

const Team: React.FC = () => {
  const teamMembers = [
    {
      name: "SWATHI VELLAL RAGHUNANDAN",
      role: "FOUNDER, DIRECTOR",
      image: SwathiImage, // Imported image
    },
    {
      name: "RAGHUNANDAN RANGANATH",
      role: "Co-FOUNDER, TRUSTEE",
      image: RaghuImage, // Imported image
    },
    {
      name: "ASHWATHANARAYANA REDDY",
      role: "CHIEF MENTOR, TRUSTEE",
      image: AshwanathImage, // Imported image
    },
  ];

  return (
    <section id="team" className="section py-16 bg-gray-50">
      <FadeIn>
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
            Our Team
          </div>
          <h2 className="section-title text-gray-900">Meet Our Leadership</h2>
          <p className="section-subtitle max-w-3xl mx-auto text-gray-600">
            The experts behind our innovative educational solutions, bringing together design and technology expertise.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <TeamMember
            key={member.name}
            name={member.name}
            role={member.role}
            image={member.image}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default Team;
