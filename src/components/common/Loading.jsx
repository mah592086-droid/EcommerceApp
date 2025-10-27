import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Loading Component
 * Various loading indicators
 */
const Loading = ({ type = 'spinner', size = 'md', text = '', fullScreen = false }) => {
  // Size configurations
  const sizes = {
    sm: { spinner: 'w-8 h-8', dots: 'w-2 h-2' },
    md: { spinner: 'w-12 h-12', dots: 'w-3 h-3' },
    lg: { spinner: 'w-16 h-16', dots: 'w-4 h-4' },
    xl: { spinner: 'w-20 h-20', dots: 'w-5 h-5' }
  };

  const currentSize = sizes[size] || sizes.md;

  // Spinner Component
  const Spinner = () => (
    <div className={`${currentSize.spinner} border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin`}></div>
  );

  // Dots Component
  const Dots = () => (
    <div className="flex gap-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`${currentSize.dots} bg-purple-600 rounded-full`}
          animate={{
            y: [0, -10, 0],
            opacity: [1, 0.5, 1]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.2
          }}
        />
      ))}
    </div>
  );

  // Pulse Component
  const Pulse = () => (
    <motion.div
      className={`${currentSize.spinner} bg-gradient-to-r from-purple-600 to-blue-600 rounded-full`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.7, 1]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity
      }}
    />
  );

  // Select loading type
  const LoadingComponent = {
    spinner: Spinner,
    dots: Dots,
    pulse: Pulse
  }[type] || Spinner;

  // Container
  const Container = ({ children }) => (
    <div className={`
      flex flex-col items-center justify-center gap-4
      ${fullScreen ? 'fixed inset-0 bg-white z-50' : 'py-8'}
    `}>
      <LoadingComponent />
      {text && (
        <p className="text-gray-600 text-lg font-medium">{text}</p>
      )}
      {children}
    </div>
  );

  return <Container />;
};

Loading.propTypes = {
  type: PropTypes.oneOf(['spinner', 'dots', 'pulse']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  text: PropTypes.string,
  fullScreen: PropTypes.bool
};

export default Loading;

