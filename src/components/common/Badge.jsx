import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Badge Component
 * Small status indicators and labels
 */
const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  // Variant styles
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-purple-100 text-purple-800',
    secondary: 'bg-cyan-100 text-cyan-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };

  // Size styles
  const sizes = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  const badgeClasses = `
    inline-flex items-center justify-center font-medium rounded-full
    ${variants[variant] || variants.default}
    ${sizes[size] || sizes.md}
    ${className}
  `.trim();

  return (
    <span className={badgeClasses}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string
};

export default Badge;

