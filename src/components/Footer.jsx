import React from 'react';
import { motion } from 'framer-motion';
import { GlowingEffect } from '../Ui/GlowingEffect';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Blog', href: '#' },
    ],
    services: [
      { name: 'Web Design', href: '#' },
      { name: 'Development', href: '#' },
      { name: 'UI/UX Design', href: '#' },
      { name: 'SEO', href: '#' },
    ],
    social: [
      { name: 'Twitter', href: '#', icon: 'twitter.svg' },
      { name: 'LinkedIn', href: '#', icon: 'linkedin.svg' },
      { name: 'GitHub', href: '#', icon: 'github.svg' },
      { name: 'Instagram', href: '#', icon: 'instagram.svg' },
    ]
  };

  return (
    <footer className="relative bg-gradient-to-b from-black to-slate-950 text-white">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.1),rgba(0,0,0,0))]" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-25" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Brand section */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                PixelCraft Studios
              </h2>
              <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                Crafting digital experiences that inspire, engage, and deliver results.
              </p>
            </motion.div>
            
            {/* Newsletter subscription */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-500" />
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button className="mt-2 w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-colors duration-200">
                  Subscribe to Newsletter
                </button>
              </div>
            </div>
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([section, links], index) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold capitalize">{section}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
                    >
                      {link.icon && (
                        <img src={link.icon} alt="" className="w-4 h-4" />
                      )}
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="relative py-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} PixelCraft Studios. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
            </div>
          </div>
          <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
