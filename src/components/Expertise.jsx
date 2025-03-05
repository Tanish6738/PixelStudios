import React from 'react'
import { motion } from 'framer-motion'
import { HoverEffect } from '../Ui/CardHoverEffect'

const Expertise = () => {
  const services = [
    {
      title: 'Custom Web Design',
      description: 'Stunning, responsive, and user-friendly designs.',
      link: '#',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2069&auto=format&fit=crop'
    },
    {
      title: 'UI/UX Optimization',
      description: 'Pixel-perfect interfaces for seamless user experiences.',
      link: '#',
      image: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: 'E-commerce Development',
      description: 'High-performing online stores built to scale.',
      link: '#',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: 'Branding & Identity',
      description: 'Logos, typography, and colors that define your brand.',
      link: '#',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: 'SEO & Performance',
      description: 'Optimized for speed, search rankings, and conversions.',
      link: '#',
      image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: 'Web Applications',
      description: 'Custom web apps designed for your unique needs.',
      link: '#',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2070&auto=format&fit=crop'
    },
  ]

  return (
    <div className='w-full min-h-screen bg-[#0a0a0a] text-white py-10 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-x-hidden'>
      <div className='max-w-7xl mx-auto'>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20 lg:mb-28"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 sm:mb-8 lg:mb-10"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
              Our Expertise
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-200 mb-6 sm:mb-8"
          >
            We Design, We Develop, We Elevate!
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            We specialize in creating powerful and visually striking digital experiences 
            that leave a lasting impact on your audience and drive real business results.
          </motion.p>

          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/30 to-transparent blur-3xl transform rotate-12 opacity-30" />
          </div>
        </motion.div>

        <HoverEffect 
          items={services} 
          className="gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4" 
        />
      </div>
    </div>
  )
}

export default Expertise
