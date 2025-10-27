import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Shield, Truck, Clock } from 'lucide-react';
import { Header, Footer } from '../../components/layout';
import { Button, Card, Loading, FirebaseSetupNotice } from '../../components/common';
import { Floating3DCube } from '../../components/3d';
import { ALL_CATEGORIES, ROUTES, FADE_IN_UP, STAGGER_CONTAINER } from '../../constants';
import { getFeaturedProducts, getProducts } from '../../services/firebase/productService';

const Home = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const products = await getFeaturedProducts(6);
      
      // If no featured products found, get some regular products as fallback
      if (products.length === 0) {
        const allProducts = await getProducts({ limit: 6 });
        
        // If still no products, use mock data
        if (allProducts.length === 0) {
          const mockProducts = [
            {
              id: 'mock-1',
              name: 'Premium Wireless Headphones',
              description: 'Experience crystal-clear sound with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and comfortable over-ear design.',
              price: 199.99,
              category: 'electronics',
              subcategory: 'audio',
              featured: true,
              images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop']
            },
            {
              id: 'mock-2',
              name: 'MacBook Pro 16" Laptop',
              description: 'Powerful performance meets stunning design. M3 Pro chip, 16GB RAM, 512GB SSD. Perfect for creative professionals and developers.',
              price: 2499.99,
              category: 'electronics',
              subcategory: 'laptops',
              featured: true,
              images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop']
            },
            {
              id: 'mock-3',
              name: 'iPhone 15 Pro - 256GB',
              description: 'The ultimate smartphone experience. Titanium design, A17 Pro chip, advanced camera system. Available in multiple colors.',
              price: 1199.99,
              category: 'electronics',
              subcategory: 'smartphones',
              featured: true,
              images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop']
            },
            {
              id: 'mock-4',
              name: 'Sony A7 IV Camera',
              description: 'Professional mirrorless camera with 33MP sensor, 4K video recording, and advanced autofocus system. Perfect for photographers.',
              price: 2499.99,
              category: 'electronics',
              subcategory: 'cameras',
              featured: true,
              images: ['https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=800&fit=crop']
            },
            {
              id: 'mock-5',
              name: 'Nike Air Max 270',
              description: 'Iconic Nike Air Max 270 with Max Air unit, breathable mesh upper, and comfortable cushioning. Perfect for everyday wear.',
              price: 150.99,
              category: 'shoes',
              subcategory: 'sneakers',
              featured: true,
              images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop']
            },
            {
              id: 'mock-6',
              name: 'Premium Cotton T-Shirt',
              description: 'Soft, comfortable cotton t-shirt with classic fit. Available in multiple colors. Perfect for everyday wear and layering.',
              price: 29.99,
              category: 'fashion',
              subcategory: 'mens-clothing',
              featured: true,
              images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop']
            }
          ];
          setFeaturedProducts(mockProducts);
        } else {
          setFeaturedProducts(allProducts);
        }
      } else {
        setFeaturedProducts(products);
      }
    } catch (error) {
      console.error('Error loading featured products:', error);
      // Use mock data as final fallback
      const mockProducts = [
        {
          id: 'mock-1',
          name: 'Premium Wireless Headphones',
          description: 'Experience crystal-clear sound with our premium wireless headphones.',
          price: 199.99,
          category: 'electronics',
          subcategory: 'audio',
          featured: true,
          images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop']
        },
        {
          id: 'mock-2',
          name: 'MacBook Pro 16" Laptop',
          description: 'Powerful performance meets stunning design. M3 Pro chip, 16GB RAM.',
          price: 2499.99,
          category: 'electronics',
          subcategory: 'laptops',
          featured: true,
          images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop']
        },
        {
          id: 'mock-3',
          name: 'iPhone 15 Pro - 256GB',
          description: 'The ultimate smartphone experience. Titanium design, A17 Pro chip.',
          price: 1199.99,
          category: 'electronics',
          subcategory: 'smartphones',
          featured: true,
          images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop']
        }
      ];
      setFeaturedProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <FirebaseSetupNotice />
      <Header />

      {/* Hero Section with 3D Elements */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 opacity-20"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-20 right-10 opacity-20"
            animate={{
              y: [0, 20, 0],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-40 h-40 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-3xl" />
          </motion.div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-4 py-2 mb-6"
              >
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span className="text-white text-sm font-medium">Trending Now</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Shop the
                <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
                  Future Today
                </span>
              </h1>

              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Experience shopping like never before with our immersive 3D product views, 
                cutting-edge technology, and unbeatable prices.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate(ROUTES.PRODUCTS)}
                  icon={<ArrowRight />}
                  iconPosition="right"
                >
                  Shop Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate(ROUTES.ABOUT)}
                  className="border-white text-white hover:bg-white hover:text-purple-900"
                >
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <div className="text-3xl font-bold text-white">10K+</div>
                  <div className="text-gray-300 text-sm">Products</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">50K+</div>
                  <div className="text-gray-300 text-sm">Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">4.9★</div>
                  <div className="text-gray-300 text-sm">Rating</div>
                </div>
              </div>
            </motion.div>

            {/* Right - 3D Cube */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:flex justify-center items-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full blur-3xl opacity-30" />
                <Floating3DCube width={400} height={400} color="#8b5cf6" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full mt-2"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">
              Discover our wide range of products across multiple categories
            </p>
          </motion.div>

          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {ALL_CATEGORIES.map((category) => (
              <motion.div key={category.id} variants={FADE_IN_UP}>
                <Card
                  variant="default"
                  hover={true}
                  className="cursor-pointer group"
                  onClick={() => navigate(`${ROUTES.PRODUCTS}?category=${category.slug}`)}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {category.description}
                    </p>
                    <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${category.color} text-white text-sm font-medium`}>
                      {category.subcategories.length} Subcategories
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Check out our handpicked selection of trending items
            </p>
          </motion.div>

          {loading ? (
            <Loading size="lg" text="Loading featured products..." />
          ) : featuredProducts.length > 0 ? (
            <motion.div
              variants={STAGGER_CONTAINER}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredProducts.map((product) => (
                <motion.div key={product.id} variants={FADE_IN_UP}>
                  <Card
                    variant="elevated"
                    hover={true}
                    className="cursor-pointer"
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
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-purple-600">
                        ${product.price}
                      </span>
                      <Button size="sm">View Details</Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No featured products available yet.</p>
              <Button
                className="mt-4"
                onClick={() => navigate(ROUTES.PRODUCTS)}
              >
                Browse All Products
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: <Truck className="w-8 h-8" />,
                title: 'Free Shipping',
                description: 'On orders over $50'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Secure Payment',
                description: '100% protected payments'
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: '24/7 Support',
                description: 'Dedicated customer service'
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Best Prices',
                description: 'Competitive pricing guaranteed'
              }
            ].map((feature, index) => (
              <motion.div key={index} variants={FADE_IN_UP}>
                <Card variant="glass" className="text-center h-full">
                  <div className="text-purple-600 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

