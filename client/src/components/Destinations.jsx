// src/components/Destinations.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaArrowRight, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

const Destinations = () => {
  const places = useSelector((state) => state.places);
  const destinations = places?.allDestinations.slice(0, 3) || [];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      if (places?.allDestinations) {
        setLoading(false);
      } else {
        setLoading(false);
        setError("Failed to load destinations. Please try again later.");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [places]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-50 to-transparent z-0"></div>
      
      <div className="container relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Top Destinations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore the most iconic attractions across the UAE</p> 
          <div className="mt-4">
            <Link
              to="/destinations"
              className="inline-block px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors font-semibold shadow"
            >
              View All Destinations →
            </Link>
          </div>
        </motion.div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <FaSpinner className="animate-spin text-orange-500 text-4xl mx-auto mb-4" />
              <p className="text-gray-600">Loading amazing destinations...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center bg-red-50 p-6 rounded-lg max-w-md">
              <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
              <p className="text-gray-700 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {destinations.map((destination) => (
                <motion.div 
                  key={destination._id} 
                  className="card bg-white rounded-xl overflow-hidden shadow-lg"
                  variants={cardVariants}
                  whileHover="hover"
                  layout
                >
                  <div className="relative h-48 overflow-hidden">
                    <div 
                      className="h-full w-full bg-gray-200 transform transition-transform duration-500 hover:scale-110" 
                      style={{ 
                        backgroundImage: `url('${destination.imageUrl}')`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center' 
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-semibold">{destination.name}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{destination.shortDescription}</p>
                    <motion.button 
                      onClick={() => navigate(`/destination/${destination._id}`, { state: { destination }})} 
                      className="text-orange-500 font-semibold flex items-center hover:text-orange-600 transition-colors"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Learn More <FaArrowRight className="ml-2 text-sm" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}

              {destinations.length === 0 && (
                <div className="flex justify-center items-center min-h-[200px] col-span-full">
                  <motion.div 
                    className="text-center bg-red-50 p-6 rounded-lg max-w-md w-full"
                    variants={itemVariants}
                  >
                    <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
                    <p className="text-gray-700 mb-4">No destinations found.</p>
                    <button 
                      onClick={() => window.location.reload()} 
                      className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                    >
                      Try Again
                    </button>
                  </motion.div>
                </div>
              )}
            </motion.div>
            
          </>
        )}
      </div>
    </section>
  );
};

export default Destinations;