import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardMetrics {
  activeAgents: number;
  successRate: number;
  completedTasks: number;
  uptime: number;
}

interface ProcessStep {
  name: string;
  progress: number;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
}

const DashboardView = () => {
  const [currentView, setCurrentView] = useState<string>('main');
  const [metrics] = useState({
    activeAgents: 700,
    successRate: 99
  });

  const [processSteps] = useState<ProcessStep[]>([
    { name: 'Voice Clone', progress: 100, status: 'completed' },
    { name: 'Script Analysis', progress: 60, status: 'in-progress' },
    { name: 'Training', progress: 30, status: 'in-progress' },
    { name: 'Deployment', progress: 0, status: 'pending' }
  ]);

  const viewVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const getStatusColor = (status: ProcessStep['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-alanto-orange';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  const renderMainView = () => (
    <motion.div 
      initial="enter"
      animate="center"
      exit="exit"
      variants={viewVariants}
    >
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/50 p-4 rounded-lg">
          <div className="text-sm text-deepBlack/70">Active Agents</div>
          <div className="text-2xl font-bold">
            <span className="text-alanto-orange">{metrics.activeAgents}</span>+
          </div>
        </div>
        <div className="bg-white/50 p-4 rounded-lg">
          <div className="text-sm text-deepBlack/70">Success Rate</div>
          <div className="text-2xl font-bold">
            <span className="text-alanto-orange">{metrics.successRate}</span>%
          </div>
        </div>
      </div>

      {/* Agent Generation Progress */}
      <div className="bg-white/40 p-4 rounded-lg mb-4">
        <div className="flex justify-between mb-2">
          <span>Agent Generation</span>
          <span className="text-alanto-orange font-medium">In Progress</span>
        </div>
        <div className="w-full bg-white/50 rounded-full h-2">
          <motion.div 
            className="bg-alanto-orange h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '70%' }}
            transition={{ duration: 1.2 }}
          />
        </div>
      </div>

      {/* Process Steps */}
      <div className="flex flex-wrap gap-2">
        {processSteps.map((step) => (
          <motion.button
            key={step.name}
            className="text-xs bg-white/60 px-3 py-1.5 rounded-full flex items-center gap-2 hover:bg-white/80 transition-colors"
            onClick={() => setCurrentView(step.name.toLowerCase().replace(' ', '-'))}
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <span>{step.name}</span>
            {step.status !== 'pending' && (
              <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(step.status)}`} />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  const renderVoiceClone = () => (
    <motion.div
      className="space-y-6"
      initial="enter"
      animate="center"
      exit="exit"
      variants={viewVariants}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Voice Cloning Status</h3>
        <motion.button
          className="text-sm text-alanto-orange"
          onClick={() => setCurrentView('main')}
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          Back to Dashboard
        </motion.button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Voice Samples</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Processed</span>
              <span className="text-alanto-orange">30/30</span>
            </div>
            <div className="w-full bg-white/50 rounded-full h-2">
              <motion.div 
                className="bg-alanto-orange h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Quality Score</h4>
          <div className="text-2xl font-bold text-alanto-orange">100%</div>
        </div>
      </div>

      <div className="bg-white/50 p-4 rounded-lg">
        <h4 className="font-medium mb-4">Recent Activities</h4>
        <div className="space-y-3">
          {[
            'Voice sample analysis completed',
            'Pitch adjustment optimized',
            'Emotion detection training',
            'Natural speech patterns verified'
          ].map((activity, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-2 h-2 rounded-full bg-alanto-orange" />
              <span>{activity}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderScriptAnalysis = () => (
    <motion.div
      className="space-y-6"
      initial="enter"
      animate="center"
      exit="exit"
      variants={viewVariants}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Script Analysis Progress</h3>
        <motion.button
          className="text-sm text-alanto-orange"
          onClick={() => setCurrentView('main')}
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          Back to Dashboard
        </motion.button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Content Analysis</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Scripts Analyzed</span>
              <span className="text-alanto-orange">45/75</span>
            </div>
            <div className="w-full bg-white/50 rounded-full h-2">
              <motion.div 
                className="bg-alanto-orange h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Language Models</h4>
          <div className="text-2xl font-bold text-alanto-orange">3/5</div>
          <div className="text-sm text-deepBlack/70">Active Models</div>
        </div>
      </div>

      <div className="bg-white/50 p-4 rounded-lg">
        <h4 className="font-medium mb-4">Analysis Components</h4>
        <div className="space-y-3">
          {[
            { name: 'Sentiment Analysis', progress: 85 },
            { name: 'Context Understanding', progress: 70 },
            { name: 'Response Generation', progress: 65 },
            { name: 'Style Matching', progress: 55 }
          ].map((component, index) => (
            <motion.div
              key={index}
              className="space-y-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between text-sm">
                <span>{component.name}</span>
                <span className="text-alanto-orange">{component.progress}%</span>
              </div>
              <div className="w-full bg-white/50 rounded-full h-1.5">
                <motion.div 
                  className="bg-alanto-orange h-1.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${component.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderTraining = () => (
    <motion.div
      className="space-y-6"
      initial="enter"
      animate="center"
      exit="exit"
      variants={viewVariants}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">AI Agent Training</h3>
        <motion.button
          className="text-sm text-alanto-orange"
          onClick={() => setCurrentView('main')}
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          Back to Dashboard
        </motion.button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Training Progress</h4>
          <div className="text-3xl font-bold text-alanto-orange">30%</div>
          <div className="text-sm text-deepBlack/70">Overall Completion</div>
        </div>
        
        <div className="bg-white/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Active Sessions</h4>
          <div className="text-3xl font-bold text-alanto-orange">12</div>
          <div className="text-sm text-deepBlack/70">Training Iterations</div>
        </div>
      </div>

      <div className="bg-white/50 p-4 rounded-lg">
        <h4 className="font-medium mb-4">Agent Styles</h4>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: 'Professional', progress: 85, color: 'bg-blue-500' },
            { name: 'Casual', progress: 60, color: 'bg-green-500' },
            { name: 'Technical', progress: 45, color: 'bg-purple-500' },
            { name: 'Creative', progress: 30, color: 'bg-pink-500' }
          ].map((style, index) => (
            <motion.div
              key={style.name}
              className="p-3 rounded-lg bg-white/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${style.color}`} />
                <span className="font-medium">{style.name}</span>
              </div>
              <div className="w-full bg-white/50 rounded-full h-1.5">
                <motion.div 
                  className={`h-1.5 rounded-full ${style.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${style.progress}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white/50 p-4 rounded-lg">
        <h4 className="font-medium mb-4">Training Focus Areas</h4>
        <div className="space-y-3">
          {[
            'Communication Pattern Recognition',
            'Response Generation Optimization',
            'Context Awareness Enhancement',
            'Personality Alignment Training'
          ].map((area, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-2 h-2 rounded-full bg-alanto-orange" />
              <span>{area}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderDeployment = () => (
    <motion.div
      className="space-y-6"
      initial="enter"
      animate="center"
      exit="exit"
      variants={viewVariants}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Deployment Status</h3>
        <motion.button
          className="text-sm text-alanto-orange"
          onClick={() => setCurrentView('main')}
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          Back to Dashboard
        </motion.button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">System Status</h4>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" />
            <span className="text-deepBlack/70">Preparing for Launch</span>
          </div>
        </div>
        
        <div className="bg-white/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Estimated Time</h4>
          <div className="text-2xl font-bold text-alanto-orange">4h 30m</div>
          <div className="text-sm text-deepBlack/70">Until Launch</div>
        </div>
      </div>

      <div className="bg-white/50 p-4 rounded-lg">
        <h4 className="font-medium mb-4">Deployment Checklist</h4>
        <div className="space-y-3">
          {[
            { task: 'Environment Setup', status: 'pending' },
            { task: 'Security Verification', status: 'pending' },
            { task: 'Performance Testing', status: 'pending' },
            { task: 'Backup Configuration', status: 'pending' },
            { task: 'API Integration', status: 'pending' }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-300" />
                <span>{item.task}</span>
              </div>
              <span className="text-sm text-deepBlack/70">Pending</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white/50 p-4 rounded-lg">
        <h4 className="font-medium mb-4">Launch Requirements</h4>
        <div className="space-y-2 text-sm text-deepBlack/70">
          <p>• All training modules completed</p>
          <p>• Security protocols verified</p>
          <p>• Performance benchmarks met</p>
          <p>• Integration tests passed</p>
          <p>• Backup systems configured</p>
        </div>
      </div>
    </motion.div>
  );

  const renderView = () => {
    switch (currentView) {
      case 'voice-clone':
        return renderVoiceClone();
      case 'script-analysis':
        return renderScriptAnalysis();
      case 'training':
        return renderTraining();
      case 'deployment':
        return renderDeployment();
      default:
        return renderMainView();
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {renderView()}
      </AnimatePresence>
    </div>
  );
};

export default DashboardView; 