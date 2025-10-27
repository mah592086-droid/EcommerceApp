import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Header, Footer } from '../../components/layout';
import { Button, Card, Loading } from '../../components/common';
import { useCart } from '../../context/cart/CartContext';
import { useAuth } from '../../context/auth/AuthContext';
import { ROUTES, FADE_IN_UP, CART_SETTINGS } from '../../constants';

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    cartItems,
    loading,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemCount
  } = useCart();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
            <ShoppingBag className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Please Login
            </h2>
            <p className="text-gray-600 mb-8">
              You need to be logged in to view your cart
            </p>
            <Button onClick={() => navigate(ROUTES.LOGIN)}>
              Login to Continue
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const subtotal = getCartTotal();
  const tax = subtotal * CART_SETTINGS.taxRate;
  const shipping = subtotal >= CART_SETTINGS.freeShippingThreshold ? 0 : CART_SETTINGS.shippingFee;
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Shopping Cart
            </h1>
            <p className="text-xl text-gray-600">
              {getCartItemCount()} {getCartItemCount() === 1 ? 'item' : 'items'} in your cart
            </p>
          </motion.div>

          {loading ? (
            <Loading size="lg" text="Loading cart..." />
          ) : cartItems.length === 0 ? (
            /* Empty Cart */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <Card variant="elevated" className="max-w-md mx-auto">
                <ShoppingBag className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Your cart is empty
                </h2>
                <p className="text-gray-600 mb-6">
                  Start shopping and add items to your cart
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate(ROUTES.PRODUCTS)}
                  icon={<ShoppingBag />}
                >
                  Start Shopping
                </Button>
              </Card>
            </motion.div>
          ) : (
            /* Cart Content */
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={`${item.productId}-${JSON.stringify(item.variant)}`}
                      variants={FADE_IN_UP}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, x: -100 }}
                      layout
                    >
                      <Card hover={false}>
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                            {item.product.images && item.product.images[0] ? (
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-full h-full object-cover cursor-pointer hover:scale-110 transition-transform"
                                onClick={() => navigate(`${ROUTES.PRODUCTS}/${item.productId}`)}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                No Image
                              </div>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h3
                              className="text-lg font-bold text-gray-900 mb-1 cursor-pointer hover:text-purple-600 transition-colors truncate"
                              onClick={() => navigate(`${ROUTES.PRODUCTS}/${item.productId}`)}
                            >
                              {item.product.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">
                              ${item.product.price} each
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-4">
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variant)}
                                  className="px-3 py-1 hover:bg-gray-100 transition-colors"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="w-4 h-4" />
                                </motion.button>
                                <span className="px-4 py-1 font-medium min-w-[3rem] text-center">
                                  {item.quantity}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variant)}
                                  className="px-3 py-1 hover:bg-gray-100 transition-colors"
                                  disabled={item.quantity >= CART_SETTINGS.maxQuantityPerItem}
                                >
                                  <Plus className="w-4 h-4" />
                                </motion.button>
                              </div>

                              {/* Item Total */}
                              <span className="text-lg font-bold text-purple-600">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.productId, item.variant)}
                            className="text-red-500 hover:text-red-700 transition-colors p-2"
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="sticky top-24"
                >
                  <Card variant="elevated">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Order Summary
                    </h2>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal ({getCartItemCount()} items)</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between text-gray-600">
                        <span>Tax ({(CART_SETTINGS.taxRate * 100).toFixed(0)}%)</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="font-medium">
                          {shipping === 0 ? (
                            <span className="text-green-600 font-bold">FREE</span>
                          ) : (
                            `$${shipping.toFixed(2)}`
                          )}
                        </span>
                      </div>

                      {subtotal < CART_SETTINGS.freeShippingThreshold && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                          Add ${(CART_SETTINGS.freeShippingThreshold - subtotal).toFixed(2)} more for free shipping!
                        </div>
                      )}

                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between text-xl font-bold text-gray-900">
                          <span>Total</span>
                          <span className="text-purple-600">${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={() => navigate(ROUTES.CHECKOUT)}
                      icon={<ArrowRight />}
                      iconPosition="right"
                    >
                      Proceed to Checkout
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      fullWidth
                      className="mt-3"
                      onClick={() => navigate(ROUTES.PRODUCTS)}
                    >
                      Continue Shopping
                    </Button>

                    {/* Trust Badges */}
                    <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          ✓
                        </div>
                        <span>Secure checkout</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          ✓
                        </div>
                        <span>Free returns within 30 days</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          ✓
                        </div>
                        <span>Money-back guarantee</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;

