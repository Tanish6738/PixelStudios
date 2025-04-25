import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlowingEffect } from '../Ui/GlowingEffect';

const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const testimonials = [
    {
      rating: 5,
      text: "PixelCraft Studios transformed our brand with a stunning, high-performing website! The attention to detail and innovative approach exceeded our expectations.",
      author: "Alex M.",
      position: "CEO",
      company: "TechVision",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-blue-600/20 via-blue-400/10 to-transparent"
    },
    {
      rating: 5,
      text: "Their attention to detail and design expertise took our UX to the next level! The team was responsive, creative, and delivered ahead of schedule.",
      author: "Sarah K.",
      position: "Founder",
      company: "Bloom Interiors",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-purple-600/20 via-purple-400/10 to-transparent"
    },
    {
      rating: 5,
      text: "Working with PixelCraft Studios was a seamless experience that exceeded our expectations in every way! They transformed our vision into reality.",
      author: "John P.",
      position: "COO",
      company: "Designify",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-emerald-600/20 via-emerald-400/10 to-transparent"
    },
    {
      rating: 5,
      text: "The team at PixelCraft Studios delivered an exceptional e-commerce platform that has increased our conversions by 35%. Incredible work!",
      author: "Emily R.",
      position: "Marketing Director",
      company: "StyleHub",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgGradient: "from-amber-600/20 via-amber-400/10 to-transparent"
    }
  ];

  // Auto-rotate testimonials with optimized interval
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Faster rotation
    
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  // Pause autoplay when user interacts
  const handleManualChange = (index) => {
    setActiveIndex(index);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 8000); // Shorter pause time
  };

  // Animation variants for smoother transitions
  const fadeInVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.35 } // Faster animation
    }
  };

  const quoteVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.4 } // Faster animation
    }
  };

  return (
    <section 
      id="testimonials" 
      className="relative min-h-screen py-20 sm:py-24 md:py-28 lg:py-32 px-4 overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-20 w-60 sm:w-72 h-60 sm:h-72 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[60px] sm:blur-[80px] opacity-50 animate-blob" />
        <div className="absolute top-1/2 -right-20 w-64 sm:w-80 h-64 sm:h-80 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[70px] sm:blur-[100px] opacity-40 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-52 sm:w-64 h-52 sm:h-64 bg-emerald-500/20 rounded-full mix-blend-screen filter blur-[60px] sm:blur-[80px] opacity-30 animate-blob animation-delay-4000" />
        
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:4rem_4rem]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <motion.span 
            variants={fadeInVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-sm md:text-base font-medium text-blue-400 uppercase tracking-wider mb-3 sm:mb-4 block"
          >
            Client Stories
          </motion.span>
          
          <motion.h2 
            variants={fadeInVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 mb-4 sm:mb-6"
          >
            Building Lasting Relationships
          </motion.h2>
          
          <motion.div 
            variants={fadeInVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
              See what our clients have to say about their experience working with our team
            </p>
          </motion.div>
        </div>
        
        {/* Testimonial Carousel - Improved responsiveness */}
        <div className="relative h-[26rem] sm:h-[28rem] md:h-[30rem] lg:h-[32rem] max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={`testimonial-${index}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={activeIndex === index ? { 
                  opacity: 1, 
                  scale: 1,
                  y: 0, 
                  transition: { 
                    type: "spring",
                    stiffness: 350, // Increased stiffness for faster animation
                    damping: 26,
                    mass: 0.85 // Lower mass for quicker movement
                  } 
                } : { 
                  opacity: 0, 
                  scale: 0.9,
                  y: 20, 
                  transition: { 
                    duration: 0.3 // Faster exit
                  } 
                }}
                exit={{ opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.25 } }}
                className={`absolute inset-0 ${activeIndex === index ? "z-20" : "z-10"}`}
              >
                <div className="flex flex-col md:flex-row h-full items-center gap-6 sm:gap-8 md:gap-10 lg:gap-16">
                  {/* Left side: Big quote and image - More responsive */}
                  <div className="relative w-full md:w-1/2 h-56 sm:h-60 md:h-full overflow-hidden rounded-2xl order-2 md:order-1">
                    <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.bgGradient} opacity-80`} />
                    
                    <div className="relative h-full flex items-center justify-center p-5 sm:p-6 md:p-8 lg:p-10">
                      <motion.div 
                        variants={quoteVariants}
                        initial="initial"
                        animate="animate"
                        className="absolute top-5 sm:top-6 md:top-8 left-5 sm:left-6 md:left-8 text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white/10 font-serif"
                      >
                        "
                      </motion.div>
                      
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-xl mx-auto">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                      
                      <motion.div 
                        variants={quoteVariants}
                        initial="initial"
                        animate="animate"
                        className="absolute bottom-5 sm:bottom-6 md:bottom-8 right-5 sm:right-6 md:right-8 text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white/10 font-serif rotate-180"
                      >
                        "
                      </motion.div>
                    </div>
                    
                    <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-gray-900/90 to-transparent" />
                  </div>
                  
                  {/* Right side: Content - Better text responsiveness */}
                  <div className="w-full md:w-1/2 h-auto md:h-full flex flex-col justify-center p-4 sm:p-6 order-1 md:order-2">
                    <div className="h-full flex flex-col justify-center space-y-4 sm:space-y-6">
                      <div className="mb-2 sm:mb-4">
                        <div className="flex items-center mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-5 h-5 sm:w-6 sm:h-6 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-white/90 italic"
                      >
                        "{testimonial.text}"
                      </motion.p>
                      
                      <div className="mt-4 sm:mt-6">
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.4 }}
                          className="space-y-1"
                        >
                          <h4 className="text-lg sm:text-xl text-white font-semibold">
                            {testimonial.author}
                          </h4>
                          <p className="text-sm sm:text-base text-gray-400">
                            {testimonial.position}, <span className="text-blue-400">{testimonial.company}</span>
                          </p>
                        </motion.div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4 sm:mt-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white">
                          Verified Client
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          April 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Navigation dots - Improved touch target size */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
            {testimonials.map((_, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => handleManualChange(index)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                  activeIndex === index 
                    ? 'bg-blue-500 w-6 sm:w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation arrows - More responsive */}
          <button
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white z-30 hover:bg-white/20 transition-colors duration-200"
            onClick={() => handleManualChange((activeIndex - 1 + testimonials.length) % testimonials.length)}
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white z-30 hover:bg-white/20 transition-colors duration-200"
            onClick={() => handleManualChange((activeIndex + 1) % testimonials.length)}
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* CTA Section - Improved responsiveness */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-16 sm:mt-20 md:mt-24 text-center"
        >
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full opacity-70 group-hover:opacity-100 blur-md sm:blur-lg transition-all duration-300 group-hover:duration-200 animate-pulse-slow"></div>
            <button className="relative z-10 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium text-base sm:text-lg transition-colors duration-200 inline-flex items-center gap-2 group">
              <span>View All Client Success Stories</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <GlowingEffect spread={60} glow={true} disabled={false} proximity={80} inactiveZone={0} />
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Add Tailwind animation keyframes with optimized animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.1); }
          66% { transform: translate(-15px, 15px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-blob {
          animation: blob 15s infinite alternate; /* Faster animation */
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; /* Faster pulse */
        }
        
        /* Add custom xs breakpoint */
        @media (min-width: 480px) {
          .xs\\:text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
          .xs\\:px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
          .xs\\:px-4 { padding-left: 1rem; padding-right: 1rem; }
          .xs\\:px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
        }
      `}</style>
    </section>
  );
};

export default Testimonial;
