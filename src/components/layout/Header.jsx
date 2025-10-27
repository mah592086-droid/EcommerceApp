import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Search,
  Heart,
  LogOut,
  Settings,
  Package,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../../context/auth/AuthContext';
import { useCart } from '../../context/cart/CartContext';
import { ALL_CATEGORIES } from '../../constants/categories';
import { ROUTES } from '../../constants/routes';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const { getCartItemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);

  const cartItemCount = getCartItemCount();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-lg'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with 3D effect */}
          <Link to={ROUTES.HOME} className="flex items-center gap-2 group">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1, rotateY: 180 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
              EcommerceSite
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to={ROUTES.HOME}
              className="font-medium hover:text-purple-600 transition-colors text-gray-700"
            >
              Home
            </Link>
            
            {/* Categories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowCategoriesMenu(true)}
              onMouseLeave={() => setShowCategoriesMenu(false)}
            >
              <button className="font-medium hover:text-purple-600 transition-colors text-gray-700">
                Categories
              </button>
              
              <AnimatePresence>
                {showCategoriesMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl p-4 grid grid-cols-1 gap-2"
                  >
                    {ALL_CATEGORIES.map((category) => (
                      <Link
                        key={category.id}
                        to={`${ROUTES.PRODUCTS}?category=${category.slug}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors"
                      >
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900">{category.name}</div>
                          <div className="text-xs text-gray-500">{category.description}</div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to={ROUTES.PRODUCTS}
              className="font-medium hover:text-purple-600 transition-colors text-gray-700"
            >
              All Products
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Search Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-purple-100 transition-colors text-gray-700"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Wishlist Icon */}
            {user && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(ROUTES.WISHLIST)}
                className="p-2 rounded-lg hover:bg-purple-100 transition-colors text-gray-700"
              >
                <Heart className="w-5 h-5" />
              </motion.button>
            )}

            {/* Cart Icon with Badge */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(ROUTES.CART)}
              className="relative p-2 rounded-lg hover:bg-purple-100 transition-colors text-gray-700"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </motion.button>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-2 rounded-lg hover:bg-purple-100 transition-colors text-gray-700"
              >
                <User className="w-5 h-5" />
              </motion.button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl p-2"
                  >
                    {user ? (
                      <>
                        <div className="px-4 py-3 border-b border-gray-200">
                          <p className="text-sm font-medium text-gray-900">{user.displayName}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        
                        {isAdmin && (
                          <Link
                            to={ROUTES.ADMIN_DASHBOARD}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 rounded-lg transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <LayoutDashboard className="w-5 h-5 text-purple-600" />
                            <span>Admin Dashboard</span>
                          </Link>
                        )}
                        
                        <Link
                          to={ROUTES.ORDERS}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 rounded-lg transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Package className="w-5 h-5 text-gray-600" />
                          <span>My Orders</span>
                        </Link>
                        
                        <Link
                          to={ROUTES.SETTINGS}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 rounded-lg transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Settings className="w-5 h-5 text-gray-600" />
                          <span>Settings</span>
                        </Link>
                        
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Logout</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to={ROUTES.LOGIN}
                          className="block px-4 py-3 hover:bg-purple-50 rounded-lg transition-colors font-medium"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Login
                        </Link>
                        <Link
                          to={ROUTES.SIGNUP}
                          className="block px-4 py-3 hover:bg-purple-50 rounded-lg transition-colors font-medium"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-purple-100 transition-colors text-gray-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-2">
              <Link
                to={ROUTES.HOME}
                className="block px-4 py-3 rounded-lg hover:bg-purple-50 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to={ROUTES.PRODUCTS}
                className="block px-4 py-3 rounded-lg hover:bg-purple-50 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                All Products
              </Link>
              
              {/* Mobile Categories */}
              <div className="space-y-1">
                <div className="px-4 py-2 text-sm font-semibold text-gray-500">Categories</div>
                {ALL_CATEGORIES.map((category) => (
                  <Link
                    key={category.id}
                    to={`${ROUTES.PRODUCTS}?category=${category.slug}`}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-purple-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;

