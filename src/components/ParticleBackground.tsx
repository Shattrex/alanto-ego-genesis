
import React from "react";

// Since we're having type issues with react-tsparticles, let's create a simpler version
// with pure CSS for the demo

const ParticleBackground: React.FC = () => {
  return (
    <div className="particles-container">
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse-glow bg-alanto-orange/30 rounded-full"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ParticleBackground;
