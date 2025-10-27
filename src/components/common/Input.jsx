import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Input Component
 * Form input with label, error, and icon support
 */
const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  className = '',
  inputClassName = '',
  ...props
}) => {
  const inputId = `input-${name}`;

  // Base input styles
  const baseInputStyles = 'w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed';

  // Error styles
  const errorStyles = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300';

  // Icon padding
  const iconPadding = icon ? (iconPosition === 'left' ? 'pl-12' : 'pr-12') : '';

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className={`absolute ${iconPosition === 'left' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-gray-400`}>
            {icon}
          </div>
        )}

        {/* Input Field */}
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`${baseInputStyles} ${errorStyles} ${iconPadding} ${inputClassName}`}
          {...props}
        />
      </div>

      {/* Helper Text or Error */}
      {(error || helperText) && (
        <p className={`mt-2 text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
  inputClassName: PropTypes.string
};

export default Input;

