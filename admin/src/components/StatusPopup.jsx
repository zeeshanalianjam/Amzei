// src/components/StatusPopup.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSave, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

// 3D Floating Status Icon Component
function FloatingStatusIcon({ status }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const getIconProps = () => {
    switch (status) {
      case 'pending':
        return { color: '#f59e0b', icon: '⏳' };
      case 'approved':
        return { color: '#10b981', icon: '✓' };
      case 'cancelled':
        return { color: '#ef4444', icon: '✗' };
      default:
        return { color: '#6b7280', icon: '?' };
    }
  };

  const { color, icon } = getIconProps();

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
      <Text
        position={[0, 0, 1.1]}
        fontSize={1.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {icon}
      </Text>
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
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={particlesRef} />
      <pointsMaterial 
        size={0.05} 
        color="#fb923c" 
        transparent 
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

// 3D Scene Component
function Scene({ status }) {
  return (
    <>
      <color attach="background" args={['#1e293b']} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#fb923c" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
      
      <FloatingStatusIcon status={status} />
      <ParticleField count={100} />
      <Stars radius={20} depth={20} count={500} factor={2} />
    </>
  );
}

const StatusPopup = ({ 
  isOpen, 
  onClose, 
  currentStatus, 
  onUpdateStatus,
  title = "Update Status",
  message = "Select the new status for this item"
}) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-500', icon: <FaClock className="text-white" /> },
    { value: 'approved', label: 'Approved', color: 'bg-green-500', icon: <FaCheckCircle className="text-white" /> },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-500', icon: <FaTimesCircle className="text-white" /> }
  ];

  useEffect(() => {
    if (isOpen) {
      setSelectedStatus(currentStatus);
    }
  }, [isOpen, currentStatus]);

  const handleUpdate = async () => {
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      onUpdateStatus(selectedStatus);
      setIsUpdating(false);
      onClose();
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-500';
      case 'approved': return 'text-green-500';
      case 'cancelled': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 3D Background Canvas */}
            <div className="absolute inset-0 z-0">
              <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <Scene status={selectedStatus} />
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
                
                <motion.h2 
                  className="text-2xl font-bold text-white mb-2"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {title}
                </motion.h2>
                
                <motion.p 
                  className="text-orange-100"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {message}
                </motion.p>
              </div>
              
              {/* Body */}
              <div className="p-6">
                {/* Current Status */}
                <motion.div 
                  className="mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Status
                  </label>
                  <div className={`flex items-center px-4 py-2 rounded-lg bg-gray-100 ${getStatusColor(currentStatus)}`}>
                    <span className="font-medium capitalize">{currentStatus}</span>
                  </div>
                </motion.div>
                
                {/* Status Options */}
                <motion.div 
                  className="mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select New Status
                  </label>
                  <div className="space-y-2">
                    {statusOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        type="button"
                        onClick={() => setSelectedStatus(option.value)}
                        className={`w-full flex items-center p-3 rounded-lg border-2 transition-all ${
                          selectedStatus === option.value
                            ? `${option.color} border-transparent text-white`
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          selectedStatus === option.value ? 'bg-white bg-opacity-20' : option.color
                        }`}>
                          {option.icon}
                        </span>
                        <span className="font-medium">{option.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
                
                {/* Action Buttons */}
                <motion.div 
                  className="flex space-x-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    onClick={handleUpdate}
                    disabled={isUpdating || selectedStatus === currentStatus}
                    className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isUpdating ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-t-2 border-white border-solid rounded-full"
                      />
                    ) : (
                      <>
                        <FaSave className="mr-2" />
                        Update Now
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default StatusPopup;