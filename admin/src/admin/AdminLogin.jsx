// src/admin/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa';
import { summaryApi } from '../common/summaryApi';
import { Axios } from '../common/axios';
import { toast } from 'react-hot-toast';
import { setAdmin } from '../adminStore/adminSlice';
import { useDispatch } from 'react-redux';

const AdminLogin = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await Axios({
        ...summaryApi.login, data: formData
      })

      if (res?.data?.success) {
        if(res?.data?.data?.user?.role !== 'admin'){
         return toast.error('You are not an admin!');
        }
        toast.success(res?.data?.message || 'Login successful!');
        dispatch(setAdmin(res?.data?.data?.user));
        localStorage.setItem('accessToken', res?.data?.data?.accessToken);
        localStorage.setItem('refreshToken', res?.data?.data?.refreshToken);
        navigate('/admin');
        setFormData({ email: '', password: '', rememberMe: false });
      } 

    } catch (error) {
      toast.error(error?.response?.data?.message || 'Login failed. Please try again.');
      console.log("Error in login : ", error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.5 }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 z-0"
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-orange-200 opacity-20"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>

      {/* Login Form */}
      <motion.div
        className="relative z-10 w-full max-w-md px-8 py-10 bg-white rounded-2xl shadow-xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo and Title */}
        <motion.div
          className="text-center mb-10"
          variants={itemVariants}
        >
          <motion.div
            className="mx-auto w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4"
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Amzei
          </motion.div>
          <motion.h1
            className="text-3xl font-bold text-gray-800"
            variants={itemVariants}
          >
            Admin Panel
          </motion.h1>
          <motion.p
            className="text-gray-600 mt-2"
            variants={itemVariants}
          >
            Sign in to access the dashboard
          </motion.p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          variants={containerVariants}
          className="space-y-6"
        >
          {/* Email Field */}
          <motion.div variants={itemVariants}>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter admin email"
                required
              />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div variants={itemVariants}>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                ) : (
                  <FaEye className="text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </motion.div>

          {/* Remember Me & Forgot Password */}
          <motion.div
            className="flex items-center justify-between"
            variants={itemVariants}
          >
            <label className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-orange-500 hover:text-orange-600 transition-colors">
              Forgot password?
            </a>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-t-2 border-white border-solid rounded-full"
                />
              ) : (
                <>
                  Sign In
                  <FaArrowRight className="ml-2" />
                </>
              )}
            </button>
          </motion.div>
        </motion.form>

        {/* Additional Links */}
        <motion.div
          className="mt-8 text-center text-sm text-gray-600"
          variants={itemVariants}
        >
          <p>
            Don't have an account?{' '}
            <a href="#" className="text-orange-500 hover:text-orange-600 font-medium">
              Contact administrator
            </a>
          </p>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-4 left-0 right-0 text-center text-gray-500 text-sm z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        © {new Date().getFullYear()} Amzei Travelers Admin Panel. All rights reserved.
      </motion.div>
    </div>
  );
};

export default AdminLogin;