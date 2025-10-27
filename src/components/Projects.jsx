import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '🛒',
      gradient: 'from-blue-500 to-cyan-400',
      borderGradient: 'from-blue-400/50 to-cyan-300/50'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application built with React and Firebase. Real-time updates, team collaboration, and project tracking.',
      techStack: ['React', 'Firebase', 'Tailwind CSS', 'Framer Motion'],
      image: '📋',
      gradient: 'from-purple-500 to-pink-400',
      borderGradient: 'from-purple-400/50 to-pink-300/50'
    },
    {
      id: 3,
      title: 'Weather Forecast App',
      description: 'A beautiful weather application built with Flutter. Features location-based forecasts, detailed weather data, and smooth animations.',
      techStack: ['Flutter', 'Dart', 'API Integration', 'Animations'],
      image: '🌤️',
      gradient: 'from-emerald-500 to-teal-400',
      borderGradient: 'from-emerald-400/50 to-teal-300/50'
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website showcasing my work. Built with React, Tailwind CSS, and Framer Motion for smooth animations.',
      techStack: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
      image: '💼',
      gradient: 'from-orange-500 to-yellow-400',
      borderGradient: 'from-orange-400/50 to-yellow-300/50'
    },
    {
      id: 5,
      title: 'Social Media Dashboard',
      description: 'A comprehensive dashboard for managing multiple social media accounts. Built with Vue.js and includes analytics and scheduling features.',
      techStack: ['Vue.js', 'Node.js', 'Express', 'PostgreSQL'],
      image: '📊',
      gradient: 'from-indigo-500 to-purple-400',
      borderGradient: 'from-indigo-400/50 to-purple-300/50'
    },
    {
      id: 6,
      title: 'Mobile Banking App',
      description: 'A secure mobile banking application built with Flutter. Features include biometric authentication, transaction history, and bill payments.',
      techStack: ['Flutter', 'Dart', 'Firebase', 'Biometric Auth'],
      image: '🏦',
      gradient: 'from-red-500 to-pink-400',
      borderGradient: 'from-red-400/50 to-pink-300/50'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-pink-500/10 to-cyan-500/5 rounded-full blur-3xl"></div>
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 text-transparent bg-clip-text">
              Featured Projects
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            A showcase of my recent work and creative solutions
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-300 mx-auto rounded-full mt-4"></div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="group relative"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              {/* Card */}
              <div className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/20 relative overflow-hidden h-full flex flex-col ${project.borderGradient} hover:shadow-2xl transition-all duration-300`}>
                {/* Gradient Background Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`}></div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Project Icon */}
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {project.image}
                  </div>
                  
                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                    {project.title}
                  </h3>
                  
                  {/* Project Description */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 text-xs font-medium bg-gradient-to-r ${project.gradient} text-white rounded-full bg-opacity-20 border border-white/20`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <motion.button
                    className={`w-full py-3 px-4 bg-gradient-to-r ${project.gradient} text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Project
                  </motion.button>
                </div>
                
                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
