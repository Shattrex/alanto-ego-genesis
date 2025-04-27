import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const ImpactShowcase = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const impactData = [
    {
      category: "Enterprise Impact",
      stats: [
        {
          value: 67100,
          label: "AI-Powered Calls",
          description: "Business conversations handled autonomously"
        },
        {
          value: 1756,
          label: "Active Alter Egos",
          description: "AI twins deployed globally"
        },
        {
          value: 8943,
          label: "Demos Delivered",
          description: "Successful demonstrations"
        }
      ]
    },
    {
      category: "Time Saved",
      stats: [
        {
          value: 12000,
          label: "Hours Saved Monthly",
          description: "Time given back to executives"
        },
        {
          value: 95,
          label: "% Task Automation",
          description: "Routine tasks automated"
        },
        {
          value: 24,
          label: "Hr Availability",
          description: "Round-the-clock operation"
        }
      ]
    },
    {
      category: "Business Growth",
      stats: [
        {
          value: 156,
          label: "% Revenue Increase",
          description: "Average client growth"
        },
        {
          value: 89,
          label: "% Client Satisfaction",
          description: "Positive feedback rate"
        },
        {
          value: 3,
          label: "Min Response Time",
          description: "Average response speed"
        }
      ]
    }
  ];

  return (
    <div className="mt-32 mb-20">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ 
          background: 'linear-gradient(135deg, #FF6A00 0%, #FF4444 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 30px rgba(255,106,0,0.5)',
          WebkitTextStroke: '1px rgba(255,106,0,0.2)'
        }}>
          Transforming Business Communication
        </h2>
        <p className="text-xl text-deepBlack/70 max-w-3xl mx-auto">
          Our AI twins are revolutionizing how businesses operate, delivering unprecedented efficiency and growth
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Category Tabs */}
        <div className="flex justify-center mb-12 gap-4">
          {impactData.map((category, idx) => (
            <motion.button
              key={category.category}
              className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                activeTab === idx 
                  ? 'bg-alanto-orange text-white shadow-lg shadow-orange-500/30' 
                  : 'bg-white/50 text-gray-600 hover:bg-white/80'
              }`}
              onClick={() => setActiveTab(idx)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.category}
            </motion.button>
          ))}
        </div>

        {/* Stats Display */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          key={activeTab}
        >
          {impactData[activeTab].stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-100/50 shadow-xl group-hover:shadow-2xl group-hover:-translate-y-1 transition-all duration-300">
                <div className="text-center">
                  <div className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent mb-4">
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      separator=","
                    />
                    {stat.label.includes('%') ? '%' : '+'}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">{stat.label}</h3>
                  <p className="text-gray-600">{stat.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ImpactShowcase; 