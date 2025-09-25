// src/components/ComingSoonCSS3D.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ComingSoonCSS3D = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set target date (30 days from now)
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference <= 0) {
        clearInterval(interval);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Subscribed email:', email);
    setIsSubscribed(true);
    setEmail('');
    
    // Reset subscription status after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Crystals */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `conic-gradient(from ${Math.random() * 360}deg, transparent, rgba(251, 146, 60, 0.3), transparent)`,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }}
            animate={{
              rotate: [0, 360],
              y: [0, -50, 0],
              x: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
        
        {/* Floating Orbs */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 80 + 20,
              height: Math.random() * 80 + 20,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, rgba(251, 146, 60, 0.3), transparent)`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 200 - 100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
        
        {/* Particle Field */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-orange-500"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -Math.random() * 100 - 50, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      {/* 3D Rotating Cube */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(25deg) rotateY(25deg)',
        }}
        animate={{
          rotateY: 360,
          rotateX: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face, i) => (
          <motion.div
            key={face}
            className="absolute w-full h-full bg-orange-500 bg-opacity-20 border-2 border-orange-300 flex items-center justify-center"
            style={{
              transform: `
                ${face === 'front' ? 'translateZ(64px)' : ''}
                ${face === 'back' ? 'rotateY(180deg) translateZ(64px)' : ''}
                ${face === 'right' ? 'rotateY(90deg) translateZ(64px)' : ''}
                ${face === 'left' ? 'rotateY(-90deg) translateZ(64px)' : ''}
                ${face === 'top' ? 'rotateX(90deg) translateZ(64px)' : ''}
                ${face === 'bottom' ? 'rotateX(-90deg) translateZ(64px)' : ''}
              `,
            }}
          >
            <span className="text-orange-500 font-bold">{i + 1}</span>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            Amzei
          </motion.h1>
          
          <motion.h2 
            className="text-2xl md:text-4xl font-semibold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Is Coming Soon
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We're working hard to bring you an incredible experience. Stay tuned!
          </motion.p>
        </motion.div>
        
        {/* Countdown Timer */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {Object.entries(countdown).map(([unit, value]) => (
            <motion.div
              key={unit}
              className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-700"
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(251, 146, 60, 0.3)' }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="text-3xl md:text-5xl font-bold text-orange-500"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {value.toString().padStart(2, '0')}
              </motion.div>
              <div className="text-sm md:text-base text-slate-300 uppercase mt-2">
                {unit}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Email Subscription */}
        <motion.div 
          className="w-full max-w-md mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-lg bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <motion.button
              type="submit"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Notify Me
            </motion.button>
          </form>
          
          {isSubscribed && (
            <motion.div
              className="mt-3 text-green-400 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              Thank you for subscribing!
            </motion.div>
          )}
        </motion.div>
        
        {/* Social Media Links */}
        <motion.div 
          className="flex space-x-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
            <motion.a
              key={social}
              href="#"
              className="w-12 h-12 rounded-full bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 flex items-center justify-center text-slate-300 hover:text-orange-500 hover:border-orange-500 transition-colors"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-6 h-6 bg-current rounded-full"></div>
            </motion.a>
          ))}
        </motion.div>
        
        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>
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
            fill="#0f172a"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default ComingSoonCSS3D;