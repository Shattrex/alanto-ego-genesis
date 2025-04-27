import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import LiveMetrics from '../components/LiveMetrics';
import InteractiveDemo from '../components/InteractiveDemo';
import CoreVision from '../components/CoreVision';
import FeaturesAndCTA from '../components/FeaturesAndCTA';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

const Index = () => {
  return (
    <div className="min-h-screen bg-cream text-deepBlack">
      <ParticleBackground />
      <Header />
      
      <main>
        <HeroSection />
        <CoreVision />
        <InteractiveDemo />
        <FeaturesAndCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
