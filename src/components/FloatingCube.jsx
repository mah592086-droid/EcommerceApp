import { motion } from 'framer-motion';

const FloatingCube = () => {
  return (
    <motion.div
      className="absolute top-1/2 right-10 transform -translate-y-1/2 hidden lg:block"
      animate={{
        rotateY: [0, 360],
        rotateX: [0, 15, 0],
      }}
      transition={{
        rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
        rotateX: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <div className="relative w-32 h-32">
        {/* 3D Cube using CSS transforms */}
        <motion.div
          className="absolute w-32 h-32"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-15deg) rotateY(45deg)',
          }}
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Front face */}
          <div className="absolute w-32 h-32 bg-gradient-to-br from-electric-500 to-electric-600 opacity-80 transform translateZ(16px) border border-electric-400/30"></div>
          
          {/* Back face */}
          <div className="absolute w-32 h-32 bg-gradient-to-br from-midnight-500 to-midnight-600 opacity-80 transform translateZ(-16px) border border-midnight-400/30"></div>
          
          {/* Right face */}
          <div className="absolute w-32 h-32 bg-gradient-to-br from-electric-400 to-midnight-500 opacity-70 transform rotateY(90deg) translateZ(16px) border border-white/20"></div>
          
          {/* Left face */}
          <div className="absolute w-32 h-32 bg-gradient-to-br from-midnight-400 to-electric-500 opacity-70 transform rotateY(-90deg) translateZ(16px) border border-white/20"></div>
          
          {/* Top face */}
          <div className="absolute w-32 h-32 bg-gradient-to-br from-white/20 to-electric-400/40 opacity-60 transform rotateX(90deg) translateZ(16px) border border-white/10"></div>
          
          {/* Bottom face */}
          <div className="absolute w-32 h-32 bg-gradient-to-br from-midnight-600/40 to-black/20 opacity-80 transform rotateX(-90deg) translateZ(16px) border border-midnight-400/20"></div>
        </motion.div>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 w-32 h-32 bg-electric-500/20 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default FloatingCube;
