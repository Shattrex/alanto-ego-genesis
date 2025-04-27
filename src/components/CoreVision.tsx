import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Feature {
  title: string;
  description: string;
  metrics: {
    title: string;
    value: string;
    description: string;
  }[];
  dashboard: {
    mainMetric: string;
    mainValue: string;
    progress: number;
    status: string;
  };
}

const CoreVision: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState('multichannel');

  const features: Record<string, Feature> = {
    multichannel: {
      title: "Multichannel Calling Engine",
      description: "Seamlessly integrate voice, video, and messaging across all platforms",
      metrics: [
        { title: 'Active Channels', value: '15+', description: 'Integrated platforms' },
        { title: 'Call Quality', value: '99.9%', description: 'HD voice quality' }
      ],
      dashboard: {
        mainMetric: 'Total Calls Handled',
        mainValue: '1M+',
        progress: 92,
        status: 'Optimal Performance'
      }
    },
    autopilot: {
      title: "Automated Content & Brand Autopilot",
      description: "AI-powered content generation and brand management system",
      metrics: [
        { title: 'Content Generated', value: '10K+', description: 'Daily pieces' },
        { title: 'Brand Consistency', value: '98%', description: 'Accuracy rate' }
      ],
      dashboard: {
        mainMetric: 'Automation Rate',
        mainValue: '85%',
        progress: 85,
        status: 'High Efficiency'
      }
    },
    support: {
      title: "24/7 Support & Analytics Dashboard",
      description: "Round-the-clock monitoring and real-time analytics",
      metrics: [
        { title: 'Response Time', value: '< 1min', description: 'Average response' },
        { title: 'Uptime', value: '99.99%', description: 'System availability' }
      ],
      dashboard: {
        mainMetric: 'Issues Resolved',
        mainValue: '5K+',
        progress: 95,
        status: 'Excellent'
      }
    },
    security: {
      title: "Enterprise-Grade Security & Compliance",
      description: "Highest level of protection for you",
      metrics: [
        { title: 'Security Score', value: '98/100', description: 'Industry standard' },
        { title: 'Compliance', value: '100%', description: 'Regulatory adherence' }
      ],
      dashboard: {
        mainMetric: 'Protected Data',
        mainValue: '50TB+',
        progress: 100,
        status: 'Maximum Security'
      }
    }
  };

  const currentFeature = features[selectedFeature];

  return (
    <section className="relative py-16 overflow-hidden bg-[#FFF5EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">Core Vision</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Empowering your digital presence with cutting-edge AI technology and enterprise-grade solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side - Feature Selection */}
          <div className="lg:col-span-4 space-y-4">
            {Object.entries(features).map(([key, feature]) => (
              <motion.button
                key={key}
                className={`w-full text-left p-6 rounded-xl transition-all duration-300 ${
                  selectedFeature === key
                    ? 'bg-black text-white shadow-xl'
                    : 'bg-white/80 hover:bg-white text-black'
                }`}
                onClick={() => setSelectedFeature(key)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm opacity-80">{feature.description}</p>
              </motion.button>
            ))}
          </div>

          {/* Right Side - Dashboard Display */}
          <motion.div
            key={selectedFeature}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8"
          >
            <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {currentFeature.metrics.map((metric, index) => (
                  <motion.div
                    key={metric.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/20 rounded-xl p-6"
                  >
                    <h3 className="text-gray-400 text-sm mb-2">{metric.title}</h3>
                    <p className="text-3xl font-bold text-white mb-2">{metric.value}</p>
                    <p className="text-gray-400 text-sm">{metric.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="bg-black/20 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {currentFeature.dashboard.mainValue}
                    </h3>
                    <p className="text-gray-400">{currentFeature.dashboard.mainMetric}</p>
                  </div>
                  <span className="text-white font-medium px-4 py-2 bg-orange-500/20 rounded-full">
                    {currentFeature.dashboard.status}
                  </span>
                </div>
                <div className="relative h-2 bg-black/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${currentFeature.dashboard.progress}%` }}
                    transition={{ duration: 0.6 }}
                    className="absolute top-0 left-0 h-full bg-orange-500 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-orange-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-orange-500/20 rounded-full filter blur-3xl"></div>
      </div>
    </section>
  );
};

export default CoreVision; 