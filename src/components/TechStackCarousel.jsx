import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Smartphone, 
  Server, 
  Database,
  Globe,
  Zap,
  Code,
  Cpu,
  Atom
} from 'lucide-react';

const TechStackCarousel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const techItems = [
    { name: 'React', icon: Atom, color: 'text-neon-blue', description: 'JavaScript library for building user interfaces' },
    { name: 'Flutter', icon: Smartphone, color: 'text-neon-teal', description: 'Google\'s UI toolkit for cross-platform apps' },
    { name: 'Node.js', icon: Server, color: 'text-neon-green', description: 'JavaScript runtime for server-side development' },
    { name: 'Firebase', icon: Zap, color: 'text-yellow-400', description: 'Google\'s mobile and web app platform' },
    { name: 'Next.js', icon: Globe, color: 'text-neon-purple', description: 'React framework for production' },
    { name: 'TypeScript', icon: Code, color: 'text-neon-blue', description: 'Typed superset of JavaScript' },
    { name: 'MongoDB', icon: Database, color: 'text-neon-green', description: 'NoSQL document database' },
    { name: 'AWS', icon: Cpu, color: 'text-orange-400', description: 'Amazon Web Services cloud platform' },
  ];

  // Duplicate items for seamless scrolling
  const duplicatedItems = [...techItems, ...techItems];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-r from-deep-violet via-midnight-800 to-deep-blue relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-white mb-6 font-space-grotesk"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Technologies I work with
          </motion.h2>
          <motion.p 
            className="text-gray-300 text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            to bring ideas to life
          </motion.p>
        </motion.div>

        {/* Enhanced Carousel Container */}
        <motion.div 
          className="relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <motion.div
            className="flex space-x-6"
            animate={{
              x: [0, -50 * techItems.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {duplicatedItems.map((tech, index) => (
              <motion.div
                key={`${tech.name}-${index}`}
                className="group relative flex-shrink-0 flex flex-col items-center justify-center p-8 glass-effect rounded-3xl min-w-[160px] cursor-pointer backdrop-blur-xl border border-white/10"
                whileHover={{ 
                  scale: 1.2, 
                  y: -20,
                  transition: { duration: 0.4, type: "spring", stiffness: 300 }
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.8 + (index % techItems.length) * 0.1 }}
              >
                <motion.div
                  className="relative"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <tech.icon className={`w-20 h-20 ${tech.color} mb-4 drop-shadow-2xl filter drop-shadow-lg`} />
                </motion.div>
                <span className="text-white font-bold text-base mb-2">
                  {tech.name}
                </span>
                
                {/* Enhanced Tooltip */}
                <motion.div
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-4 py-3 bg-gradient-to-r from-neon-purple/90 to-neon-teal/90 backdrop-blur-xl text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none z-20 border border-white/20"
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  whileHover={{ opacity: 1, y: 0, scale: 1 }}
                >
                  {tech.description}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neon-purple/90"></div>
                </motion.div>
                
                {/* Enhanced Hover glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-neon-purple/30 to-neon-teal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Gradient Overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-midnight-800 to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-electric-900 to-transparent pointer-events-none z-10"></div>
      </div>
    </section>
  );
};

export default TechStackCarousel;
