import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Button from './Button';
import ThreeScene from './ThreeScene';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-15, 15, -15],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Beautiful Gradient Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-deep-violet via-midnight-900 to-deep-blue animate-gradient bg-300%"
        style={{ y }}
      />
      
      {/* Animated SVG Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-96 h-96"
          variants={floatingVariants}
          animate="animate"
        >
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <motion.path
              d="M80,200 Q200,80 320,200 T560,200"
              fill="url(#grad1)"
              filter="blur(40px)"
              animate={{
                d: [
                  "M80,200 Q200,80 320,200 T560,200",
                  "M80,200 Q200,320 320,200 T560,200",
                  "M80,200 Q200,80 320,200 T560,200"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <motion.path
              d="M200,80 Q320,200 200,320 T200,560"
              fill="url(#grad2)"
              filter="blur(40px)"
              animate={{
                d: [
                  "M200,80 Q320,200 200,320 T200,560",
                  "M200,80 Q80,200 200,320 T200,560",
                  "M200,80 Q320,200 200,320 T200,560"
                ]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 4 }}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <radialGradient id="grad3" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
              </radialGradient>
            </defs>
            <motion.circle
              cx="200"
              cy="200"
              r="150"
              fill="url(#grad3)"
              filter="blur(30px)"
              animate={{
                r: [150, 180, 150],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </div>

      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ opacity }}
      >
        <motion.div
          className="text-center max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Headline */}
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight"
            variants={itemVariants}
          >
            <motion.span 
              className="bg-gradient-to-r from-neon-purple via-electric-400 to-neon-teal bg-clip-text text-transparent font-space-grotesk drop-shadow-2xl"
              animate={{
                textShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.5)",
                  "0 0 30px rgba(20, 184, 166, 0.5)",
                  "0 0 20px rgba(168, 85, 247, 0.5)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {"{{TEMPLATE_HERO_HEADLINE}}"}
            </motion.span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            className="text-2xl md:text-3xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed font-poppins"
            variants={itemVariants}
          >
            {"{{TEMPLATE_HERO_SUBTEXT}}"}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
            variants={itemVariants}
          >
            <Button variant="primary" size="lg">
              View Projects
            </Button>
            <Button variant="secondary" size="lg">
              Contact Me
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 3D Cube - Floating Avatar */}
      <motion.div 
        className="absolute top-1/2 right-10 transform -translate-y-1/2 hidden lg:block w-32 h-32"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 1, type: "spring" }}
      >
        <ThreeScene />
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-8 h-12 border-2 border-neon-teal/50 rounded-full flex justify-center backdrop-blur-sm bg-black/20">
          <motion.div
            className="w-2 h-4 bg-gradient-to-b from-neon-teal to-neon-purple rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
