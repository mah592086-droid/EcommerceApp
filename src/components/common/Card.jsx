import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Reusable Card Component
 * Flexible card with multiple variants and hover effects
 */
const Card = ({
  children,
  variant = 'default',
  hover = true,
  padding = 'md',
  className = '',
  onClick,
  ...props
}) => {
  // Variant styles
  const variants = {
    default: 'bg-white shadow-lg',
    glass: 'bg-white/10 backdrop-blur-lg border border-white/20',
    elevated: 'bg-white shadow-2xl',
    dark: 'bg-gray-900 text-white',
    gradient: 'bg-gradient-to-br from-purple-600 to-blue-600 text-white',
    outline: 'bg-transparent border-2 border-gray-200'
  };

  // Padding styles
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  // Hover effects
  const hoverEffect = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';

  // Combined classes
  const cardClasses = `
    ${variants[variant] || variants.default}
    ${paddings[padding] || paddings.md}
    ${hoverEffect}
    ${onClick ? 'cursor-pointer' : ''}
    rounded-xl transition-all duration-300
    ${className}
  `.trim();

  return (
    <motion.div
      className={cardClasses}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'glass', 'elevated', 'dark', 'gradient', 'outline']),
  hover: PropTypes.bool,
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Card;

