import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: '🐙',
      href: 'https://github.com/maham-dev',
      color: 'hover:text-gray-300'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      href: 'https://linkedin.com/in/maham-dev',
      color: 'hover:text-blue-300'
    },
    {
      name: 'Email',
      icon: '📧',
      href: 'mailto:maham.dev@example.com',
      color: 'hover:text-teal-300'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.footer
      className="bg-white/10 backdrop-blur-md text-gray-300 py-6 px-4 text-center border-t border-white/20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="container mx-auto max-w-4xl">
        {/* Social Links */}
        <motion.div
          className="flex justify-center items-center gap-6 mb-4"
          variants={itemVariants}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 text-gray-300 transition-colors duration-300 ${social.color}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <span className="text-lg">{social.icon}</span>
              <span className="text-sm font-medium hidden sm:inline">{social.name}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Built With */}
        <motion.div
          className="mb-4"
          variants={itemVariants}
        >
          <p className="text-sm text-gray-400">
            Built with <span className="text-blue-300">React</span>, <span className="text-cyan-300">Tailwind CSS</span>, <span className="text-pink-300">Framer Motion</span>
          </p>
        </motion.div>

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
        >
          <p className="text-sm text-gray-400">
            © 2025 <span className="text-white font-medium">Maham</span>. All rights reserved.
          </p>
        </motion.div>

        {/* Decorative Line */}
        <motion.div
          className="w-24 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-300 mx-auto mt-4 rounded-full"
          variants={itemVariants}
        />
      </div>
    </motion.footer>
  );
};

export default Footer;
