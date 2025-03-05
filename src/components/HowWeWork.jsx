import React from 'react';
import { Timeline } from '../Ui/TimeLine';
import { motion } from 'framer-motion';

const HowWeWork = () => {
  const processData = [
    {
      title: "Discovery & Strategy",
      description: "Understanding your vision and planning the path forward",
      content: (
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base">
            We understand your goals and craft a strategy that aligns with your vision. Our discovery phase ensures we have a deep understanding of your needs.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4 rounded-xl backdrop-blur-sm">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Research</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Deep market analysis</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4 rounded-xl backdrop-blur-sm">
              <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">Planning</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Strategic roadmap</p>
            </div>
          </div>
        </motion.div>
      ),
    },
    {
      title: "Design & Development",
      description: "Bringing your vision to life through design and development",
      content: (
        <div className="text-neutral-800 dark:text-neutral-200">
          <p className="text-sm md:text-base mb-4">
            Our creative team brings your vision to life through innovative design and robust development practices, ensuring a seamless user experience.
          </p>
        </div>
      ),
    },
    {
      title: "Testing & Optimization",
      description: "Ensuring everything works perfectly through testing and optimization",
      content: (
        <div className="text-neutral-800 dark:text-neutral-200">
          <p className="text-sm md:text-base mb-4">
            We conduct thorough performance-driven testing to ensure everything works perfectly, optimizing every aspect for the best possible results.
          </p>
        </div>
      ),
    },
    {
      title: "Launch & Growth",
      description: "Deploying scalable solutions for long-term success",
      content: (
        <div className="text-neutral-800 dark:text-neutral-200">
          <p className="text-sm md:text-base mb-4">
            We deploy scalable solutions that evolve with your business, ensuring long-term success and continuous growth opportunities.
          </p>
        </div>
      ),
    }
  ];

  return (
    <div className='relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-white to-neutral-50 dark:from-black'>
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(0,0,0,0))]" />
      
      {/* Content */}
      <div className="relative w-full bg-gradient-to-b from-white to-neutral-50 dark:from-black">
        <div className="max-w-7xl mx-auto pt-20 pb-10 px-4 md:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-200 dark:to-neutral-400">
              How We Work
            </h2>
            <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400">
              Our Process is Simple, Effective & Powerful
            </p>
          </motion.div>
        </div>

        <Timeline data={processData} />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10"
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl backdrop-blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.05),rgba(0,0,0,0))]" />
          
          {/* Content container */}
          <div className="relative flex flex-col items-center space-y-12 py-10">
            {/* Premium text display */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-center space-y-4"
            >
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full backdrop-blur-sm border border-blue-500/10">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-medium">
                  ✨ Transform Your Digital Presence
                </span>
              </span>
              <p className="text-2xl md:text-3xl font-light text-neutral-700 dark:text-neutral-300">
                From concept to launch – we make
                <span className="font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"> digital magic </span>
                happen!
              </p>
            </motion.div>

            {/* Premium button */}
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px -15px rgba(79, 70, 229, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-xl opacity-60 group-hover:opacity-100 transition duration-500" />
              <div className="relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl flex items-center gap-2 text-white font-medium shadow-xl shadow-blue-500/20 transition-all duration-200">
                <span className="relative">
                  <span className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 blur-sm opacity-0 group-hover:opacity-100 transition duration-500" />
                  <span className="relative">Let's Create Together</span>
                </span>
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowWeWork;
