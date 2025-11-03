import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { Button, Input, Card } from '../../components/common';
import { Floating3DCube } from '../../components/3d';
import { useAuth } from '../../context/auth/AuthContext';
import { ROUTES, FADE_IN_UP } from '../../constants';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      await login(formData.email, formData.password);
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Failed to login. Please try again.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled';
      }

      setErrors({ form: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 flex items-center justify-center p-3 sm:p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
        {/* Left - 3D Element & Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block text-white"
        >
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-lg sm:text-xl text-gray-200">
              Login to access your account and continue shopping
            </p>
          </div>
          <div className="flex justify-center">
            <Floating3DCube width={400} height={400} color="#8b5cf6" enableControls />
          </div>
        </motion.div>

        {/* Right - Login Form */}
        <motion.div
          variants={FADE_IN_UP}
          initial="hidden"
          animate="visible"
        >
          <Card variant="glass" className="backdrop-blur-xl">
            <div className="text-center mb-6 sm:mb-8">
              <Link to={ROUTES.HOME} className="inline-block mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl sm:rounded-2xl shadow-lg flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-2xl sm:text-3xl">E</span>
                </div>
              </Link>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Login to Your Account</h2>
              <p className="text-sm sm:text-base text-gray-300">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {errors.form && (
                <div className="bg-red-500/20 border border-red-500 text-white rounded-lg p-4 text-sm">
                  {errors.form}
                </div>
              )}

              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                placeholder="your@email.com"
                icon={<Mail className="w-5 h-5" />}
                className="text-white"
                inputClassName="bg-white/10 border-white/20 text-white placeholder-gray-400"
                required
              />

              <div className="relative">
                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  placeholder="Enter your password"
                  icon={<Lock className="w-5 h-5" />}
                  className="text-white"
                  inputClassName="bg-white/10 border-white/20 text-white placeholder-gray-400 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-11 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-300 cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded" />
                  Remember me
                </label>
                <Link to={ROUTES.FORGOT_PASSWORD} className="text-cyan-400 hover:text-cyan-300">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                disabled={loading}
                icon={<LogIn />}
                iconPosition="right"
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>

              <div className="text-center text-gray-300">
                Don't have an account?{' '}
                <Link to={ROUTES.SIGNUP} className="text-cyan-400 hover:text-cyan-300 font-medium">
                  Sign up
                </Link>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Facebook
                </Button>
              </div>

              <div className="text-center">
                <Link to={ROUTES.HOME} className="text-gray-400 hover:text-white text-sm">
                  ← Back to Home
                </Link>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

