/**
 * Authentication Service
 * Firebase Authentication operations
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from './config';

const USERS_COLLECTION = 'users';

/**
 * Register a new user
 */
export const registerUser = async (email, password, displayName) => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update user profile
    await updateProfile(user, { displayName });

    // Create user document in Firestore
    await setDoc(doc(db, USERS_COLLECTION, user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      role: 'user',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      cart: [],
      wishlist: [],
      orders: []
    });

    return {
      uid: user.uid,
      email: user.email,
      displayName: displayName
    };
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

/**
 * Login user
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get user data from Firestore
    const userData = await getUserData(user.uid);

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      ...userData
    };
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

/**
 * Logout user
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

/**
 * Send password reset email
 */
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

/**
 * Get user data from Firestore
 */
export const getUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error('User data not found');
    }
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (uid, updates) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const updateData = {
      ...updates,
      updatedAt: Timestamp.now()
    };

    await updateDoc(userRef, updateData);

    // Update Firebase Auth profile if displayName is updated
    if (updates.displayName && auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: updates.displayName });
    }

    return updateData;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

/**
 * Update user email
 */
export const updateUserEmail = async (newEmail) => {
  try {
    if (auth.currentUser) {
      await updateEmail(auth.currentUser, newEmail);
      
      // Update email in Firestore
      await updateDoc(doc(db, USERS_COLLECTION, auth.currentUser.uid), {
        email: newEmail,
        updatedAt: Timestamp.now()
      });
    }
  } catch (error) {
    console.error('Error updating email:', error);
    throw error;
  }
};

/**
 * Update user password
 */
export const updateUserPassword = async (newPassword) => {
  try {
    if (auth.currentUser) {
      await updatePassword(auth.currentUser, newPassword);
    }
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};

/**
 * Listen to auth state changes
 */
export const onAuthChange = (callback) => {
  if (!auth) {
    console.warn('Auth not initialized');
    return () => {}; // Return empty unsubscribe function
  }
  return onAuthStateChanged(auth, callback);
};

/**
 * Get current user
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Check if user is admin
 */
export const isAdmin = async (uid) => {
  try {
    const userData = await getUserData(uid);
    return userData.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

