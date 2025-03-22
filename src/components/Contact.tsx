
import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import FadeIn from './animations/FadeIn';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Our Location",
      details: "1234 Design Avenue, Suite 567, San Francisco, CA 94107",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone Number",
      details: "+1 (555) 123-4567",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email Address",
      details: "contact@elegantux.com",
    },
  ];

  return (
    <section id="contact" className="section bg-gradient-to-b from-background to-secondary/20">
      <FadeIn>
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Contact Us
          </div>
          <h2 className="section-title">
            Get In Touch
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Have questions or want to learn more about our educational solutions? We'd love to hear from you.
          </p>
        </div>
      </FadeIn>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <FadeIn direction="right">
          <div className="grid grid-cols-1 gap-6">
            {contactInfo.map((item) => (
              <div key={item.title} className="flex gap-4 glass-card p-6 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-foreground/70">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
        
        <FadeIn direction="left">
          <form onSubmit={handleSubmit} className="glass-card p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Type your message here"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full min-h-[150px]"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </FadeIn>
      </div>
    </section>
  );
};

export default Contact;
