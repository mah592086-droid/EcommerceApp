import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, MapPin, User as UserIcon, Lock, CheckCircle } from 'lucide-react';
import { Header, Footer } from '../../components/layout';
import { Button, Card, Input, Loading } from '../../components/common';
import { useCart } from '../../context/cart/CartContext';
import { useAuth } from '../../context/auth/AuthContext';
import { createOrder } from '../../services/firebase/orderService';
import { ROUTES, CART_SETTINGS, VALIDATION } from '../../constants';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, getCartTotal, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    // Shipping Info
    fullName: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',

    // Payment Info
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',

    // Order Notes
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Shipping validation
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!VALIDATION.email.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!VALIDATION.phone.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!VALIDATION.zipCode.test(formData.zipCode)) newErrors.zipCode = 'Invalid ZIP code';

    // Payment validation
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Invalid card number';
    }
    if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
    }
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = 'Invalid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Calculate totals
      const subtotal = getCartTotal();
      const tax = subtotal * CART_SETTINGS.taxRate;
      const shipping = subtotal >= CART_SETTINGS.freeShippingThreshold ? 0 : CART_SETTINGS.shippingFee;
      const total = subtotal + tax + shipping;

      // Create order
      const orderData = {
        userId: user.uid,
        userEmail: formData.email,
        items: cartItems.map(item => ({
          productId: item.productId,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.images?.[0] || null
        })),
        shippingAddress: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          phone: formData.phone
        },
        payment: {
          method: 'credit_card',
          last4: formData.cardNumber.slice(-4)
        },
        pricing: {
          subtotal,
          tax,
          shipping,
          total
        },
        notes: formData.notes
      };

      const order = await createOrder(orderData);
      setOrderId(order.orderNumber);
      setOrderPlaced(true);

      // Clear cart
      await clearCart();
    } catch (error) {
      console.error('Error placing order:', error);
      window.toast?.error('Failed to place order. Please try again.', 'Order Error');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
            <Lock className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Please Login</h2>
            <p className="text-gray-600 mb-8">You need to be logged in to checkout</p>
            <Button onClick={() => navigate(ROUTES.LOGIN)}>Login to Continue</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <Button onClick={() => navigate(ROUTES.PRODUCTS)}>Start Shopping</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-24 pb-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <Card variant="elevated">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Order Placed Successfully!
                </h1>
                <p className="text-xl text-gray-600 mb-2">
                  Thank you for your purchase
                </p>
                <p className="text-gray-600 mb-8">
                  Order Number: <span className="font-bold text-purple-600">{orderId}</span>
                </p>
                <p className="text-gray-600 mb-8">
                  We've sent a confirmation email to {formData.email}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate(ROUTES.ORDERS)}
                  >
                    View Orders
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate(ROUTES.HOME)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </Card>
            </motion.div>
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left - Forms */}
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Information */}
                <Card>
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-6 h-6 text-purple-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Shipping Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      error={errors.fullName}
                      required
                    />
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                      required
                    />
                    <Input
                      label="Phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={errors.phone}
                      placeholder="(555) 123-4567"
                      required
                    />
                    <Input
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      error={errors.address}
                      className="md:col-span-2"
                      required
                    />
                    <Input
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      error={errors.city}
                      required
                    />
                    <Input
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      error={errors.state}
                      required
                    />
                    <Input
                      label="ZIP Code"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      error={errors.zipCode}
                      required
                    />
                    <Input
                      label="Country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </Card>

                {/* Payment Information */}
                <Card>
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-6 h-6 text-purple-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Payment Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Card Number"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      error={errors.cardNumber}
                      placeholder="1234 5678 9012 3456"
                      className="md:col-span-2"
                      required
                    />
                    <Input
                      label="Cardholder Name"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      error={errors.cardName}
                      className="md:col-span-2"
                      required
                    />
                    <Input
                      label="Expiry Date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      error={errors.expiryDate}
                      placeholder="MM/YY"
                      required
                    />
                    <Input
                      label="CVV"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      error={errors.cvv}
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-start gap-3">
                    <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">Secure Payment</p>
                      <p>Your payment information is encrypted and secure</p>
                    </div>
                  </div>
                </Card>

                {/* Order Notes */}
                <Card>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Order Notes (Optional)</h2>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special instructions for your order..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </Card>
              </div>

              {/* Right - Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card variant="elevated">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                    {/* Cart Items */}
                    <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                      {cartItems.map((item) => (
                        <div key={item.productId} className="flex gap-3">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            {item.product.images?.[0] ? (
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                No Image
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">
                              {item.product.name}
                            </p>
                            <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                            <p className="text-purple-600 font-bold text-sm">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-3 pt-6 border-t border-gray-200">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Tax</span>
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
                      <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                        <span>Total</span>
                        <span className="text-purple-600">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      className="mt-6"
                      loading={loading}
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Place Order'}
                    </Button>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      By placing your order, you agree to our terms and conditions
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;

