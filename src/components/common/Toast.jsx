import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * Toast Notification Component
 * Displays temporary messages with different types and animations
 */
const Toast = ({
  id,
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  position = 'top-right',
  showIcon = true,
  showCloseButton = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-dismiss after duration
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.(id);
    }, 300); // Wait for animation to complete
  };

  // Toast variants
  const variants = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: 'text-green-600',
      title: 'text-green-800',
      message: 'text-green-700',
      iconComponent: CheckCircle
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'text-red-600',
      title: 'text-red-800',
      message: 'text-red-700',
      iconComponent: XCircle
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: 'text-yellow-600',
      title: 'text-yellow-800',
      message: 'text-yellow-700',
      iconComponent: AlertCircle
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      title: 'text-blue-800',
      message: 'text-blue-700',
      iconComponent: Info
    }
  };

  // Position variants
  const positions = {
    'top-right': 'top-2 sm:top-4 right-2 sm:right-4',
    'top-left': 'top-2 sm:top-4 left-2 sm:left-4',
    'top-center': 'top-2 sm:top-4 left-1/2 transform -translate-x-1/2',
    'bottom-right': 'bottom-2 sm:bottom-4 right-2 sm:right-4',
    'bottom-left': 'bottom-2 sm:bottom-4 left-2 sm:left-4',
    'bottom-center': 'bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2'
  };

  const variant = variants[type];
  const IconComponent = variant.iconComponent;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: position.includes('right') ? 300 : -300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: position.includes('right') ? 300 : -300, scale: 0.8 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className={`fixed ${positions[position]} z-50 max-w-[calc(100vw-1rem)] sm:max-w-sm w-full ${className}`}
        >
          <div className={`${variant.bg} ${variant.border} border rounded-lg shadow-lg p-3 sm:p-4`}>
            <div className="flex items-start gap-2 sm:gap-3">
              {showIcon && (
                <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${variant.icon} flex-shrink-0 mt-0.5`} />
              )}
              
              <div className="flex-1 min-w-0">
                {title && (
                  <h4 className={`font-semibold text-xs sm:text-sm ${variant.title} mb-0.5 sm:mb-1`}>
                    {title}
                  </h4>
                )}
                <p className={`text-xs sm:text-sm ${variant.message}`}>
                  {message}
                </p>
              </div>

              {showCloseButton && (
                <button
                  onClick={handleClose}
                  className={`${variant.icon} hover:opacity-70 transition-opacity flex-shrink-0`}
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Toast.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func,
  position: PropTypes.oneOf(['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center']),
  showIcon: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  className: PropTypes.string
};

export default Toast;
