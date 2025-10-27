import { motion } from 'framer-motion';
import { useRef } from 'react';
import Button from './Button';

const HeroSection = () => {
  const containerRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const backgroundVariants = {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-midnight-900 via-deep-violet to-electric-900 animate-gradient bg-300%"
        variants={backgroundVariants}
        animate="animate"
      />

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-electric-500/20 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-40 right-32 w-24 h-24 bg-midnight-400/20 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
        <motion.div
          className="absolute bottom-32 left-1/3 w-20 h-20 bg-electric-400/30 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 4 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-16 h-16 bg-purple-400/30 rounded-full blur-2xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 6 }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Bold Headline */}
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 md:mb-8 leading-tight"
          variants={itemVariants}
        >
          <span className="block bg-gradient-to-r from-electric-400 via-white to-electric-400 bg-clip-text text-transparent font-space-grotesk drop-shadow-2xl">
            Crafting seamless
          </span>
          <span className="block text-white drop-shadow-lg mt-2">
            digital experiences
          </span>
          <span className="block bg-gradient-to-r from-electric-400 via-white to-electric-400 bg-clip-text text-transparent font-space-grotesk drop-shadow-2xl mt-2">
            — Web & Mobile.
          </span>
        </motion.h1>

        {/* Subtext Paragraph */}
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed font-poppins"
          variants={itemVariants}
        >
          Hi, I'm <span className="text-electric-400 font-bold">Maham</span> — a developer who turns ideas into elegant, high-performance apps.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          variants={itemVariants}
        >
          <Button 
            variant="primary" 
            size="lg"
            className="w-full sm:w-auto"
          >
            View Projects
          </Button>
          <Button 
            variant="secondary" 
            size="lg"
            className="w-full sm:w-auto"
          >
            Contact Me
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/60 hover:text-white transition-colors duration-300 cursor-pointer"
        >
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-current rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
