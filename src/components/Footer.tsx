
import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Github, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#" },
    { icon: <Twitter className="h-5 w-5" />, href: "#" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#" },
    { icon: <Instagram className="h-5 w-5" />, href: "#" },
    { icon: <Github className="h-5 w-5" />, href: "#" },
  ];

  const linkGroups = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Programs",
      links: [
        { name: "Analytics", href: "#programs" },
        { name: "Learning Tools", href: "#programs" },
        { name: "Adaptive Learning", href: "#programs" },
        { name: "Data Management", href: "#programs" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "Guides", href: "#" },
        { name: "Support", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-secondary/30 pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-1">
            <a href="#" className="text-2xl font-bold text-foreground inline-block mb-4">
              elegantUX<span className="text-primary">.</span>
            </a>
            <p className="text-foreground/70 mb-6">
              Transforming education through elegant design and powerful analytics.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold mb-4">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="relative pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/70 text-sm">
            © {new Date().getFullYear()} elegantUX. All rights reserved.
          </p>
          
          <div className="flex gap-4 text-sm text-foreground/70 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
          
          <button
            onClick={scrollToTop}
            className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
