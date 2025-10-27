import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  ...props 
}) => {
  const baseClasses = 'relative font-semibold rounded-full transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden';
  
  const variants = {
    primary: 'bg-gradient-to-r from-neon-purple via-electric-500 to-neon-teal text-white hover:from-neon-teal hover:via-electric-400 hover:to-neon-pink focus:ring-neon-purple shadow-lg hover:shadow-2xl hover:shadow-neon-purple/50 animate-glow',
    secondary: 'bg-transparent border-2 border-neon-teal text-neon-teal hover:bg-neon-teal hover:text-white focus:ring-neon-teal shadow-lg hover:shadow-xl hover:shadow-neon-teal/30 backdrop-blur-sm',
  };
  
  const sizes = {
    sm: 'py-3 px-6 text-sm',
    md: 'py-4 px-8 text-base',
    lg: 'py-5 px-10 text-lg',
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <motion.button
      className={classes}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        y: -2
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }}
      {...props}
    >
      <motion.span 
        className="relative z-10"
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      >
        {children}
      </motion.span>
      
      {/* Enhanced Shimmer effect for primary button */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.8 }}
        />
      )}
      
      {/* Glow effect for secondary button */}
      {variant === 'secondary' && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-teal/20 to-transparent opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
};

export default Button;
