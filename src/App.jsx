import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/auth/AuthContext';
import { CartProvider } from './context/cart/CartContext';
import { ThemeProvider } from './context/theme/ThemeContext';
import { ToastContainer } from './components/common';
import { ROUTES } from './constants/routes';

// Pages
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import { Login, Signup } from './pages/Auth';
import { AdminProducts } from './pages/Admin';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <Routes>
              {/* Public Routes */}
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.PRODUCTS} element={<Products />} />
              <Route path={`${ROUTES.PRODUCTS}/:id`} element={<ProductDetail />} />
              <Route path={ROUTES.CART} element={<Cart />} />
              <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
              
              {/* Auth Routes */}
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.SIGNUP} element={<Signup />} />
              
              {/* Admin Routes */}
              <Route path={ROUTES.ADMIN_PRODUCTS} element={<AdminProducts />} />
              
              {/* Fallback */}
              <Route path="*" element={<Home />} />
            </Routes>
            
            {/* Global Toast Container */}
            <ToastContainer />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
