import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FlowingMenu from '../Ui/FlowingMenu';

const demoItems = [
  { link: '', text: 'Ideate', image: 'https://picsum.photos/600/400?random=101' },
  { link: '', text: 'Design', image: 'https://picsum.photos/600/400?random=102' },
  { link: '', text: 'Develop', image: 'https://picsum.photos/600/400?random=103' },
  { link: '', text: 'Launch', image: 'https://picsum.photos/600/400?random=104' }
];

const FlowingData = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Check if the device is mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-[#0a0a0a] to-[#131313] text-white py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]" />
        <div className="hidden lg:block absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative max-w-[90rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-24 md:mb-32 relative"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8">
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-500">Creative</span>{" "}
            <span className="inline-block relative">
              Journey
              <motion.span 
                className="absolute -bottom-2 lg:-bottom-4 left-0 right-0 h-1 lg:h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: "100%", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Follow the evolution of your digital vision through our unique process—from the initial spark of an idea to the final launch.
          </p>
        </motion.div>

        {isMobile ? (
          // Mobile View with Tab Navigation
          <div className="relative">
            {/* Tabs Navigation */}
            <div className="flex overflow-x-auto pb-2 mb-8 scrollbar-hide">
              {demoItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTabClick(idx)}
                  className={`flex-shrink-0 text-center px-6 py-3 mx-1 rounded-full transition-all duration-300 ${
                    activeTab === idx
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium"
                      : "bg-white/10 text-gray-300"
                  }`}
                >
                  {item.text}
                </button>
              ))}
            </div>

            {/* Content for selected tab */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl overflow-hidden bg-black/30 backdrop-blur-sm border border-white/10 p-6"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
                <img 
                  src={demoItems[activeTab].image} 
                  alt={demoItems[activeTab].text}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">{demoItems[activeTab].text}</h3>
              <p className="text-gray-400">
                {activeTab === 0 && "Brainstorming and conceptualizing innovative digital solutions tailored to your unique goals."}
                {activeTab === 1 && "Crafting beautiful visuals and intuitive user interfaces that engage and delight your audience."}
                {activeTab === 2 && "Building robust, scalable code that brings your designs to life with flawless functionality."}
                {activeTab === 3 && "Deploying your project with careful testing and optimization for maximum impact."}
              </p>
            </motion.div>
          </div>
        ) : (
          // Desktop View with FlowingMenu
          <div className="relative h-[600px] z-10">
            <FlowingMenu items={demoItems} />
          </div>
        )}
      </div>
    </section>
  );
};

export default FlowingData;
