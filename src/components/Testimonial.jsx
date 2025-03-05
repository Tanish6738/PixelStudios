import React from 'react'
import Folder from '../Ui/Folder'

const Testimonial = () => {
  const testimonials = [
    {
      rating: "⭐️⭐️⭐️⭐️⭐️",
      text: "PixelCraft Studios transformed our brand with a stunning, high-performing website!",
      author: "Alex M., CEO, TechVision",
      avatar: "https://images.unsplash.com/photo-1741082212669-4566cf0077f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
    },
    {
      rating: "⭐️⭐️⭐️⭐️⭐️",
      text: "Their attention to detail and design expertise took our UX to the next level!",
      author: "Sarah K., Founder, Bloom Interiors",
      avatar: "https://images.unsplash.com/photo-1741082212669-4566cf0077f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
    },
    {
      rating: "⭐️⭐️⭐️⭐️⭐️",
      text: "Working with PixelCraft Studios was a seamless experience that exceeded our expectations in every way!",
      author: "John P., COO, Designify",
      avatar: "https://images.unsplash.com/photo-1741082212669-4566cf0077f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
    }
  ];

  const TestimonialCard = ({ rating, text, author, avatar }) => (
    <div className="p-4 sm:p-6 bg-white/95 rounded-lg w-3/4 h-full flex flex-col justify-between shadow-lg">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
          <img src={avatar} alt={author} className="w-16 h-16 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-blue-100" />
          <div className="flex flex-col">
            <div className="text-lg sm:text-xl font-bold text-amber-400">{rating}</div>
            <p className="text-sm text-gray-600 mt-1">— {author}</p>
          </div>
        </div>
        <p className="text-base sm:text-lg text-gray-800 mb-4 leading-relaxed font-medium line-clamp-4 sm:line-clamp-none">"{text}"</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 pt-3 sm:pt-4 border-t border-gray-100">
        <span className="bg-blue-100 text-blue-600 px-2 sm:px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">Verified Client</span>
        <span className="text-gray-400 text-xs sm:text-sm">2 days ago</span>
      </div>
    </div>
  );

  const cardTextures = [
    'radial-gradient(circle at top right, #f0f9ff 0%, transparent 60%)',
    'radial-gradient(circle at top left, #f0f9ff 0%, transparent 60%)',
    'radial-gradient(circle at bottom right, #f0f9ff 0%, transparent 60%)'
  ];

  const cardStyles = [
    { 
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      background: 'linear-gradient(to bottom right, white, #fafafa)'
    },
    { 
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      background: 'linear-gradient(to bottom left, white, #fafafa)'
    },
    { 
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      background: 'linear-gradient(to top right, white, #fafafa)'
    }
  ];

  return (
    <div id="testimonials" className="py-12 sm:py-20 px-4 relative overflow-hidden bg-gradient-to-b from-slate-950 to-gray-800">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 px-4">
          We Build More Than Websites – <span className="text-blue-600">We Build Relationships</span>
        </h2>
        
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="text-center px-4">
            <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">Click the folder to explore our client testimonials</p>
            
            <div className="relative h-[250px] sm:h-[300px] md:h-[400px] flex items-center justify-center">
              <Folder
                color="#4F46E5"
                size={1.5}
                title="Testimonials"
                items={testimonials.map((testimonial) => (
                  <TestimonialCard {...testimonial} />
                ))}
                folderTexture="/folder-texture.png"
                cardTextures={cardTextures}
                cardStyles={cardStyles}
                className="hover:cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <button className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl text-base sm:text-lg font-medium">
            🔵 Read More Reviews
          </button>
        </div>
      </div>
    </div>
  );
}

export default Testimonial
