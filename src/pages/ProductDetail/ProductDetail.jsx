import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Truck, Shield, ArrowLeft, Share2 } from 'lucide-react';
import { Header, Footer } from '../../components/layout';
import { Button, Card, Loading, Badge } from '../../components/common';
import { Product3DViewer } from '../../components/3d';
import { getProductById } from '../../services/firebase/productService';
import { useCart } from '../../context/cart/CartContext';
import { useAuth } from '../../context/auth/AuthContext';
import { ROUTES, FADE_IN_UP } from '../../constants';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const productData = await getProductById(id);
      setProduct(productData);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(id, quantity);
      window.toast?.success('Product added to cart!', 'Success');
    } catch (error) {
      window.toast?.error(error.message, 'Error');
    }
  };

  const handleBuyNow = async () => {
    try {
      await addToCart(id, quantity);
      navigate(ROUTES.CART);
    } catch (error) {
      window.toast?.error(error.message, 'Error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-24">
          <Loading fullScreen={false} size="lg" text="Loading product..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-24 text-center py-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Button onClick={() => navigate(ROUTES.PRODUCTS)}>
            Back to Products
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Images & 3D Viewer */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Main Image / 3D Viewer */}
              <Card padding="none" className="overflow-hidden">
                <div className="aspect-square bg-gray-100">
                  {product.has3DModel ? (
                    <Product3DViewer height={600} color={product.color || '#8b5cf6'} />
                  ) : product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image Available
                    </div>
                  )}
                </div>
              </Card>

              {/* Image Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? 'border-purple-600 scale-105'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right - Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {product.featured && <Badge variant="warning">Featured</Badge>}
                {product.inStock !== false ? (
                  <Badge variant="success">In Stock</Badge>
                ) : (
                  <Badge variant="danger">Out of Stock</Badge>
                )}
                {product.isNew && <Badge variant="info">New</Badge>}
              </div>

              {/* Title */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < (product.rating || 4)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    ({product.reviewCount || 0} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-purple-600">
                  ${product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-2xl text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                    <Badge variant="danger">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  </>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className={`text-gray-600 leading-relaxed ${!showFullDescription && 'line-clamp-4'}`}>
                  {product.description}
                </p>
                {product.description && product.description.length > 200 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-purple-600 hover:text-purple-700 font-medium mt-2"
                  >
                    {showFullDescription ? 'Show Less' : 'Read More'}
                  </button>
                )}
              </div>

              {/* Specifications */}
              {product.specifications && (
                <Card variant="outline">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                  <dl className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                        <dt className="text-gray-600 capitalize">{key}</dt>
                        <dd className="font-medium text-gray-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </Card>
              )}

              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-gray-600 text-sm">
                    {product.stock ? `${product.stock} available` : 'Limited stock'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={<ShoppingCart />}
                  onClick={handleAddToCart}
                  disabled={product.inStock === false}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  fullWidth
                  onClick={handleBuyNow}
                  disabled={product.inStock === false}
                >
                  Buy Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  icon={<Heart />}
                  className="sm:w-auto"
                >
                  
                </Button>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card variant="outline" padding="sm">
                  <div className="flex items-center gap-3">
                    <Truck className="w-6 h-6 text-purple-600" />
                    <div>
                      <div className="font-medium text-gray-900">Free Shipping</div>
                      <div className="text-sm text-gray-600">On orders over $50</div>
                    </div>
                  </div>
                </Card>
                <Card variant="outline" padding="sm">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-purple-600" />
                    <div>
                      <div className="font-medium text-gray-900">Secure Payment</div>
                      <div className="text-sm text-gray-600">100% protected</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Share */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <span className="text-gray-600">Share:</span>
                <Button variant="ghost" size="sm" icon={<Share2 className="w-4 h-4" />}>
                  Share Product
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Related Products Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="text-center py-12 text-gray-500">
              Related products coming soon...
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;

