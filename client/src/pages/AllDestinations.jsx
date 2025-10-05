// src/pages/AllDestinations.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSearch, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const AllDestinations = () => {
  const places = useSelector((state) => state.places);
  const destinations = places?.allDestinations || [];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState([]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      if (places?.allDestinations) {
        setLoading(false);
        setFilteredDestinations(places.allDestinations);
      } else {
        setLoading(false);
        setError("Failed to load destinations. Please try again later.");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [places]);

  useEffect(() => {
    if (destinations.length > 0) {
      const results = destinations.filter(destination =>
        destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destination.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDestinations(results);
    }
  }, [searchTerm, destinations]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -15,
      rotateX: 5,
      rotateY: 5,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header with back button */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center text-orange-500 font-medium mb-6"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FaArrowLeft className="mr-2" /> Back
          </motion.button>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">All Destinations</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover all the amazing places you can visit across the UAE</p>
          </div>
          
          {/* Search bar */}
          <div className="max-w-xl mx-auto mb-10">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading amazing destinations...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center bg-red-50 p-8 rounded-xl max-w-md shadow-lg">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <>
            {filteredDestinations.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No destinations found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search term</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredDestinations.map((destination) => (
                  <motion.div 
                    key={destination._id} 
                    className="bg-white rounded-2xl overflow-hidden shadow-xl"
                    variants={cardVariants}
                    whileHover="hover"
                    layout
                    style={{ perspective: "1000px" }}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <div 
                        className="h-full w-full transform transition-transform duration-700 hover:scale-110" 
                        style={{ 
                          backgroundImage: `url('${destination.imageUrl}')`, 
                          backgroundSize: 'cover', 
                          backgroundPosition: 'center' 
                        }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-bold">{destination.name}</h3>
                          <div className="flex items-center bg-orange-500 px-2 py-1 rounded-md">
                            <FaStar className="text-yellow-300 mr-1" />
                            <span className="text-sm font-medium">{destination.rating || '4.8'}</span>
                          </div>
                        </div>
                        <div className="flex items-center mt-2 text-sm">
                          <FaMapMarkerAlt className="mr-1" />
                          <span>{destination.location || 'UAE'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-gray-600 mb-4 line-clamp-2">{destination.shortDescription}</p>
                      <motion.button
                        onClick={() => navigate(`/destination/${destination._id}`, { state: { destination }})} 
                        className="w-full py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        Explore Destination
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllDestinations;