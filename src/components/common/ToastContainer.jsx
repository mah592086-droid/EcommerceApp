import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Toast from './Toast';

/**
 * Toast Container Component
 * Manages multiple toast notifications
 */
const ToastContainer = ({ position = 'top-right', maxToasts = 5 }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = {
      id,
      ...toast,
      position
    };

    setToasts(prev => {
      const updated = [...prev, newToast];
      // Keep only the most recent toasts
      return updated.slice(-maxToasts);
    });

    return id;
  }, [position, maxToasts]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  // Expose methods globally for easy access
  React.useEffect(() => {
    window.toast = {
      success: (message, title) => addToast({ type: 'success', message, title }),
      error: (message, title) => addToast({ type: 'error', message, title }),
      warning: (message, title) => addToast({ type: 'warning', message, title }),
      info: (message, title) => addToast({ type: 'info', message, title }),
      clear: clearAll
    };
  }, [addToast, clearAll]);

  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={removeToast}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
