import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../auth/AuthContext';
import {
  addToCart as addToCartService,
  removeFromCart as removeFromCartService,
  updateCartItemQuantity as updateCartItemQuantityService,
  getCart as getCartService,
  clearCart as clearCartService
} from '../../services/firebase/cartService';
import { getProductById } from '../../services/firebase/productService';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart when user changes
  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCart([]);
      setCartItems([]);
    }
  }, [user]);

  // Load cart items with full product details
  useEffect(() => {
    if (cart.length > 0) {
      loadCartItems();
    } else {
      setCartItems([]);
    }
  }, [cart]);

  const loadCart = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const cartData = await getCartService(user.uid);
      setCart(cartData);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCartItems = async () => {
    try {
      const items = await Promise.all(
        cart.map(async (item) => {
          const product = await getProductById(item.productId);
          return {
            ...item,
            product
          };
        })
      );
      setCartItems(items);
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  };

  const addToCart = async (productId, quantity = 1, variant = null) => {
    if (!user) {
      throw new Error('Please login to add items to cart');
    }

    try {
      setLoading(true);
      const updatedCart = await addToCartService(user.uid, productId, quantity, variant);
      setCart(updatedCart);
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId, variant = null) => {
    if (!user) return;

    try {
      setLoading(true);
      const updatedCart = await removeFromCartService(user.uid, productId, variant);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity, variant = null) => {
    if (!user) return;

    try {
      setLoading(true);
      const updatedCart = await updateCartItemQuantityService(user.uid, productId, quantity, variant);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      setLoading(true);
      await clearCartService(user.uid);
      setCart([]);
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Calculate cart totals
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    refreshCart: loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default CartContext;

