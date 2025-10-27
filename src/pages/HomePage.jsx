import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Navigation from '../components/Navigation';
import TechStack from '../components/TechStack';
import AboutMe from '../components/AboutMe';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const HomePage = () => {
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
    <>
    {/* SEO Setup */}
    <Helmet>
      <title>{"{{TEMPLATE_TITLE}}"}</title>
      <meta name="description" content={"{{TEMPLATE_DESCRIPTION}}"} />
      <meta name="keywords" content={"{{TEMPLATE_KEYWORDS}}"} />
      <meta name="author" content={"{{TEMPLATE_AUTHOR_NAME}}"} />
      <meta property="og:title" content={"{{TEMPLATE_TITLE}}"} />
      <meta property="og:description" content={"{{TEMPLATE_DESCRIPTION}}"} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={"{{TEMPLATE_TITLE}}"} />
      <meta name="twitter:description" content={"{{TEMPLATE_DESCRIPTION}}"} />
    </Helmet>

    {/* Navigation */}
    <Navigation />
    
    <section id="home" className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 flex items-center justify-center px-6 overflow-hidden">
      {/* Animated SVG Blobs Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-Left Blob */}
        <motion.div
          className="absolute -top-10 -left-10 md:-top-20 md:-left-20 w-60 h-60 md:w-80 md:h-80 opacity-20"
          variants={floatingVariants}
          animate="animate"
        >
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <linearGradient id="blob1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              d="M80,200 Q200,80 320,200 T560,200 L560,400 L80,400 Z"
              fill="url(#blob1)"
              filter="blur(40px)"
            />
          </svg>
        </motion.div>

        {/* Bottom-Right Blob */}
        <motion.div
          className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 w-52 h-52 md:w-72 md:h-72 opacity-25"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <linearGradient id="blob2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              d="M200,80 Q320,200 200,320 T200,560 L0,560 L0,80 Z"
              fill="url(#blob2)"
              filter="blur(35px)"
            />
          </svg>
        </motion.div>

        {/* Additional Floating Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-purple-500/30 to-pink-500/20 rounded-full blur-2xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-blue-500/25 to-cyan-500/20 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 3 }}
        />
      </div>

      {/* Floating Cube */}
      <motion.div
        className="absolute top-1/2 right-4 md:right-10 transform -translate-y-1/2 hidden lg:block w-16 h-16 md:w-20 md:h-20 z-10"
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 1, duration: 1.5, type: "spring" }}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{
            rotateY: [0, 360],
            y: [0, -10, 0]
          }}
          transition={{
            rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-15deg) rotateY(45deg)' }}>
            <div className="absolute w-full h-full bg-gradient-to-br from-purple-600 to-cyan-500 opacity-80 transform translateZ(10px) border border-purple-400/30 rounded-lg"></div>
            <div className="absolute w-full h-full bg-gradient-to-br from-purple-700 to-cyan-600 opacity-80 transform translateZ(-10px) border border-purple-400/30 rounded-lg"></div>
            <div className="absolute w-full h-full bg-gradient-to-br from-cyan-400 to-purple-500 opacity-70 transform rotateY(90deg) translateZ(10px) border border-white/20 rounded-lg"></div>
            <div className="absolute w-full h-full bg-gradient-to-br from-purple-500 to-cyan-400 opacity-70 transform rotateY(-90deg) translateZ(10px) border border-white/20 rounded-lg"></div>
          </div>
        </motion.div>
      </motion.div>

      {/* Glassmorphism Card */}
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl">
          <div className="text-center text-white">
            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg leading-tight">
              <span className="bg-gradient-to-r from-purple-400 to-teal-300 text-transparent bg-clip-text">
                {"{{TEMPLATE_HERO_HEADLINE}}"}
              </span>
            </h1>
            
            {/* Subtext */}
            <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-3xl mx-auto leading-relaxed">
              {"{{TEMPLATE_HERO_SUBTEXT}}"}
            </p>
            
            {/* Animated Status Badge */}
            <motion.div 
              className="inline-flex items-center px-4 py-2 bg-white/10 border border-white/20 rounded-full text-teal-300 font-medium mb-6"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.3, ease: "ease-in-out" }}
            >
              <span className="mr-2">🚀</span>
              Currently working on {"{{TEMPLATE_CURRENT_PROJECT}}"}
            </motion.div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: "ease-in-out" }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-md shadow-lg transition-all duration-300 ease-in-out"
              >
                View Projects
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: "ease-in-out" }}
                className="border border-white text-white px-6 py-3 md:px-8 md:py-4 rounded-md hover:bg-white hover:text-purple-700 transition-all duration-300 ease-in-out"
              >
                Contact Me
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>

    {/* Tech Stack Section */}
    <TechStack />

    {/* About Me Section */}
    <AboutMe />

    {/* Projects Section */}
    <Projects />

    {/* Contact Section */}
    <Contact />

    {/* Footer */}
    <Footer />
    </>
  );
};

export default HomePage;