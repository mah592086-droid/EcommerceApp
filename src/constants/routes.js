/**
 * Application Routes Configuration
 * Centralized route management for the application
 */

export const ROUTES = {
  // Public Routes
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CATEGORY: '/category/:categorySlug',
  SUBCATEGORY: '/category/:categorySlug/:subcategorySlug',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ABOUT: '/about',
  CONTACT: '/contact',
  
  // Auth Routes
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  FORGOT_PASSWORD: '/auth/forgot-password',
  PROFILE: '/profile',
  
  // Admin Routes
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_ADD_PRODUCT: '/admin/products/add',
  ADMIN_EDIT_PRODUCT: '/admin/products/edit/:id',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_USERS: '/admin/users',
  ADMIN_CATEGORIES: '/admin/categories',
  
  // User Account Routes
  ORDERS: '/orders',
  ORDER_DETAIL: '/orders/:id',
  WISHLIST: '/wishlist',
  SETTINGS: '/settings'
};

// Helper function to build dynamic routes
export const buildRoute = (route, params = {}) => {
  let builtRoute = route;
  Object.keys(params).forEach(key => {
    builtRoute = builtRoute.replace(`:${key}`, params[key]);
  });
  return builtRoute;
};

// Navigation menu items
export const MAIN_NAV_ITEMS = [
  { name: 'Home', path: ROUTES.HOME },
  { name: 'Products', path: ROUTES.PRODUCTS },
  { name: 'Categories', path: ROUTES.PRODUCTS, hasDropdown: true },
  { name: 'About', path: ROUTES.ABOUT },
  { name: 'Contact', path: ROUTES.CONTACT }
];

// Admin sidebar navigation
export const ADMIN_NAV_ITEMS = [
  { name: 'Dashboard', path: ROUTES.ADMIN_DASHBOARD, icon: '📊' },
  { name: 'Products', path: ROUTES.ADMIN_PRODUCTS, icon: '📦' },
  { name: 'Orders', path: ROUTES.ADMIN_ORDERS, icon: '🛒' },
  { name: 'Users', path: ROUTES.ADMIN_USERS, icon: '👥' },
  { name: 'Categories', path: ROUTES.ADMIN_CATEGORIES, icon: '📑' }
];

