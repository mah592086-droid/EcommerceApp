import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Header, Footer } from '../../components/layout';
import { Button, Card, Loading, Badge, Input } from '../../components/common';
import { getProducts } from '../../services/firebase/productService';
import { ALL_CATEGORIES, ROUTES, SORT_OPTIONS, PRICE_RANGES, FADE_IN_UP } from '../../constants';
import { useCart } from '../../context/cart/CartContext';

const Products = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, searchTerm, selectedCategory, selectedSubcategory, priceRange, sortBy]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const allProducts = await getProducts();
      setProducts(allProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Subcategory filter
    if (selectedSubcategory) {
      filtered = filtered.filter(product => product.subcategory === selectedSubcategory);
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        break;
    }

    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedSubcategory('');
    setPriceRange({ min: 0, max: 100000 });
    setSortBy('newest');
  };

  const handleAddToCart = async (productId, e) => {
    e.stopPropagation();
    try {
      await addToCart(productId, 1);
      window.toast?.success('Product added to cart!', 'Success');
    } catch (error) {
      window.toast?.error(error.message, 'Error');
    }
  };

  const activeCategory = ALL_CATEGORIES.find(cat => cat.slug === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          {/* Page Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
              {selectedCategory ? `${activeCategory?.name}` : 'All Products'}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">
              {filteredProducts.length} products available
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <Input
                  name="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  icon={<Search className="w-5 h-5" />}
                />
              </div>

              {/* Sort Dropdown */}
              <div className="w-full lg:w-64">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {SORT_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter Button */}
              <Button
                variant={showFilters ? 'primary' : 'outline'}
                onClick={() => setShowFilters(!showFilters)}
                icon={<SlidersHorizontal />}
              >
                Filters
              </Button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setSelectedSubcategory('');
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">All Categories</option>
                      {ALL_CATEGORIES.map(category => (
                        <option key={category.id} value={category.slug}>
                          {category.icon} {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subcategory Filter */}
                  {selectedCategory && activeCategory && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subcategory
                      </label>
                      <select
                        value={selectedSubcategory}
                        onChange={(e) => setSelectedSubcategory(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">All Subcategories</option>
                        {activeCategory.subcategories.map(sub => (
                          <option key={sub.id} value={sub.slug}>
                            {sub.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <div className="space-y-2">
                      {PRICE_RANGES.map((range, index) => (
                        <button
                          key={index}
                          onClick={() => setPriceRange({ min: range.min, max: range.max })}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            priceRange.min === range.min && priceRange.max === range.max
                              ? 'bg-purple-100 text-purple-700'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button variant="ghost" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Active Filters */}
          {(selectedCategory || selectedSubcategory || searchTerm) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategory && (
                <Badge variant="primary" className="flex items-center gap-2">
                  {activeCategory?.name}
                  <button onClick={() => setSelectedCategory('')}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedSubcategory && (
                <Badge variant="secondary" className="flex items-center gap-2">
                  {selectedSubcategory}
                  <button onClick={() => setSelectedSubcategory('')}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {searchTerm && (
                <Badge variant="info" className="flex items-center gap-2">
                  Search: {searchTerm}
                  <button onClick={() => setSearchTerm('')}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}

          {/* Products Grid */}
          {loading ? (
            <Loading size="lg" text="Loading products..." />
          ) : filteredProducts.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={FADE_IN_UP}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    variant="elevated"
                    hover={true}
                    className="cursor-pointer h-full"
                    onClick={() => navigate(`${ROUTES.PRODUCTS}/${product.id}`)}
                  >
                    <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                      {product.images && product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>

                    {product.featured && (
                      <Badge variant="warning" size="sm" className="mb-2">
                        Featured
                      </Badge>
                    )}

                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xl sm:text-2xl font-bold text-purple-600">
                        ${product.price}
                      </span>
                      <Button
                        size="sm"
                        onClick={(e) => handleAddToCart(product.id, e)}
                        className="text-xs sm:text-sm px-3 sm:px-4"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search terms
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;

