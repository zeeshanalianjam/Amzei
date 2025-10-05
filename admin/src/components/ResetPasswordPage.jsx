// src/admin/ResetPasswordPage.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaLock, FaCheck } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import toast from 'react-hot-toast';
import { Axios } from '../common/axios';
import { summaryApi } from '../common/summaryApi';

// 3D Floating Lock Component
function FloatingLock() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.2}>
      <group ref={meshRef}>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.8, 1.2, 0.2]} />
          <meshStandardMaterial 
            color="#fb923c" 
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.3, 32]} />
          <meshStandardMaterial 
            color="#fb923c" 
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

// 3D Particle Field Component
function ParticleField({ count = 100 }) {
  const meshRef = useRef();
  const particlesRef = useRef();
  
  useEffect(() => {
    if (particlesRef.current) {
      const positions = new Float32Array(count * 3);
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 10;
        positions[i3 + 1] = (Math.random() - 0.5) * 10;
        positions[i3 + 2] = (Math.random() - 0.5) * 10;
      }
      
      particlesRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={particlesRef} />
      <pointsMaterial 
        size={0.05} 
        color="#ffffff" 
        transparent 
        opacity={0.7}
        sizeAttenuation={true}
      />
    </points>
  );
}

// 3D Scene Component
function Scene() {
  return (
    <>
      <color attach="background" args={['#1e293b']} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#fb923c" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
      
      <FloatingLock />
      <ParticleField count={100} />
      <Stars radius={20} depth={20} count={500} factor={2} />
    </>
  );
}

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, otp } = location.state || {};

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (formData.newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    
    
    try {
      setIsLoading(true);
      const res = await Axios({
        ...summaryApi.resetPassword,
        data: {
          email,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword
        }
      })

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setError('');
        navigate('/admin/login');
      }

      
    } catch (error) {
      console.error('Error in resetting password:', error);
      toast.error(error?.response?.data?.message || 'Error in resetting password. Please try again.');
    }

  };

  // If no email or OTP is provided, redirect to login
  useEffect(() => {
    if (!email || !otp) {
      navigate('/admin/login');
    }
  }, [email, otp, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <Scene />
        </Canvas>
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-4">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/admin/login')}
          className="flex items-center text-orange-500 hover:text-orange-600 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FaArrowLeft className="mr-2" /> Back to Login
        </motion.button>
        
        {/* Reset Password Form */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-center">
            <motion.div 
              className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <FaLock className="text-white text-2xl" />
            </motion.div>
            <motion.h2 
              className="text-2xl font-bold text-white"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Reset Password
            </motion.h2>
            <motion.p 
              className="text-orange-100 mt-2"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Create a new password for your account
            </motion.p>
          </div>
          
          {/* Body */}
          <div className="p-6">
            {success ? (
              <motion.div 
                className="text-center py-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="text-green-500 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Password Reset Successful!</h3>
                <p className="text-gray-600">
                  Your password has been reset successfully. Redirecting to login page...
                </p>
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {/* New Password */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                </div>
                
                {/* Confirm Password */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Confirm new password"
                      required
                    />
                  </div>
                </div>
                
                {/* Error Message */}
                {error && (
                  <motion.div 
                    className="text-red-500 text-sm mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {error}
                  </motion.div>
                )}
                
                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-t-2 border-white border-solid rounded-full"
                    />
                  ) : (
                    'Reset Password'
                  )}
                </motion.button>
              </motion.form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;