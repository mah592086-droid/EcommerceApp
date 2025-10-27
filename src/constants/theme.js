/**
 * Theme Configuration
 * Modern color palettes and design tokens
 */

export const COLORS = {
  // Primary Brand Colors (Modern Purple-Blue gradient)
  primary: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6', // Main primary
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95'
  },
  
  // Secondary Colors (Cyan-Teal)
  secondary: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4', // Main secondary
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63'
  },
  
  // Accent Colors
  accent: {
    pink: '#ec4899',
    orange: '#f97316',
    green: '#10b981',
    yellow: '#fbbf24'
  },
  
  // Neutral Colors
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  }
};

// Gradient Combinations
export const GRADIENTS = {
  primary: 'bg-gradient-to-r from-purple-600 to-blue-600',
  secondary: 'bg-gradient-to-r from-cyan-500 to-teal-500',
  accent: 'bg-gradient-to-r from-pink-500 to-purple-600',
  sunset: 'bg-gradient-to-r from-orange-500 to-pink-500',
  ocean: 'bg-gradient-to-r from-blue-600 to-cyan-500',
  forest: 'bg-gradient-to-r from-green-600 to-teal-500',
  hero: 'bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900',
  dark: 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900'
};

// Shadows
export const SHADOWS = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  glow: 'shadow-2xl shadow-purple-500/50',
  glowCyan: 'shadow-2xl shadow-cyan-500/50'
};

// Border Radius
export const RADIUS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full'
};

// Spacing
export const SPACING = {
  section: 'py-20 px-6',
  container: 'max-w-7xl mx-auto',
  cardPadding: 'p-6',
  buttonPadding: 'px-6 py-3'
};

// Typography
export const TYPOGRAPHY = {
  h1: 'text-4xl md:text-5xl lg:text-6xl font-bold',
  h2: 'text-3xl md:text-4xl lg:text-5xl font-bold',
  h3: 'text-2xl md:text-3xl lg:text-4xl font-bold',
  h4: 'text-xl md:text-2xl lg:text-3xl font-semibold',
  h5: 'text-lg md:text-xl lg:text-2xl font-semibold',
  body: 'text-base',
  bodyLarge: 'text-lg',
  bodySmall: 'text-sm',
  caption: 'text-xs'
};

// Animation Durations
export const ANIMATIONS = {
  fast: 'duration-150',
  normal: 'duration-300',
  slow: 'duration-500',
  slower: 'duration-700'
};

// Glassmorphism Effect
export const GLASS = {
  light: 'bg-white/10 backdrop-blur-lg border border-white/20',
  medium: 'bg-white/20 backdrop-blur-xl border border-white/30',
  dark: 'bg-black/20 backdrop-blur-lg border border-white/10'
};

// Button Variants
export const BUTTON_VARIANTS = {
  primary: `${GRADIENTS.primary} text-white hover:shadow-lg transition-all ${ANIMATIONS.normal}`,
  secondary: `${GRADIENTS.secondary} text-white hover:shadow-lg transition-all ${ANIMATIONS.normal}`,
  outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all',
  ghost: 'text-purple-600 hover:bg-purple-100 transition-all',
  danger: 'bg-red-600 text-white hover:bg-red-700 transition-all'
};

// Card Variants
export const CARD_VARIANTS = {
  default: 'bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow',
  glass: `${GLASS.light} rounded-xl p-6 hover:bg-white/30 transition-all`,
  elevated: 'bg-white rounded-xl shadow-2xl p-6 hover:scale-105 transition-transform'
};

