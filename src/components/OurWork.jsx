import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../libs/utils';

// Optimized project images
const projectImages = [
  "https://images.unsplash.com/photo-1735825764457-ffdf0b5aa5dd?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1733044271325-3017e877218b?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
  "https://plus.unsplash.com/premium_photo-1741005641996-f0e15c7c276b?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1726137569911-bc03e55fd87f?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1642543348745-03b1219733d9?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1665667885671-a9123ebf8773?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3"
];

// Project data - simplified and elegant
const projects = [
  {
    id: 'techvision',
    title: "TechVision AI Platform",
    description: "Next-generation AI platform with real-time data processing and advanced analytics.",
    icon: "🤖",
    gradient: "from-blue-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1735825764457-ffdf0b5aa5dd?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    tags: ["AI/ML", "Analytics", "Enterprise"],
    metrics: { users: "50K+", rating: "4.9", growth: "127%" },
    featured: true
  },
  {
    id: 'trendify',
    title: "Trendify Commerce",
    description: "Revolutionary e-commerce platform with AI-powered recommendations and seamless checkout.",
    icon: "🛍️",
    gradient: "from-purple-500 to-pink-500",
    image: "https://images.unsplash.com/photo-1733044271325-3017e877218b?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    tags: ["E-commerce", "SaaS", "AI"],
    metrics: { sales: "$2M+", conversion: "15%", growth: "89%" },
    featured: true
  },
  {
    id: 'bloom',
    title: "Bloom Interiors",
    description: "Elegant portfolio showcasing interior design projects with immersive visual experiences.",
    icon: "🏡",
    gradient: "from-emerald-500 to-teal-500",
    image: "https://plus.unsplash.com/premium_photo-1741005641996-f0e15c7c276b?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    tags: ["Portfolio", "Design", "3D"],
    metrics: { clients: "200+", projects: "150+", satisfaction: "98%" }
  },
  {
    id: 'launchpad',
    title: "LaunchPad",
    description: "Startup-focused landing page optimized for conversions with A/B testing capabilities.",
    icon: "🚀",
    gradient: "from-orange-500 to-amber-500",
    image: "https://images.unsplash.com/photo-1726137569911-bc03e55fd87f?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    tags: ["Startup", "Landing", "Growth"],
    metrics: { startups: "100+", conversion: "25%", roi: "300%" }
  },
  {
    id: 'fintrack',
    title: "FinTrack Analytics",
    description: "Financial tracking dashboard with real-time data visualization and predictive forecasting.",
    icon: "📊",
    gradient: "from-cyan-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1642543348745-03b1219733d9?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    tags: ["Finance", "Dashboard", "Analytics"],
    metrics: { transactions: "1M+", accuracy: "99.7%", savings: "$1.2M" }
  },
  {
    id: 'healthapp',
    title: "HealthPulse App",
    description: "Mobile health tracking platform with wearable integration and personalized insights.",
    icon: "❤️",
    gradient: "from-red-500 to-rose-500",
    image: "https://images.unsplash.com/photo-1665667885671-a9123ebf8773?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    tags: ["Mobile", "Health", "IoT"],
    metrics: { users: "125K+", engagement: "78%", retention: "92%" }
  }
];

// Filter categories - simplified
const categories = [
  { value: "all", label: "All Projects" },
  { value: "featured", label: "Featured" },
  { value: "AI", label: "AI & ML" },
  { value: "e-commerce", label: "E-commerce" },
  { value: "mobile", label: "Mobile" },
  { value: "design", label: "Design" }
];

// Elegant ProjectCard component
const ProjectCard = React.memo(({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group cursor-pointer"
    >
      <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800 transition-all duration-300 hover:border-gray-600 hover:shadow-2xl hover:shadow-blue-500/10">
        {/* Project Image */}
        <div className="absolute inset-0">
          <img 
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 transition-opacity duration-300 group-hover:opacity-40`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          {/* Top - Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 2).map((tag, i) => (
              <span 
                key={i}
                className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/20"
              >
                {tag}
              </span>
            ))}
            {project.featured && (
              <span className="px-3 py-1 bg-blue-500/80 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                ⭐ Featured
              </span>
            )}
          </div>

          {/* Bottom - Project Info */}
          <div className="space-y-4">
            {/* Title and Icon */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-2xl border border-white/20">
                {project.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                <p className="text-sm text-gray-300 line-clamp-2">{project.description}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(project.metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-lg font-bold text-white">{value}</div>
                  <div className="text-xs text-gray-400 capitalize">{key}</div>
                </div>
              ))}
            </div>

            {/* View Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                y: isHovered ? 0 : 10 
              }}
              transition={{ duration: 0.2 }}
              className="w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl text-white font-medium transition-all duration-200 border border-white/20 hover:border-white/30"
            >
              View Project →
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// Lazy load the project modal
const ProjectModal = lazy(() => import('../components/ProjectModal'));

const OurWork = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Preload images
  useEffect(() => {
    projectImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);
  
  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      if (selectedCategory === "all") return true;
      if (selectedCategory === "featured") return project.featured;
      return project.tags.some(tag => 
        tag.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    });
  }, [selectedCategory]);

  // Handle project click
  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  // Simple animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };

  return (
    <section 
      id="work" 
      className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white py-20 px-4"
    >
      {/* Simple background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Featured
            </span>{" "}
            <span className="text-white">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Crafting digital experiences that inspire, engage, and deliver exceptional results
          </p>
        </motion.div>
        
        {/* Filter Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.value
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>
        
        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <div key={project.id} onClick={() => handleProjectClick(project)}>
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105">
            View Full Portfolio
            <svg className="inline-block ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </motion.div>
      </div>
      
      {/* Project Modal */}
      <Suspense fallback={null}>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={closeModal}
          />
        )}
      </Suspense>
    </section>
  );
};

export default React.memo(OurWork);
