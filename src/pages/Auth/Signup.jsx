import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, UserPlus } from 'lucide-react';
import { Button, Input, Card } from '../../components/common';
import { Floating3DCube } from '../../components/3d';
import { useAuth } from '../../context/auth/AuthContext';
import { ROUTES, FADE_IN_UP, VALIDATION } from '../../constants';

const Signup = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Name is required';
    } else if (formData.displayName.trim().length < 2) {
      newErrors.displayName = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!VALIDATION.email.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < VALIDATION.password.minLength) {
      newErrors.password = `Password must be at least ${VALIDATION.password.minLength} characters`;
    } else if (VALIDATION.password.requireUppercase && !/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (VALIDATION.password.requireLowercase && !/[a-z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (VALIDATION.password.requireNumber && !/\d/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      await register(formData.email, formData.password, formData.displayName);
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Signup error:', error);
      let errorMessage = 'Failed to create account. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak';
      }

      setErrors({ form: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left - 3D Element & Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block text-white"
        >
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4">Join Us Today!</h1>
            <p className="text-xl text-gray-200">
              Create an account and start your shopping journey with exclusive benefits
            </p>
            <ul className="mt-6 space-y-3 text-gray-200">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">✓</span>
                <span>Exclusive member discounts</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">✓</span>
                <span>Fast and secure checkout</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">✓</span>
                <span>Track your orders easily</span>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <Floating3DCube width={400} height={400} color="#06b6d4" enableControls />
          </div>
        </motion.div>

        {/* Right - Signup Form */}
        <motion.div
          variants={FADE_IN_UP}
          initial="hidden"
          animate="visible"
        >
          <Card variant="glass" className="backdrop-blur-xl">
            <div className="text-center mb-8">
              <Link to={ROUTES.HOME} className="inline-block mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-3xl">E</span>
                </div>
              </Link>
              <h2 className="text-3xl font-bold text-white mb-2">Create Your Account</h2>
              <p className="text-gray-300">Join thousands of happy customers</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.form && (
                <div className="bg-red-500/20 border border-red-500 text-white rounded-lg p-4 text-sm">
                  {errors.form}
                </div>
              )}

              <Input
                label="Full Name"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                error={errors.displayName}
                placeholder="John Doe"
                icon={<User className="w-5 h-5" />}
                className="text-white"
                inputClassName="bg-white/10 border-white/20 text-white placeholder-gray-400"
                required
              />

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
                  placeholder="Create a strong password"
                  icon={<Lock className="w-5 h-5" />}
                  helperText="Must be at least 8 characters with uppercase, lowercase, and numbers"
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

              <div className="relative">
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={errors.confirmPassword}
                  placeholder="Confirm your password"
                  icon={<Lock className="w-5 h-5" />}
                  className="text-white"
                  inputClassName="bg-white/10 border-white/20 text-white placeholder-gray-400 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-11 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex items-start">
                <input type="checkbox" className="mr-3 mt-1 rounded" required />
                <label className="text-sm text-gray-300">
                  I agree to the{' '}
                  <Link to="#" className="text-cyan-400 hover:text-cyan-300">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="#" className="text-cyan-400 hover:text-cyan-300">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                disabled={loading}
                icon={<UserPlus />}
                iconPosition="right"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <div className="text-center text-gray-300">
                Already have an account?{' '}
                <Link to={ROUTES.LOGIN} className="text-cyan-400 hover:text-cyan-300 font-medium">
                  Login
                </Link>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-gray-400">Or sign up with</span>
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

export default Signup;

