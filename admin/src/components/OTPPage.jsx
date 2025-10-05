// src/admin/OTPPage.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaShieldAlt, FaCheck } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Axios } from '../common/axios';
import { summaryApi } from '../common/summaryApi';
import toast from 'react-hot-toast';

// 3D Floating Shield Component
function FloatingShield() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.2}>
      <mesh ref={meshRef}>
        <coneGeometry args={[1, 1.5, 4]} />
        <meshStandardMaterial 
          color="#fb923c" 
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
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
      
      <FloatingShield />
      <ParticleField count={100} />
      <Stars radius={20} depth={20} count={500} factor={2} />
    </>
  );
}

const OTPPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  // Handle input change for OTP fields
  const handleInputChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  // Handle key down for backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    if (pastedData.length === 6) {
      setOtp(pastedData);
      // Focus on last input
      const lastInput = document.getElementById('otp-input-5');
      if (lastInput) lastInput.focus();
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }
    
    
    try {
      setIsLoading(true);
      const res  = await Axios({
        ...summaryApi.verifyOTP,
        data: { email, otp: otpValue },
      })

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setError('');

        navigate('/admin/reset-password', { state: { email, otp: otpValue } });
      }
      
    } catch (error) {
      console.log("Error in forgot password : ", error);
      toast.error(error?.response?.data?.message || 'Error in forgot password. Please try again.');
    } finally {
      setIsLoading(false);
    }
    
  };

  // Handle resend OTP
  const handleResend = () => {
    // Simulate API call
    console.log(`Resending OTP to: ${email}`);
    alert(`A new OTP has been sent to ${email}`);
  };

  // If no email is provided, redirect to login
  useEffect(() => {
    if (!email) {
      navigate('/admin/login');
    }
  }, [email, navigate]);

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
        
        {/* OTP Form */}
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
              <FaShieldAlt className="text-white text-2xl" />
            </motion.div>
            <motion.h2 
              className="text-2xl font-bold text-white"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Enter OTP
            </motion.h2>
            <motion.p 
              className="text-orange-100 mt-2"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              We've sent a 6-digit code to your email
            </motion.p>
          </div>
          
          {/* Body */}
          <div className="p-6">
            <motion.p 
              className="text-gray-600 text-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Please enter the OTP sent to <span className="font-medium">{email}</span>
            </motion.p>
            
            {/* OTP Inputs */}
            <motion.form 
              onSubmit={handleSubmit}
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex justify-center space-x-3 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-12 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    maxLength={1}
                  />
                ))}
              </div>
              
              {error && (
                <motion.div 
                  className="text-red-500 text-sm text-center mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.div>
              )}
              
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
                  'Verify OTP'
                )}
              </motion.button>
            </motion.form>
            
            {/* Resend OTP */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p className="text-gray-600 mb-2">Didn't receive the code?</p>
              <button
                onClick={handleResend}
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                Resend OTP
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OTPPage;