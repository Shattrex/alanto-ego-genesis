import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImpactShowcase from './ImpactShowcase';

const VIDEOS = [
  {
    src: "https://drive.google.com/file/d/1c2LeQv7Y7_ocNeZ-JyPZznPL2UVxQjiu/preview",
    alt: "Alanto AI Demo 1"
  },
  {
    src: "https://drive.google.com/file/d/1ZGC59cTfrLILKyFDuQlOFXo1G1ohk5kH/preview",
    alt: "Alanto AI Demo 2"
  }
];

const GradientBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const meshRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (meshRef.current) {
        const rect = meshRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={meshRef} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute w-full h-full"
        initial={{ backgroundPosition: '0% 0%' }}
        animate={{ backgroundPosition: '100% 100%' }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }}
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(255,106,0,0.2) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(255,106,0,0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255,106,0,0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 30%, rgba(255,106,0,0.2) 0%, transparent 50%)
          `,
          backgroundSize: '200% 200%',
          filter: 'blur(30px)',
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,106,0,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,106,0,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.7,
        }}
      />
    </div>
  );
};

const InteractiveDemo = () => {
  return (
    <section className="py-20 relative overflow-hidden" id="demo">
      <GradientBackground />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Interactive Demo</h2>
          <p className="text-xl text-deepBlack/70 max-w-2xl mx-auto">
            Instantly see your AI twin in action. Demo videos below.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {VIDEOS.map((video, idx) => (
            <motion.div 
              key={video.src}
              className="bg-white/40 glass-card flex flex-col items-center p-4 rounded-xl border-2 border-alanto-orange shadow-lg aspect-[9/16] relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.25 }}
            >
              <iframe
                src={video.src}
                className="w-full h-full rounded-lg"
                allow="autoplay"
                allowFullScreen
                title={video.alt}
                loading="lazy"
              />
              <div className="absolute top-3 left-3 z-10">
                <img 
                  src="/lovable-uploads/37754bb6-8e87-4678-b088-5fbc26c51faf.png" 
                  alt="Alanto Logo Watermark" 
                  className="w-8 h-8 bg-white/60 rounded-full p-1"
                  style={{ boxShadow: "0 1px 6px #ff6a0033" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        <ImpactShowcase />
      </div>
    </section>
  );
};

export default InteractiveDemo;
