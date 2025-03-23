import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import FadeIn from './animations/FadeIn';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import emailjs from 'emailjs-com';
import ReCAPTCHA from "react-google-recaptcha";

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = React.createRef<ReCAPTCHA>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // reCAPTCHA validation
    const recaptchaValue = recaptchaRef.current?.getValue();
    if (!recaptchaValue) {
      toast({
        title: "reCAPTCHA Error",
        description: "Please verify you're not a robot.",
      });
      setIsSubmitting(false);
      return;
    }

    // EmailJS configuration
    emailjs.sendForm(
      'service_3il9pqb',
      'template_8p3e99g',
      e.target as HTMLFormElement,
      '6F25q7fGwDqTUwEmQ'
    )
    .then(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({ name: '', email: '', message: '' });
      recaptchaRef.current?.reset();
      setIsSubmitting(false);
    })
    .catch(() => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
      });
      setIsSubmitting(false);
    });
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5" onClick={() => window.open('https://www.google.com/maps?q=769,7th+Main+Rd,+KSRTC+Layout,+2nd+Phase,+JP+Nagar,+Bengaluru,+Karnataka+560078&output=embed', '_blank')} />,
      title: "Our Location",
      details: "769, 7th Main Rd, KSRTC Layout, 2nd Phase, JP Nagar, Bengaluru, Karnataka 560078",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone Number",
      details: "+91 73496 76668",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email Address",
      details: "info@ishanyaindia.org",
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
            Have questions or want to know about us more?
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

              <div className="mb-6">
                <ReCAPTCHA
                  sitekey="6LfVE_wqAAAAAG6Qbo5BFC8fUR6mbpd9Aw9oC4UL"
                  ref={recaptchaRef}
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
