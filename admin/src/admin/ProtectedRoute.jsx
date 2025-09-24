// src/admin/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('accessToken') ;
  const admin = useSelector((state) => state?.admin);

  if (!isAuthenticated || admin?.email !== 'admin@gmail.com') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gray-100"
      >
        <Navigate to="/admin/login" replace />
      </motion.div>
    );
  }

  return children;
};

export default ProtectedRoute;