// src/components/ConfirmPopup.js
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Stars, Float } from '@react-three/drei';

// 3D Floating Warning Icon Component
function WarningIcon() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.5;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef}>
        {/* Exclamation Mark */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.8, 32]} />
          <meshStandardMaterial color="#f97316" />
        </mesh>
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
          <meshStandardMaterial color="#f97316" />
        </mesh>
      </group>
    </Float>
  );
}

// 3D Floating Particles Component
function FloatingParticles() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(20)].map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 2 + Math.random() * 1;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 2;
        
        return (
          <Float
            key={i}
            speed={1 + Math.random() * 2}
            rotationIntensity={0.5}
            floatIntensity={0.5}
            position={[x, y, z]}
          >
            <mesh>
              <sphereGeometry args={[0.05 + Math.random() * 0.1, 16, 16]} />
              <meshStandardMaterial 
                color={i % 3 === 0 ? "#f97316" : i % 3 === 1 ? "#fb923c" : "#fed7aa"} 
                emissive={i % 3 === 0 ? "#f97316" : i % 3 === 1 ? "#fb923c" : "#fed7aa"}
                emissiveIntensity={0.5}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

// 3D Scene Component
function ConfirmScene() {
  return (
    <>
      <color attach="background" args={['rgba(255, 255, 255, 0.9)']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#f97316" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ffffff" />
      
      <WarningIcon />
      <FloatingParticles />
      
      <Stars radius={10} depth={20} count={100} factor={2} />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5} 
      />
    </>
  );
}

const ConfirmPopup = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Delete", 
  message = "Are you sure you want to delete this item?", 
  confirmText = "Delete", 
  cancelText = "Cancel",
  loading = false
}) => {
  // Close popup when pressing Escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Popup Container */}
            <motion.div
              className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 3D Canvas */}
              <div className="h-48 relative">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                  <ConfirmScene />
                </Canvas>
                
                {/* Overlay Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.h2 
                    className="text-3xl font-bold text-orange-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {title}
                  </motion.h2>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <motion.p 
                  className="text-gray-600 mb-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {message}
                </motion.p>
                
                {/* Buttons */}
                <motion.div 
                  className="flex space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                  >
                    {cancelText}
                  </motion.button>
                  
                  <motion.button
                    className="flex-1 py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onConfirm}
                  >
                    {loading ? (
                        <motion.div
                                          animate={{ rotate: 360 }}
                                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                          className="w-5 h-5 border-t-2 border-white border-solid rounded-full mx-auto"
                                        />
                    ) : (
                        confirmText
                    )}
                    
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Floating Orbs */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed rounded-full bg-orange-200 opacity-30 z-40 pointer-events-none"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 60 - 30, 0],
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmPopup;