import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-cream py-12 border-t border-alanto-orange/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left Side - Contact Info */}
          <div className="text-left">
            <h3 className="font-semibold mb-2">Contact Us</h3>
            <a href="tel:+447492758066" className="block text-deepBlack hover:text-alanto-orange transition-colors">
              +44 7492 758066
            </a>
            <a href="mailto:info@alantoai.com" className="block text-deepBlack hover:text-alanto-orange transition-colors">
              info@alantoai.com
            </a>
          </div>

          {/* Center - Logo/Copyright */}
          <div className="text-center">
            <img 
              src="/lovable-uploads/37754bb6-8e87-4678-b088-5fbc26c51faf.png"
              alt="Alanto AI Logo"
              className="w-12 h-12 mx-auto mb-4"
            />
            <p className="text-sm text-deepBlack/70">
              © {new Date().getFullYear()} Alanto AI. All rights reserved.
            </p>
          </div>

          {/* Right Side - Social Links */}
          <div className="text-right">
            <h3 className="font-semibold mb-2">Follow Us</h3>
            <div className="flex flex-col gap-2">
              <a 
                href="https://www.linkedin.com/company/alanto-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-deepBlack hover:text-alanto-orange transition-colors justify-end"
              >
                <span>LinkedIn</span>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/alantoai.productions/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-deepBlack hover:text-alanto-orange transition-colors justify-end"
              >
                <span>Instagram</span>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
