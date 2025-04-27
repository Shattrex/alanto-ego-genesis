import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DashboardMetrics {
  [key: string]: {
    title: string;
    metrics: {
      left: { label: string; value: string },
      right: { label: string; value: string }
    },
    progress: {
      label: string;
      value: number;
      status: string;
    },
    steps: Array<{
      label: string;
      status: 'complete' | 'in-progress' | 'pending';
    }>;
  }
}

const dashboardMetrics: DashboardMetrics = {
  multichannel: {
    title: "Multichannel Calling Engine",
    metrics: {
      left: { label: "Active Calls", value: "124" },
      right: { label: "Success Rate", value: "98%" }
    },
    progress: {
      label: "Call Quality",
      value: 85,
      status: "Optimizing"
    },
    steps: [
      { label: "Voice Clone", status: "complete" },
      { label: "Call Routing", status: "in-progress" },
      { label: "Quality Check", status: "in-progress" },
      { label: "Analytics", status: "pending" }
    ]
  },
  autopilot: {
    title: "Content Autopilot",
    metrics: {
      left: { label: "Posts Created", value: "45" },
      right: { label: "Engagement", value: "89%" }
    },
    progress: {
      label: "Content Generation",
      value: 65,
      status: "Creating"
    },
    steps: [
      { label: "Analysis", status: "complete" },
      { label: "Generation", status: "in-progress" },
      { label: "Review", status: "in-progress" },
      { label: "Publishing", status: "pending" }
    ]
  },
  support: {
    title: "Support Dashboard",
    metrics: {
      left: { label: "Active Agents", value: "700+" },
      right: { label: "Response Time", value: "1.2m" }
    },
    progress: {
      label: "Query Resolution",
      value: 92,
      status: "Processing"
    },
    steps: [
      { label: "Intake", status: "complete" },
      { label: "Analysis", status: "complete" },
      { label: "Resolution", status: "in-progress" },
      { label: "Follow-up", status: "pending" }
    ]
  },
  security: {
    title: "Security Overview",
    metrics: {
      left: { label: "Security Score", value: "98/100" },
      right: { label: "Threats Blocked", value: "1.2k" }
    },
    progress: {
      label: "System Security",
      value: 95,
      status: "Protected"
    },
    steps: [
      { label: "Scanning", status: "complete" },
      { label: "Monitoring", status: "in-progress" },
      { label: "Updates", status: "in-progress" },
      { label: "Backup", status: "complete" }
    ]
  }
};

const CoreFeatures: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState('multichannel');
  const currentMetrics = dashboardMetrics[selectedFeature];

  return (
    <section className="relative py-24 overflow-hidden bg-cream">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-orange-100/50 to-orange-50/80 pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-deepBlack mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Core Features
          </motion.h2>
          <motion.p 
            className="text-xl text-deepBlack/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Powerful capabilities designed to transform your digital presence
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Side - Feature Selection */}
          <div className="lg:col-span-4 space-y-4">
            {Object.entries(dashboardMetrics).map(([key, data], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedFeature(key)}
                className={`cursor-pointer p-6 rounded-xl transition-all duration-300 ${
                  selectedFeature === key 
                    ? 'bg-white/10 backdrop-blur-sm border border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.3)]' 
                    : 'bg-white/5 border border-white/10 hover:border-orange-500/30'
                }`}
              >
                <h3 className="text-xl font-semibold text-deepBlack mb-2">{data.title}</h3>
              </motion.div>
            ))}
          </div>

          {/* Right Side - Dashboard Display */}
          <div className="lg:col-span-8">
            <motion.div
              key={selectedFeature}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20"
            >
              <motion.h3 
                className="text-2xl font-bold text-deepBlack mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {currentMetrics.title} Dashboard
              </motion.h3>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/5 backdrop-blur-md rounded-xl p-6"
                >
                  <h4 className="text-deepBlack/70 text-sm mb-2">{currentMetrics.metrics.left.label}</h4>
                  <p className="text-orange-500 text-4xl font-bold">{currentMetrics.metrics.left.value}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/5 backdrop-blur-md rounded-xl p-6"
                >
                  <h4 className="text-deepBlack/70 text-sm mb-2">{currentMetrics.metrics.right.label}</h4>
                  <p className="text-orange-500 text-4xl font-bold">{currentMetrics.metrics.right.value}</p>
                </motion.div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-deepBlack/70 text-sm">{currentMetrics.progress.label}</h4>
                    <span className="text-orange-500 text-sm">{currentMetrics.progress.status}</span>
                  </div>
                  <motion.div 
                    className="h-2 bg-orange-500/20 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.6 }}
                  >
                    <motion.div 
                      className="h-full bg-orange-500"
                      initial={{ width: "0%" }}
                      animate={{ width: `${currentMetrics.progress.value}%` }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-wrap gap-4"
                >
                  {currentMetrics.steps.map((step, index) => (
                    <div
                      key={step.label}
                      className="bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2"
                    >
                      <motion.div
                        className={`w-2 h-2 rounded-full ${
                          step.status === 'complete' ? 'bg-green-500' :
                          step.status === 'in-progress' ? 'bg-orange-500' :
                          'bg-gray-400'
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                      />
                      <span className="text-deepBlack/70 text-sm">{step.label}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreFeatures; 