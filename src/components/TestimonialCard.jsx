import React from 'react';
import { motion } from 'framer-motion';

const TestimonialCard = ({ testimonial }) => {
  // Generate star rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-500'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-700"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-cyan-600/5" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Profile Image */}
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-600">
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Client Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{testimonial.name}</h3>
              <p className="text-sm text-gray-400 mb-2">{testimonial.role}</p>
              
              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {renderStars(testimonial.rating)}
              </div>
            </div>
          </div>
          
          {/* Company Badge */}
          <div className="px-4 py-2 bg-gray-800 rounded-lg border border-gray-600">
            <span className="text-sm font-medium text-gray-300">
              {testimonial.company}
            </span>
          </div>
        </div>
        
        {/* Quote Icon */}
        <div className="text-blue-400/30 mb-4">
          <svg 
            className="w-12 h-12" 
            viewBox="0 0 32 32" 
            fill="currentColor"
          >
            <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
          </svg>
        </div>
        
        {/* Testimonial Content */}
        <div className="flex-grow">
          <p className="text-lg text-gray-300 leading-relaxed">
            "{testimonial.content}"
          </p>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-full" />
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
