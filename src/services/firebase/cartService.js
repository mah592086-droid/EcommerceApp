/**
 * Cart Service
 * Firebase operations for shopping cart
 */

import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, Timestamp } from 'firebase/firestore';
import { db } from './config';

const USERS_COLLECTION = 'users';

/**
 * Add item to cart
 */
export const addToCart = async (uid, productId, quantity = 1, variant = null) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    const userData = userDoc.data();
    const cart = userData.cart || [];
    
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(
      item => item.productId === productId && JSON.stringify(item.variant) === JSON.stringify(variant)
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      cart[existingItemIndex].quantity += quantity;
      cart[existingItemIndex].updatedAt = Timestamp.now();
    } else {
      // Add new item
      cart.push({
        productId,
        quantity,
        variant,
        addedAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
    }

    await updateDoc(userRef, {
      cart,
      updatedAt: Timestamp.now()
    });

    return cart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

/**
 * Remove item from cart
 */
export const removeFromCart = async (uid, productId, variant = null) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    const userData = userDoc.data();
    const cart = userData.cart || [];
    
    // Filter out the item to remove
    const updatedCart = cart.filter(
      item => !(item.productId === productId && JSON.stringify(item.variant) === JSON.stringify(variant))
    );

    await updateDoc(userRef, {
      cart: updatedCart,
      updatedAt: Timestamp.now()
    });

    return updatedCart;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

/**
 * Update cart item quantity
 */
export const updateCartItemQuantity = async (uid, productId, quantity, variant = null) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    const userData = userDoc.data();
    const cart = userData.cart || [];
    
    // Find and update the item
    const itemIndex = cart.findIndex(
      item => item.productId === productId && JSON.stringify(item.variant) === JSON.stringify(variant)
    );

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        cart.splice(itemIndex, 1);
      } else {
        cart[itemIndex].quantity = quantity;
        cart[itemIndex].updatedAt = Timestamp.now();
      }
    }

    await updateDoc(userRef, {
      cart,
      updatedAt: Timestamp.now()
    });

    return cart;
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    throw error;
  }
};

/**
 * Get user's cart
 */
export const getCart = async (uid) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    return userDoc.data().cart || [];
  } catch (error) {
    console.error('Error getting cart:', error);
    throw error;
  }
};

/**
 * Clear entire cart
 */
export const clearCart = async (uid) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    await updateDoc(userRef, {
      cart: [],
      updatedAt: Timestamp.now()
    });

    return [];
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

/**
 * Add item to wishlist
 */
export const addToWishlist = async (uid, productId) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    await updateDoc(userRef, {
      wishlist: arrayUnion(productId),
      updatedAt: Timestamp.now()
    });

    return true;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};

/**
 * Remove item from wishlist
 */
export const removeFromWishlist = async (uid, productId) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    await updateDoc(userRef, {
      wishlist: arrayRemove(productId),
      updatedAt: Timestamp.now()
    });

    return true;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
};

/**
 * Get user's wishlist
 */
export const getWishlist = async (uid) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    return userDoc.data().wishlist || [];
  } catch (error) {
    console.error('Error getting wishlist:', error);
    throw error;
  }
};

