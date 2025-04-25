import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { GlowingEffect } from '../Ui/GlowingEffect';

const projects = [
  {
    id: 'techvision',
    title: "TechVision AI Platform",
    description: "Next-generation AI platform with real-time data processing and advanced analytics that helps businesses transform their operations through intelligent automation and predictive insights.",
    icon: "🤖",
    gradient: "from-[#0EA5E9] via-[#22D3EE] to-[#818CF8]",
    image: "https://images.unsplash.com/photo-1735825764457-ffdf0b5aa5dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    link: "/projects/tech-vision",
    tags: ["AI/ML", "Data Analytics", "Enterprise"],
    stats: {
      users: "50K+",
      rating: "4.9",
      growth: "127%"
    },
    featured: true
  },
  {
    id: 'trendify',
    title: "Trendify Commerce",
    description: "Revolutionary e-commerce platform with AI-powered recommendations and seamless checkout experience, enabling businesses to boost conversions and deliver personalized shopping journeys.",
    icon: "🛍️",
    gradient: "from-[#F472B6] via-[#E879F9] to-[#C084FC]",
    image: "https://images.unsplash.com/photo-1733044271325-3017e877218b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
    link: "/projects/trendify",
    tags: ["E-commerce", "SaaS", "AI"],
    stats: {
      sales: "$2M+",
      conversion: "15%",
      growth: "89%"
    },
    featured: true
  },
  {
    id: 'bloom',
    title: "Bloom Interiors",
    description: "An elegant portfolio site for an interior designer showcasing their projects with immersive visual experiences and custom 3D room visualizations to help clients envision their future spaces.",
    icon: "🏡",
    gradient: "from-emerald-500 to-teal-500",
    image: "https://plus.unsplash.com/premium_photo-1741005641996-f0e15c7c276b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
    link: "/projects/bloom",
    tags: ["Portfolio", "Design", "3D"],
    stats: {
      clients: "200+",
      projects: "150+",
      satisfaction: "98%"
    }
  },
  {
    id: 'launchpad',
    title: "LaunchPad",
    description: "A startup-focused landing page built for conversions with A/B testing, heat mapping, and performance optimizations that help new ventures capture leads and showcase their products effectively.",
    icon: "🚀",
    gradient: "from-orange-500 to-amber-500",
    image: "https://images.unsplash.com/photo-1726137569911-bc03e55fd87f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D",
    link: "/projects/launchpad",
    tags: ["Startup", "Landing Page", "Growth"],
    stats: {
      startups: "100+",
      conversion: "25%",
      roi: "300%"
    }
  },
  {
    id: 'fintrack',
    title: "FinTrack Analytics",
    description: "Financial tracking and analytics dashboard with real-time data visualization and predictive forecasting to help businesses make informed financial decisions.",
    icon: "📊",
    gradient: "from-cyan-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1642543348745-03b1219733d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    link: "/projects/fintrack",
    tags: ["Finance", "Dashboard", "Analytics"],
    stats: {
      transactions: "1M+",
      accuracy: "99.7%",
      savings: "$1.2M"
    }
  },
  {
    id: 'healthapp',
    title: "HealthPulse App",
    description: "Mobile health tracking platform with wearable integration, personalized insights, and telehealth features that empower users to take control of their wellbeing.",
    icon: "❤️",
    gradient: "from-red-500 to-rose-500",
    image: "https://images.unsplash.com/photo-1665667885671-a9123ebf8773?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    link: "/projects/healthpulse",
    tags: ["Mobile", "Health", "IoT"],
    stats: {
      users: "125K+",
      engagement: "78%",
      retention: "92%"
    }
  }
];

// Filter options
const categories = [
  { value: "all", label: "All Projects" },
  { value: "featured", label: "Featured" },
  { value: "AI", label: "AI & Machine Learning" },
  { value: "e-commerce", label: "E-commerce" },
  { value: "mobile", label: "Mobile Apps" },
  { value: "saas", label: "SaaS" }
];

const OurWork = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const containerRef = useRef(null);
  
  // Parallax effects with optimized values for smoother transitions
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [1, 1, 0.6, 0.2]);

  // Filter projects based on selected category
  const filteredProjects = projects.filter(project => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "featured") return project.featured;
    
    return project.tags.some(tag => 
      tag.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  });

  // Handle project selection
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  // Close project modal
  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };
  
  // Handle key press for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedProject) {
        closeProjectModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  // Animation variants for smoother transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.02,
        duration: 0.4
      }
    },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.35 } },
    exit: { y: -10, opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <section 
      id="work" 
      ref={containerRef}
      className='relative w-full min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#131313] text-white py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden'
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]" />
        
        <motion.div style={{ y: y1, opacity }} className="absolute top-40 -left-20 w-72 h-72 md:w-96 md:h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[60px] sm:blur-[80px] opacity-50" />
        <motion.div style={{ y: y2, opacity }} className="absolute top-60 -right-20 w-72 h-72 md:w-96 md:h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[60px] sm:blur-[80px] opacity-50" />
        <motion.div style={{ y: y3, opacity }} className="hidden md:block absolute bottom-40 left-1/2 w-[20rem] sm:w-[30rem] h-[20rem] sm:h-[30rem] bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[80px] sm:blur-[100px] opacity-40" />
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:4rem_4rem]"></div>
      </div>

      <div className='max-w-[90rem] mx-auto relative'>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16 lg:mb-24 relative"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-sm md:text-base font-medium text-blue-400 uppercase tracking-wider mb-4 block"
          >
            Our Portfolio
          </motion.span>
          
          <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 relative inline-block">
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-500">Featured</span>{" "}
            <span className="inline-block relative">
              Projects
              <motion.div 
                className="absolute -bottom-1 sm:-bottom-2 lg:-bottom-4 left-0 right-0 h-1 lg:h-2"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
              </motion.div>
            </span>
          </h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Transforming Ideas into Digital Reality with Innovation and Excellence
          </motion.p>
        </motion.div>
        
        {/* Filter categories - more responsive */}
        <div className="flex flex-wrap justify-center gap-2 xs:gap-3 mb-10 sm:mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.value
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white/10 text-gray-300 hover:bg-white/15 backdrop-blur-sm"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Projects grid with optimized transitions */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-12 gap-4 xs:gap-5 sm:gap-6 lg:gap-7 px-2 xs:px-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              // Determine grid span based on index and featured status
              const gridClass = 
                index === 0 ? "xs:col-span-2 lg:col-span-8 lg:row-span-2" : 
                index === 1 ? "lg:col-span-4 lg:row-span-1" :
                index === 2 ? "xs:col-span-2 sm:col-span-1 lg:col-span-5" :
                index === 3 ? "xs:col-span-2 sm:col-span-1 lg:col-span-7" :
                "lg:col-span-6";
                
              return (
                <motion.div
                  layout
                  key={project.id}
                  variants={itemVariants}
                  exit="exit"
                  className={`${gridClass}`}
                >
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.5 }}
                    onClick={() => handleProjectClick(project)}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className="group h-full cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-br from-black/60 to-black/80 border border-white/10 backdrop-blur-sm"
                  >
                    {/* Project image */}
                    <div className="relative w-full h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-300 z-0`} />
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
                      />
                      
                      {/* Tag pills */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                        {project.tags.slice(0, window.innerWidth < 640 ? 1 : 3).map((tag, i) => (
                          <span 
                            key={`${project.id}-tag-${i}`} 
                            className="px-2 sm:px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > (window.innerWidth < 640 ? 1 : 3) && (
                          <span className="px-2 sm:px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/10">
                            +{project.tags.length - (window.innerWidth < 640 ? 1 : 3)}
                          </span>
                        )}
                      </div>
                      
                      {/* Hover overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300 flex items-end z-10`}>
                        <div className="w-full p-4 sm:p-6">
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-white/10 to-white/30 backdrop-blur-sm flex items-center justify-center text-lg sm:text-xl md:text-2xl border border-white/20 shadow-xl">
                              {project.icon}
                            </div>
                            <h3 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                              {project.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Project info */}
                    <div className="p-4 sm:p-6">
                      <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3">
                        {project.description}
                      </p>
                      
                      {/* Stats display */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-4">
                        {project.stats && Object.entries(project.stats).map(([key, value]) => (
                          <div key={`${project.id}-stat-${key}`} className="text-center group/stat">
                            <div className="text-base sm:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300 group-hover/stat:to-blue-400 transition-all duration-200">
                              {value}
                            </div>
                            <div className="text-[10px] xs:text-xs text-gray-500 mt-1 group-hover/stat:text-gray-400 transition-colors duration-200 capitalize">
                              {key}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* View button - only visible on hover/touch */}
                      <div className={`mt-4 sm:mt-6 transition-all duration-300 transform ${hoveredProject === project.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className="flex items-center justify-between">
                          <span className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2">
                            <span>View Details</span>
                            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </span>
                          <GlowingEffect spread={80} glow={true} proximity={100} inactiveZone={0.05} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='text-center mt-12 sm:mt-16 lg:mt-20'
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition duration-300" />
            <div className="relative px-6 xs:px-8 sm:px-10 py-3 sm:py-4 bg-black rounded-xl flex items-center gap-2 sm:gap-3 text-sm xs:text-base sm:text-lg font-medium border border-white/10 backdrop-blur-xl">
              Explore Full Portfolio
              <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:translate-x-1.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <GlowingEffect spread={40} glow={true} proximity={50} />
            </div>
          </motion.button>
        </motion.div>
      </div>
      
      {/* Project detail modal with faster transitions */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 backdrop-blur-md bg-black/80 overflow-hidden"
            onClick={closeProjectModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ 
                type: "spring", 
                damping: 20, 
                stiffness: 350,
                mass: 0.8
              }}
              className="relative w-full max-w-5xl h-[85vh] sm:h-[90vh] bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                className="absolute top-4 right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 border border-white/10 hover:bg-white/10 transition-colors"
                onClick={closeProjectModal}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Project hero - responsive */}
              <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-[40vh]">
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.gradient} opacity-40`} />
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 md:p-8 lg:p-10">
                  <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-white/10 to-white/30 backdrop-blur-sm flex items-center justify-center text-xl sm:text-2xl md:text-3xl border border-white/20 shadow-xl">
                      {selectedProject.icon}
                    </div>
                    <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                      {selectedProject.title}
                    </h2>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
                    {selectedProject.tags.map((tag, i) => (
                      <span 
                        key={`modal-tag-${i}`} 
                        className="px-2 xs:px-3 py-1 sm:py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-white border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Project content - better responsive handling */}
              <div className="h-[calc(85vh-224px)] sm:h-[calc(90vh-288px)] md:h-[calc(90vh-320px)] lg:h-[calc(90vh-40vh)] overflow-y-auto p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 space-y-6 sm:space-y-8">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                  {selectedProject.description}
                </p>
                
                {/* Stats cards */}
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4 md:gap-6 py-4 sm:py-6">
                  {selectedProject.stats && Object.entries(selectedProject.stats).map(([key, value]) => (
                    <div 
                      key={`modal-stat-${key}`} 
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4 md:p-6 text-center hover:bg-white/10 transition-colors duration-200"
                    >
                      <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">{value}</div>
                      <div className="text-xs sm:text-sm text-gray-400 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
                
                {/* Features section */}
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">Key Features</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <li key={`feature-${i}`} className="flex items-start gap-2 sm:gap-3">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm sm:text-base text-gray-300">
                          {i === 0 && `Advanced ${selectedProject.tags[0]} integration with real-time data processing`}
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
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2 xs:gap-3">
                    {["React", "Next.js", "Tailwind CSS", "Framer Motion", "Node.js", "MongoDB"].map((tech) => (
                      <span key={tech} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-xs sm:text-sm text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* View project button */}
                <div className="pt-4 sm:pt-6">
                  <a 
                    href={selectedProject.link} 
                    className="inline-block bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-200"
                  >
                    View Live Project
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Add CSS for custom xs breakpoint */}
      <style jsx>{`
        @media (min-width: 480px) {
          .xs\\:text-base { font-size: 1rem; line-height: 1.5rem; }
          .xs\\:text-xl { font-size: 1.25rem; line-height: 1.75rem; }
          .xs\\:text-2xl { font-size: 1.5rem; line-height: 2rem; }
          .xs\\:px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
          .xs\\:px-4 { padding-left: 1rem; padding-right: 1rem; }
          .xs\\:px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
          .xs\\:px-8 { padding-left: 2rem; padding-right: 2rem; }
          .xs\\:p-5 { padding: 1.25rem; }
          .xs\\:col-span-2 { grid-column: span 2 / span 2; }
          .xs\\:col-span-3 { grid-column: span 3 / span 3; }
          .xs\\:gap-3 { gap: 0.75rem; }
          .xs\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .xs\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .xs\\:text-xs { font-size: 0.75rem; line-height: 1rem; }
          .xs\\:h-56 { height: 14rem; }
        }
      `}</style>
    </section>
  );
};

export default OurWork;
