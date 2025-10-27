import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  registerUser,
  loginUser,
  logoutUser,
  onAuthChange,
  getUserData,
  isAdmin as checkAdmin
} from '../../services/firebase/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Listen to auth state changes
    try {
      const unsubscribe = onAuthChange(async (firebaseUser) => {
        if (firebaseUser) {
          try {
            const userData = await getUserData(firebaseUser.uid);
            const adminStatus = await checkAdmin(firebaseUser.uid);
            
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              ...userData
            });
            setIsAdmin(adminStatus);
          } catch (error) {
            console.error('Error fetching user data:', error);
            setUser(null);
            setIsAdmin(false);
          }
        } else {
          setUser(null);
          setIsAdmin(false);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Firebase not initialized:', error);
      setLoading(false);
    }
  }, []);

  const register = async (email, password, displayName) => {
    setLoading(true);
    try {
      const newUser = await registerUser(email, password, displayName);
      return newUser;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const loggedInUser = await loginUser(email, password);
      return loggedInUser;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
      setIsAdmin(false);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    isAdmin,
    register,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext;

