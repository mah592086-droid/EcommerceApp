/**
 * Product Service
 * Firebase CRUD operations for products
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './config';

const PRODUCTS_COLLECTION = 'products';

/**
 * Get all products with optional filters
 */
export const getProducts = async (filters = {}) => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    let q = query(productsRef);

    // Apply filters
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }
    if (filters.subcategory) {
      q = query(q, where('subcategory', '==', filters.subcategory));
    }
    if (filters.minPrice !== undefined) {
      q = query(q, where('price', '>=', filters.minPrice));
    }
    if (filters.maxPrice !== undefined) {
      q = query(q, where('price', '<=', filters.maxPrice));
    }

    // Apply sorting
    if (filters.sortBy) {
      const sortField = filters.sortBy === 'price-low' ? 'price' : 
                       filters.sortBy === 'price-high' ? 'price' : 
                       filters.sortBy === 'newest' ? 'createdAt' : 'name';
      const sortDirection = filters.sortBy === 'price-high' ? 'desc' : 'asc';
      q = query(q, orderBy(sortField, sortDirection));
    }

    // Apply pagination
    if (filters.limit) {
      q = query(q, limit(filters.limit));
    }
    if (filters.startAfter) {
      q = query(q, startAfter(filters.startAfter));
    }

    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

/**
 * Get a single product by ID
 */
export const getProductById = async (productId) => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      return { id: productSnap.id, ...productSnap.data() };
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
};

/**
 * Add a new product
 */
export const addProduct = async (productData) => {
  try {
    const productWithTimestamp = {
      ...productData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), productWithTimestamp);
    return { id: docRef.id, ...productWithTimestamp };
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

/**
 * Update an existing product
 */
export const updateProduct = async (productId, updates) => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    const updateData = {
      ...updates,
      updatedAt: Timestamp.now()
    };

    await updateDoc(productRef, updateData);
    return { id: productId, ...updateData };
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

/**
 * Delete a product
 */
export const deleteProduct = async (productId) => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    await deleteDoc(productRef);
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

/**
 * Upload product image to Firebase Storage
 */
export const uploadProductImage = async (file, productId) => {
  try {
    const storageRef = ref(storage, `products/${productId}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

/**
 * Delete product image from Firebase Storage
 */
export const deleteProductImage = async (imageUrl) => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

/**
 * Search products by name or description
 */
export const searchProducts = async (searchTerm) => {
  try {
    const products = await getProducts();
    const lowerSearchTerm = searchTerm.toLowerCase();
    
    return products.filter(product => 
      product.name.toLowerCase().includes(lowerSearchTerm) ||
      product.description.toLowerCase().includes(lowerSearchTerm)
    );
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

/**
 * Get featured products
 */
export const getFeaturedProducts = async (limitCount = 6) => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const q = query(
      productsRef,
      where('featured', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    return products;
  } catch (error) {
    console.error('Error getting featured products:', error);
    throw error;
  }
};

