
import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import AuthModal from './ui/AuthModal';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOpenApplyNow = () => {
      setActiveTab('register');
      setAuthModalOpen(true);
    };

    window.addEventListener('openApplyNow', handleOpenApplyNow);
    return () => window.removeEventListener('openApplyNow', handleOpenApplyNow);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const openLoginModal = () => {
    setActiveTab('login');
    setAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setActiveTab('register');
    setAuthModalOpen(true);
  };

  const navLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Programs', href: '#programs' },
    { name: 'Impact', href: '#impact' },
    { name: 'Our Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled || !transparent
            ? 'glass shadow-sm py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <img src="https://ishanyaindia.org/wp-content/uploads/2021/05/Ishanya_logo_NEW-1024x1024.png" alt="Logo" className="h-16 w-auto" />
            <span className="ml-2 text-2xl font-bold text-foreground">Ishanya India Foundation</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 btn-transition" 
              onClick={openLoginModal}
            >
              <LogIn size={18} />
              Login
            </Button>
            
            <Button 
              onClick={openRegisterModal}
              className="primary-btn btn-transition"
              id="applynow"
            >
              Apply Now
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <button className="md:hidden text-foreground" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} /> }
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            'md:hidden absolute w-full bg-background/95 backdrop-blur-md transition-all duration-300 overflow-hidden shadow-lg',
            mobileMenuOpen ? 'max-h-[500px] py-6' : 'max-h-0'
          )}
        >
          <nav className="flex flex-col space-y-4 px-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-foreground py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col space-y-3 mt-2">
              <Button 
                variant="ghost" 
                className="flex items-center justify-center gap-2 w-full btn-transition" 
                onClick={() => {
                  openLoginModal();
                  setMobileMenuOpen(false);
                }}
              >
                <LogIn size={18} />
                Login
              </Button>
              
              <Button 
                onClick={() => {
                  openRegisterModal();
                  setMobileMenuOpen(false);
                }}
                className="primary-btn w-full btn-transition"
              >
                Apply Now
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        defaultTab={activeTab}
      />
    </>
  );
};

export default Navbar;
