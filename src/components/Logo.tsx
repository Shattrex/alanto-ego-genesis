
import React from 'react';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src="/lovable-uploads/37754bb6-8e87-4678-b088-5fbc26c51faf.png"
        alt="Alanto AI Logo"
        className="w-10 h-10 object-contain"
        style={{ filter: 'drop-shadow(0 0 4px #ff6a00aa)' }}
      />
      <span className="font-bold text-2xl flex items-center">
        <span className="text-alanto-black">Alanto</span>
        <span className="text-alanto-orange ml-1">AI</span>
      </span>
    </div>
  );
};

export default Logo;
