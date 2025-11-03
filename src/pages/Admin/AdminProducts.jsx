import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Header, Footer } from '../../components/layout';
import { Button, Card, Modal, Input, Loading, Badge, ConfirmModal } from '../../components/common';
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
} from '../../services/firebase/productService';
import { useAuth } from '../../context/auth/AuthContext';
import { ALL_CATEGORIES, FADE_IN_UP } from '../../constants';

const AdminProducts = () => {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    stock: '',
    featured: false,
    inStock: true,
    images: ''
  });

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredProducts(
        products.filter(p =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        subcategory: product.subcategory || '',
        stock: product.stock || '',
        featured: product.featured || false,
        inStock: product.inStock !== false,
        images: product.images ? product.images.join('\n') : ''
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        subcategory: '',
        stock: '',
        featured: false,
        inStock: true,
        images: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      subcategory: '',
      stock: '',
      featured: false,
      inStock: true,
      images: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Process image URLs (split by newlines and filter empty)
      const imageUrls = formData.images
        .split('\n')
        .map(url => url.trim())
        .filter(url => url.length > 0);

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        subcategory: formData.subcategory,
        stock: parseInt(formData.stock) || 0,
        featured: formData.featured,
        inStock: formData.inStock,
        images: imageUrls
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await addProduct(productData);
      }

      await loadProducts();
      handleCloseModal();
      window.toast?.success(
        editingProduct ? 'Product updated successfully!' : 'Product added successfully!',
        'Success'
      );
    } catch (error) {
      console.error('Error saving product:', error);
      window.toast?.error('Failed to save product. Please try again.', 'Error');
    }
  };

  const handleDeleteClick = (productId) => {
    const product = products.find(p => p.id === productId);
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct(productToDelete.id);
      await loadProducts();
      window.toast?.success('Product deleted successfully!', 'Success');
    } catch (error) {
      console.error('Error deleting product:', error);
      window.toast?.error('Failed to delete product. Please try again.', 'Error');
    } finally {
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-24 pb-12 text-center py-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const selectedCategory = ALL_CATEGORIES.find(cat => cat.slug === formData.category);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Product Management</h1>
              <p className="text-base sm:text-lg text-gray-600">{filteredProducts.length} products</p>
            </div>
            <Button
              variant="primary"
              icon={<Plus />}
              onClick={() => handleOpenModal()}
              className="w-full sm:w-auto"
            >
              Add New Product
            </Button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <Input
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              icon={<Search className="w-5 h-5" />}
            />
          </div>

          {/* Products Table */}
          {loading ? (
            <Loading size="lg" text="Loading products..." />
          ) : (
            <Card>
              <div className="overflow-x-auto -mx-3 sm:mx-0">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 sm:py-4 px-3 sm:px-4 text-sm sm:text-base">Product</th>
                      <th className="text-left py-3 sm:py-4 px-3 sm:px-4 text-sm sm:text-base">Category</th>
                      <th className="text-left py-3 sm:py-4 px-3 sm:px-4 text-sm sm:text-base">Price</th>
                      <th className="text-left py-3 sm:py-4 px-3 sm:px-4 text-sm sm:text-base">Stock</th>
                      <th className="text-left py-3 sm:py-4 px-3 sm:px-4 text-sm sm:text-base">Status</th>
                      <th className="text-right py-3 sm:py-4 px-3 sm:px-4 text-sm sm:text-base">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <motion.tr
                        key={product.id}
                        variants={FADE_IN_UP}
                        initial="hidden"
                        animate="visible"
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 sm:py-4 px-3 sm:px-4">
                          <div>
                            <div className="font-medium text-sm sm:text-base text-gray-900">{product.name}</div>
                            <div className="text-xs sm:text-sm text-gray-500 line-clamp-1">
                              {product.description}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 sm:py-4 px-3 sm:px-4">
                          <div className="text-xs sm:text-sm">
                            <div className="font-medium text-gray-900">{product.category}</div>
                            {product.subcategory && (
                              <div className="text-gray-500">{product.subcategory}</div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 sm:py-4 px-3 sm:px-4">
                          <span className="font-bold text-sm sm:text-base text-purple-600">${product.price}</span>
                        </td>
                        <td className="py-3 sm:py-4 px-3 sm:px-4">
                          <span className={`text-xs sm:text-sm ${product.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                            {product.stock || 0}
                          </span>
                        </td>
                        <td className="py-3 sm:py-4 px-3 sm:px-4">
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {product.featured && <Badge variant="warning" size="sm">Featured</Badge>}
                            {product.inStock !== false ? (
                              <Badge variant="success" size="sm">In Stock</Badge>
                            ) : (
                              <Badge variant="danger" size="sm">Out of Stock</Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-3 sm:py-4 px-3 sm:px-4">
                          <div className="flex justify-end gap-1 sm:gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              icon={<Edit className="w-3 h-3 sm:w-4 sm:h-4" />}
                              onClick={() => handleOpenModal(product)}
                              className="text-xs sm:text-sm px-2 sm:px-3"
                            >
                              <span className="hidden sm:inline">Edit</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              icon={<Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />}
                              onClick={() => handleDeleteClick(product.id)}
                              className="text-xs sm:text-sm px-2 sm:px-3"
                            >
                              <span className="hidden sm:inline">Delete</span>
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    No products found
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URLs (one per line)
            </label>
            <textarea
              name="images"
              value={formData.images}
              onChange={handleInputChange}
              rows={3}
              placeholder="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800
https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm font-mono"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use Unsplash URLs. See USING_EXTERNAL_IMAGES.md for examples.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              required
            />

            <Input
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select Category</option>
                {ALL_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedCategory && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subcategory
                </label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Subcategory</option>
                  {selectedCategory.subcategories.map(sub => (
                    <option key={sub.id} value={sub.slug}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-700">Featured Product</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleInputChange}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-700">In Stock</span>
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" variant="primary" fullWidth>
              {editingProduct ? 'Update Product' : 'Add Product'}
            </Button>
            <Button type="button" variant="outline" fullWidth onClick={handleCloseModal}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
        type="danger"
        confirmText="Delete"
        cancelText="Cancel"
        confirmVariant="danger"
      />

      <Footer />
    </div>
  );
};

export default AdminProducts;

