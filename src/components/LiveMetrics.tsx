import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const LiveMetrics: React.FC = () => {
  const metrics = [
    {
      title: 'Alter Egos Active',
      value: 271,
      suffix: '+',
      description: 'AI twins transforming businesses'
    },
    {
      title: 'Demos Created',
      value: 2001,
      suffix: '+',
      description: 'Successful demonstrations'
    },
    {
      title: 'Business Calls',
      value: 3604,
      suffix: '+',
      description: 'Calls handled by AI twins'
    }
  ];

  return (
    <section className="relative py-20 bg-[#FFF5EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-black mb-4">Real-Time Impact</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how Alter Ego is transforming digital interactions across businesses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative overflow-hidden bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Decorative gradient blob */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-full blur-2xl" />
              
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                <h3 className="text-lg font-medium text-gray-600 mb-3">{metric.title}</h3>
                <div className="text-5xl font-bold text-black mb-3 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  <CountUp
                    end={metric.value}
                    duration={2.5}
                    separator=","
                    suffix={metric.suffix}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </div>
                <p className="text-gray-500">{metric.description}</p>
              </motion.div>

              {/* Animated progress bar */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-orange-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-orange-500/5 rounded-full filter blur-3xl" />
      </div>
    </section>
  );
};

export default LiveMetrics;
