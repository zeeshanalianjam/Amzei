// src/admin/ForgotPasswordPopup.js
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import toast from 'react-hot-toast';
import { Axios } from '../common/axios';
import { summaryApi } from '../common/summaryApi';

// 3D Floating Envelope Component
function FloatingEnvelope() {
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
        <boxGeometry args={[2, 1, 0.5]} />
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
      
      <FloatingEnvelope />
      <ParticleField count={100} />
      <Stars radius={20} depth={20} count={500} factor={2} />
    </>
  );
}

const ForgotPasswordPopup = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await Axios({
        ...summaryApi.forgotPassword,
        data: { email },
      })

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setIsSubmitted(true);
        navigate('/admin/otp', { state: { email } });
        setEmail('');
      }
      
    } catch (error) {
      console.log("Error in forgot password : ", error);
      toast.error(error?.response?.data?.message || 'Error in forgot password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 3D Background Canvas */}
            <div className="absolute inset-0 z-0">
              <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <Scene />
              </Canvas>
            </div>
            
            {/* Popup Content */}
            <motion.div
              className="relative z-10 bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0, rotateX: -10 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 relative">
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes className="text-xl" />
                </motion.button>
                
                <motion.div 
                  className="text-center"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaEnvelope className="text-white text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Forgot Password</h2>
                  <p className="text-orange-100 mt-2">Enter your email to reset your password</p>
                </motion.div>
              </div>
              
              {/* Body */}
              <div className="p-6">
                {!isSubmitted ? (
                  <motion.form 
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="admin@uaetours.com"
                          required
                        />
                      </div>
                    </div>
                    
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
                        <>
                          <FaPaperPlane className="mr-2" />
                          Send OTP
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div 
                    className="text-center py-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaPaperPlane className="text-green-500 text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">OTP Sent Successfully!</h3>
                    <p className="text-gray-600">
                      We've sent a 6-digit OTP to <span className="font-medium">{email}</span>
                    </p>
                    <p className="text-gray-500 text-sm mt-2">Redirecting to OTP verification...</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ForgotPasswordPopup;