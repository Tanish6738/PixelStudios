import React from 'react';
import { motion } from 'framer-motion';

// Optimized Project Modal component that's lazy loaded for better performance
const ProjectModal = ({ project, onClose, isMobile }) => {
  if (!project) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-4 sm:p-6 md:p-10 backdrop-blur-md bg-black/80 overflow-hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 300,
          mass: 0.8 
        }}
        className="relative w-full max-w-5xl h-[90vh] sm:h-[90vh] bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          className="absolute top-2 xs:top-3 sm:top-4 right-2 xs:right-3 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 border border-white/10 hover:bg-white/10 transition-colors"
          onClick={onClose}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Project hero section */}
        <div className="relative w-full h-44 xs:h-48 sm:h-56 md:h-64 lg:h-[40vh] overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40`} />
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover object-center"
            loading="eager" // Load immediately since it's visible
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          
          <div className="absolute bottom-0 inset-x-0 p-3 xs:p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 mb-1 xs:mb-2 sm:mb-3">
              <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-white/10 to-white/30 backdrop-blur-sm flex items-center justify-center text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl border border-white/20 shadow-xl">
                {project.icon}
              </div>
              <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                {project.title}
              </h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-1.5 xs:gap-2 sm:gap-3 mt-2 xs:mt-3 sm:mt-4">
              {project.tags.slice(0, isMobile ? 3 : project.tags.length).map((tag, i) => (
                <span 
                  key={`modal-tag-${i}`} 
                  className="px-2 xs:px-2.5 sm:px-3 py-0.5 xs:py-1 sm:py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-[10px] xs:text-xs sm:text-sm font-medium text-white border border-white/10"
                >
                  {tag}
                </span>
              ))}
              {isMobile && project.tags.length > 3 && (
                <span className="px-2 xs:px-2.5 sm:px-3 py-0.5 xs:py-1 sm:py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-[10px] xs:text-xs sm:text-sm font-medium text-white border border-white/10">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Project content - simplified rendering for better performance */}
        <div className="h-[calc(90vh-176px)] xs:h-[calc(90vh-192px)] sm:h-[calc(90vh-224px)] md:h-[calc(90vh-256px)] lg:h-[calc(90vh-40vh)] overflow-y-auto p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 overscroll-contain">
          <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
            {project.description}
          </p>
          
          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4 md:gap-5 py-2 xs:py-3 sm:py-4">
            {project.stats && Object.entries(project.stats).map(([key, value]) => (
              <div 
                key={`modal-stat-${key}`} 
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-2 xs:p-3 sm:p-4 text-center hover:bg-white/10 transition-colors duration-200"
              >
                <div className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-white mb-0.5 xs:mb-1 sm:mb-2">{value}</div>
                <div className="text-[10px] xs:text-xs sm:text-sm text-gray-400 capitalize">{key}</div>
              </div>
            ))}
          </div>
          
          {/* Features section */}
          <div>
            <h3 className="text-base xs:text-lg sm:text-xl font-bold text-white mb-2 xs:mb-3 sm:mb-4">Key Features</h3>
            <ul className="space-y-1.5 xs:space-y-2 sm:space-y-3">
              {[...Array(4)].map((_, i) => (
                <li key={`feature-${i}`} className="flex items-start gap-1.5 xs:gap-2 sm:gap-3">
                  <div className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-xs xs:text-sm sm:text-base text-gray-300">
                    {i === 0 && `Advanced ${project.tags[0]} integration with real-time data processing`}
                    {i === 1 && `Seamless user experience with intuitive interface design`}
                    {i === 2 && `Scalable architecture to handle growing business needs`}
                    {i === 3 && `Comprehensive analytics dashboard with actionable insights`}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Technologies used */}
          <div>
            <h3 className="text-base xs:text-lg sm:text-xl font-bold text-white mb-2 xs:mb-3 sm:mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-1.5 xs:gap-2 sm:gap-3">
              {["React", "Next.js", "Tailwind CSS", "Framer Motion", "Node.js"].map((tech) => (
                <span key={tech} className="px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-[10px] xs:text-xs sm:text-sm text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* View project button - simplified for better performance */}
          <div className="pt-2 xs:pt-3 sm:pt-4">
            <a 
              href={project.link} 
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full text-xs xs:text-sm sm:text-base font-medium transition-all duration-200"
            >
              View Live Project
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;