import React from 'react';
import { motion } from 'framer-motion';

const AboutMe = () => {
  const traits = [
    {
      name: 'Proactive',
      icon: '🚀',
      color: 'from-blue-400 to-cyan-300'
    },
    {
      name: 'Design-driven',
      icon: '🎨',
      color: 'from-purple-400 to-pink-300'
    },
    {
      name: 'Detail-oriented',
      icon: '🔍',
      color: 'from-emerald-400 to-teal-300'
    },
    {
      name: 'Growth mindset',
      icon: '🌱',
      color: 'from-orange-400 to-yellow-300'
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

  const itemVariants = {
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

  const traitVariants = {
    hidden: { 
      opacity: 0, 
      x: -30,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/5 rounded-full blur-3xl"></div>
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 text-transparent bg-clip-text">
                About Me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-300 mx-auto rounded-full"></div>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            {/* Card Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Bio Section */}
              <motion.div
                className="text-center mb-10"
                variants={itemVariants}
              >
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
                  I'm <span className="text-cyan-300 font-semibold">Maham</span>, a web and mobile app developer passionate about crafting elegant interfaces and seamless user experiences. I specialize in <span className="text-purple-300 font-medium">React</span>, <span className="text-teal-300 font-medium">Tailwind CSS</span>, <span className="text-pink-300 font-medium">Framer Motion</span>, and <span className="text-blue-300 font-medium">Flutter</span>.
                </p>
              </motion.div>

              {/* Traits Grid */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                variants={containerVariants}
              >
                {traits.map((trait, index) => (
                  <motion.div
                    key={trait.name}
                    className="group relative"
                    variants={traitVariants}
                    whileHover={{ 
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-all duration-300 cursor-pointer">
                      {/* Trait Icon */}
                      <div className="text-2xl md:text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                        {trait.icon}
                      </div>
                      
                      {/* Trait Name */}
                      <h3 className={`text-sm md:text-base font-semibold bg-gradient-to-r ${trait.color} text-transparent bg-clip-text group-hover:text-white transition-colors duration-300`}>
                        {trait.name}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Fun Fact */}
              <motion.div
                className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-2xl p-6 text-center"
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="flex items-center justify-center mb-3">
                  <span className="text-2xl mr-3">✨</span>
                  <h3 className="text-lg font-semibold text-white">Fun Fact</h3>
                  <span className="text-2xl ml-3">✨</span>
                </div>
                <p className="text-gray-300 text-sm md:text-base">
                  I love experimenting with <span className="text-purple-300 font-medium">gradients</span>, <span className="text-pink-300 font-medium">blobs</span>, and <span className="text-cyan-300 font-medium">glassmorphism</span> to create visually stunning interfaces.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
