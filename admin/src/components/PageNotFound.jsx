// src/components/PageNotFound.js
import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls, Stars, Float } from '@react-three/drei';

// 3D Floating Text Component
function FloatingText({ text, position, rotation }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <Text
      ref={meshRef}
      position={position}
      rotation={rotation}
      fontSize={0.5}
      color="#fb923c"
      anchorX="center"
      anchorY="middle"
      font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
    >
      {text}
    </Text>
  );
}

// 3D Floating Orbs Component
function FloatingOrbs() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(i) * 0.5;
        
        return (
          <Float
            key={i}
            speed={1 + i * 0.2}
            rotationIntensity={0.5}
            floatIntensity={0.5}
            position={[x, y, z]}
          >
            <mesh>
              <sphereGeometry args={[0.2, 32, 32]} />
              <meshStandardMaterial 
                color={i % 2 === 0 ? '#fb923c' : '#ffffff'} 
                metalness={0.5}
                roughness={0.2}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

// 3D Particle System Component
function ParticleField() {
  const points = useRef();
  
  useEffect(() => {
    if (points.current) {
      const positions = new Float32Array(1000 * 3);
      
      for (let i = 0; i < 1000; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      }
      
      points.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry />
      <pointsMaterial size={0.02} color="#fb923c" />
    </points>
  );
}

// 3D Scene Component
function Scene() {
  return (
    <>
      <color attach="background" args={['#ffffff']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#fb923c" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
      
      <FloatingText text="404" position={[0, 1, 0]} rotation={[0, 0, 0]} />
      <FloatingText text="NOT FOUND" position={[0, 0, 0]} rotation={[0, 0, 0]} />
      
      <FloatingOrbs />
      <ParticleField />
      <Stars radius={50} depth={50} count={1000} factor={2} />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5} 
      />
    </>
  );
}

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden relative">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <Scene />
        </Canvas>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-orange-500 mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            Oops!
          </motion.h1>
          
          <motion.h2 
            className="text-2xl md:text-4xl font-semibold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Page Not Found
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <button
             onClick={() => navigate("/login")}
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Go to Homepage
            </button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-orange-200 opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 40 - 20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Bottom Wave Animation */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-24 bg-orange-500"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#ffffff"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default PageNotFound;