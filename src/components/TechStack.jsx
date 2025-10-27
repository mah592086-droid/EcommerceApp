import React from 'react';
import { motion } from 'framer-motion';

const TechStack = () => {
  const technologies = [
    {
      name: 'React',
      icon: '⚛️',
      color: 'from-blue-400 to-cyan-300',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-400/30',
      glowColor: 'hover:shadow-blue-400/50'
    },
    {
      name: 'Vite',
      icon: '⚡',
      color: 'from-purple-400 to-pink-300',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-400/30',
      glowColor: 'hover:shadow-purple-400/50'
    },
    {
      name: 'Tailwind CSS',
      icon: '🎨',
      color: 'from-teal-400 to-emerald-300',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-400/30',
      glowColor: 'hover:shadow-teal-400/50'
    },
    {
      name: 'Framer Motion',
      icon: '🎭',
      color: 'from-pink-400 to-rose-300',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-400/30',
      glowColor: 'hover:shadow-pink-400/50'
    },
    {
      name: 'Cursor AI',
      icon: '🤖',
      color: 'from-indigo-400 to-violet-300',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-400/30',
      glowColor: 'hover:shadow-indigo-400/50'
    },
    {
      name: 'Flutter',
      icon: '📱',
      color: 'from-cyan-400 to-blue-300',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-400/30',
      glowColor: 'hover:shadow-cyan-400/50'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="tech" className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-300 text-transparent bg-clip-text">
              Technologies I Love
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Core tools and frameworks I use to bring ideas to life
          </p>
        </motion.div>

        {/* Tech Stack Carousel */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Scrollable Container */}
          <div className="overflow-x-auto scrollbar-hide py-4">
            <div className="flex gap-6 pb-4 pt-4 min-w-max">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative min-w-[200px] max-w-[200px] ${tech.bgColor} backdrop-blur-sm border ${tech.borderColor} rounded-2xl p-6 cursor-pointer transition-all duration-300 ease-in-out ${tech.glowColor} hover:shadow-2xl`}
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {/* Icon */}
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {tech.icon}
                    </div>
                    
                    {/* Name */}
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                      {tech.name}
                    </h3>
                    
                    {/* Gradient Accent */}
                    <div className={`h-1 w-12 mx-auto bg-gradient-to-r ${tech.color} rounded-full group-hover:w-16 transition-all duration-300`}></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {technologies.map((_, index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  initial={{ opacity: 0.3 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm md:text-base">
            Swipe or scroll horizontally to explore more technologies
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
