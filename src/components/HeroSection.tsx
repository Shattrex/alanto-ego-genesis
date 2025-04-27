import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import DashboardView from './Dashboard/DashboardView';

const AnimatedCounter = ({ value, duration = 1600, start = 0, className = "" }: { value: number, duration?: number, start?: number, className?: string }) => {
  const [display, setDisplay] = useState(start);

  useEffect(() => {
    let raf: number;
    let startTime: number | null = null;
    function animate(ts: number) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setDisplay(Math.floor(start + (value - start) * progress));
      if (progress < 1) raf = requestAnimationFrame(animate);
      else setDisplay(value);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, start]);

  return (
    <span className={className}>{display.toLocaleString()}</span>
  );
};

const InteractiveMesh = () => {
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
      <div className="absolute inset-0">
        {/* Main gradient blob that follows cursor */}
        <motion.div
          className="absolute w-[1000px] h-[1000px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,106,0,0.25) 0%, rgba(255,106,0,0.15) 40%, transparent 70%)',
            left: `${mousePosition.x * 100}%`,
            top: `${mousePosition.y * 100}%`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Flowing water-like gradients */}
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

        {/* Static background gradients with increased intensity */}
        <motion.div 
          className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: 'radial-gradient(circle, rgba(255,106,0,0.2) 0%, transparent 60%)',
            filter: 'blur(30px)',
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-[800px] h-[800px] rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: 'radial-gradient(circle, rgba(255,106,0,0.2) 0%, transparent 60%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Enhanced grid overlay */}
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
    </div>
  );
};

const HeroSection = () => {
  // Only animate when section comes into view
  const [animateDashboard, setAnimateDashboard] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => entry.isIntersecting && setAnimateDashboard(true),
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <InteractiveMesh />
      <div className="container mx-auto px-4 z-10 py-16 md:py-20">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Content */}
          <motion.div 
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ 
                color: '#000000',
                textShadow: '0 0 30px rgba(128,128,128,0.6)',
                WebkitTextStroke: '1px rgba(128,128,128,0.3)'
              }}
            >
              Building the #1 AI Alter Ego for CEOs and Executives
            </motion.h1>
            <p className="text-xl mb-8 text-deepBlack/80">
              Alanto AI has produced AI Twins that have replaced the media and support teams of 27 enterprises with two clicks.
            </p>
            <Button 
              variant="default"
              className="bg-alanto-orange text-white text-xl py-6 px-10 hover:bg-alanto-orange/90 rounded-full font-semibold" 
              size="lg"
              onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Launch Your Alter Ego
            </Button>
          </motion.div>
          
          {/* Dashboard Visualization */}
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1.5,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <motion.div 
              ref={ref} 
              className="glass-card p-6 md:p-10 relative overflow-hidden"
              initial={{ 
                y: 0,
                rotate: 0,
                boxShadow: "0 0 0 rgba(255,255,255,0)",
                filter: "blur(0px)"
              }}
              animate={{ 
                y: [-15, 15],
                rotate: [-1, 1],
                boxShadow: [
                  "0 0 40px rgba(255,255,255,0.2)",
                  "0 0 60px rgba(255,255,255,0.4)",
                  "0 0 40px rgba(255,255,255,0.2)"
                ],
                filter: [
                  "blur(0px)",
                  "blur(0.3px)",
                  "blur(0px)"
                ]
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  times: [0, 1],
                  frame: [1/120]
                },
                rotate: {
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  times: [0, 1],
                  frame: [1/120]
                },
                boxShadow: {
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                },
                filter: {
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
            >
              <motion.div 
                className="absolute -right-20 -top-20 w-40 h-40 bg-white/20 rounded-full filter blur-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
              
              {/* Dashboard UI Mockup */}
              <div className="relative z-10">
                <motion.h3 
                  className="text-xl font-semibold mb-4"
                  initial={{ 
                    color: "#000",
                    textShadow: "0 0 0px rgba(0,0,0,0)",
                    filter: "none"
                  }}
                  animate={{ 
                    color: ["#000", "rgba(0,0,0,0.8)", "#000"],
                    textShadow: [
                      "0 0 0px rgba(255,255,255,0)",
                      "0 0 40px rgba(255,255,255,0.8)",
                      "0 0 0px rgba(255,255,255,0)"
                    ],
                    filter: [
                      "blur(0px)",
                      "blur(0.5px)",
                      "blur(0px)"
                    ]
                  }}
                  transition={{
                    duration: 2.5,
                    times: [0, 0.5, 1],
                    ease: "easeInOut"
                  }}
                >
                  Alter Ego Dashboard
                </motion.h3>
                <DashboardView />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
