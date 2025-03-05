import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GlowingEffect } from '../Ui/GlowingEffect';
import { PinContainer } from '../Ui/3dPin';

const projects = [
  {
    title: "TechVision AI Platform",
    description: "Next-generation AI platform with real-time data processing and advanced analytics.",
    icon: "🤖",
    gradient: "from-[#0EA5E9] via-[#22D3EE] to-[#818CF8]",
    image: "https://images.unsplash.com/photo-1735825764457-ffdf0b5aa5dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    link: "/projects/tech-vision",
    stats: {
      users: "50K+",
      rating: "4.9",
      growth: "127%"
    }
  },
  {
    title: "Trendify Commerce",
    description: "Revolutionary e-commerce platform with AI-powered recommendations and seamless checkout.",
    icon: "🛍️",
    gradient: "from-[#F472B6] via-[#E879F9] to-[#C084FC]",
    image: "https://images.unsplash.com/photo-1733044271325-3017e877218b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
    link: "/projects/trendify",
    stats: {
      sales: "$2M+",
      conversion: "15%",
      growth: "89%"
    }
  },
  {
    title: "Bloom Interiors",
    description: "An elegant portfolio site for an interior designer.",
    icon: "🏡",
    gradient: "from-emerald-500 to-teal-500",
    image: "https://plus.unsplash.com/premium_photo-1741005641996-f0e15c7c276b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
    link: "/projects/bloom",
    stats: {
      clients: "200+",
      projects: "150+",
      satisfaction: "98%"
    }
  },
  {
    title: "LaunchPad",
    description: "A startup-focused landing page built for conversions.",
    icon: "🚀",
    gradient: "from-orange-500 to-amber-500",
    image: "https://images.unsplash.com/photo-1726137569911-bc03e55fd87f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D",
    link: "/projects/launchpad",
    stats: {
      startups: "100+",
      conversion: "25%",
      roi: "300%"
    }
  }
];

const OurWork = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div id="work" className='relative w-full min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#131313] text-white py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden'>
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]" />
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-40 -left-20 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-pulse" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute top-60 -right-20 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-pulse" 
        />
        <motion.div 
          style={{ y: y3 }}
          className="hidden xl:block absolute bottom-40 left-1/2 w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse-slow" 
        />
        
        {/* Desktop grid lines */}
        <div className="hidden lg:block absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className='max-w-[90rem] mx-auto relative'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-24 md:mb-32 relative"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base font-medium text-blue-400 uppercase tracking-wider mb-4 block"
          >
            Our Portfolio
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8">
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-500">Featured</span>{" "}
            <span className="inline-block relative">
              Projects
              <motion.span 
                className="absolute -bottom-2 lg:-bottom-4 left-0 right-0 h-1 lg:h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: "100%", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
            Transforming Ideas into Digital Reality with Innovation and Excellence
          </p>
        </motion.div>
        
        {/* Staggered grid for desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6 sm:gap-8 md:gap-12 lg:gap-16 px-4 sm:px-6 lg:px-8 relative">
          {projects.map((project, index) => (
            <div key={index} className={`
              ${index === 0 ? "xl:col-span-8" : ""}
              ${index === 1 ? "xl:col-span-4" : ""}
              ${index === 2 ? "xl:col-span-5" : ""}
              ${index === 3 ? "xl:col-span-7" : ""}
            `}>
              <PinContainer 
                title={project.title}
                href={project.link}
                containerClassName={`w-full h-[28rem] sm:h-[32rem] md:h-[36rem] lg:h-[40rem] xl:h-[${index === 0 ? "50" : "45"}rem]`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="w-full h-full group bg-gradient-to-br from-black/40 to-black/60 rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
                >
                  <div className={`relative w-full h-48 sm:h-56 md:h-64 lg:h-72 mb-4 sm:mb-6 lg:mb-8 rounded-xl overflow-hidden ${index === 0 ? "xl:h-96" : ""}`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <GlowingEffect spread={80} glow={true} proximity={100} />
                    
                    {/* Hover overlay with icon */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <motion.div 
                        initial={{ scale: 0.8 }} 
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
                      >
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-5">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/5 to-white/20 backdrop-blur-sm flex items-center justify-center text-3xl sm:text-4xl">
                        {project.icon}
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                        {project.title}
                      </h3>
                    </div>
                    
                    <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed line-clamp-3">{project.description}</p>

                    <div className="pt-4 sm:pt-6 lg:pt-8 border-t border-white/10">
                      <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {project.stats && Object.entries(project.stats).map(([key, value]) => (
                          <div key={key} className="text-center group/stat">
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-blue-400 group-hover/stat:to-blue-500 transition-all duration-300">
                              {value}
                            </div>
                            <div className="text-xs sm:text-sm lg:text-base text-gray-400 mt-1 group-hover/stat:text-gray-300 transition-colors duration-300 capitalize">
                              {key}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Desktop view button */}
                    <div className="hidden lg:block pt-6">
                      <motion.button 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.98 }}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-6 py-2 text-sm font-medium text-white flex items-center gap-2 transition-all duration-300"
                      >
                        View Details
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </PinContainer>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='text-center mt-16 sm:mt-24 md:mt-32'
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 rounded-xl blur-xl opacity-70 group-hover:opacity-100 transition duration-500" />
            <div className="relative px-8 sm:px-12 py-4 sm:py-6 bg-black rounded-xl flex items-center gap-3 sm:gap-4 text-base sm:text-lg font-medium border border-white/10 backdrop-blur-xl">
              View Full Portfolio
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <GlowingEffect spread={40} glow={true} proximity={50} />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default OurWork;
