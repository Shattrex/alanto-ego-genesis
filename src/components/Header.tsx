import React from 'react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="fixed w-full top-0 left-0 z-50 glass-nav">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center h-16 md:h-20">
          <Logo />
          
          <div className="hidden md:flex items-center gap-8">
            <NavLinks />
            <a 
              href="https://calendly.com/shattrex-official/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" className="orange-button">Book 15 Min Consultation</Button>
            </a>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

const NavLinks = () => {
  const links = [
    { label: 'Use Cases', href: '#use-cases' },
    { label: 'Demo', href: '#demo' },
    { label: 'Blog', href: '#blog' },
    { label: 'Get Your Demo', href: '#cta' }
  ];
  
  return (
    <ul className="flex gap-6">
      {links.map((link) => (
        <li key={link.label}>
          <a 
            href={link.href} 
            className="text-deepBlack hover:text-alanto-orange transition-colors font-medium"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Header;
