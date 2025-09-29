// src/pages/AllToursPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tours } from '../data/Tours';
import { FaStar, FaMapMarkerAlt, FaClock, FaUsers, FaSearch, FaFilter, FaArrowLeft } from 'react-icons/fa';

const AllToursPage = () => {
  const navigate = useNavigate();
  const [filteredTours, setFilteredTours] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [durationFilter, setDurationFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setFilteredTours(tours);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let results = tours;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(tour => 
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply duration filter
    if (durationFilter !== 'all') {
      const [min, max] = durationFilter.split('-').map(Number);
      results = results.filter(tour => {
        const days = parseInt(tour.duration);
        return days >= min && days <= max;
      });
    }
    
    // Apply price filter
    if (priceFilter !== 'all') {
      const [min, max] = priceFilter.split('-').map(Number);
      results = results.filter(tour => {
        return tour.price >= min && tour.price <= max;
      });
    }
    
    setFilteredTours(results);
  }, [searchTerm, durationFilter, priceFilter]);

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
            <h1 className="text-4xl font-bold text-gray-800 mb-4">All Tour Packages</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our wide range of carefully crafted tour experiences</p>
          </div>
          
          {/* Search and filters */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
                  placeholder="Search tours..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaClock className="text-gray-400" />
                </div>
                <select
                  className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm appearance-none"
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                >
                  <option value="all">All Durations</option>
                  <option value="1-3">1-3 Days</option>
                  <option value="4-7">4-7 Days</option>
                  <option value="8-14">8-14 Days</option>
                  <option value="15+">15+ Days</option>
                </select>
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
                <select
                  className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm appearance-none"
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                >
                  <option value="all">All Prices</option>
                  <option value="0-500">Under AED 500</option>
                  <option value="500-1000">AED 500 - 1000</option>
                  <option value="1000-2000">AED 1000 - 2000</option>
                  <option value="2000+">Over AED 2000</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading amazing tours...</p>
            </div>
          </div>
        ) : (
          <>
            {filteredTours.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No tours found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setDurationFilter('all');
                    setPriceFilter('all');
                  }}
                  className="px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6 text-gray-600">
                  Showing {filteredTours.length} tour{filteredTours.length !== 1 ? 's' : ''}
                </div>
                
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredTours.map((tour) => (
                    <motion.div 
                      key={tour.id} 
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
                            backgroundImage: `url('${tour.image}')`, 
                            backgroundSize: 'cover', 
                            backgroundPosition: 'center' 
                          }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Popular
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-xl font-bold">{tour.title}</h3>
                          <div className="flex items-center mt-1 text-sm">
                            <FaMapMarkerAlt className="mr-1" />
                            <span>{tour.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center">
                            <div className="flex items-center bg-orange-100 text-orange-500 px-2 py-1 rounded-md">
                              <FaStar className="mr-1" />
                              <span>{tour.rating}</span>
                            </div>
                            <div className="flex items-center text-gray-500 ml-3 text-sm">
                              <FaClock className="mr-1" />
                              <span>{tour.duration}</span>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <FaUsers className="mr-1" />
                            <span>{tour.groupSize} people</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2">{tour.description}</p>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-gray-500">From </span>
                            <span className="text-xl font-bold text-orange-500">AED {tour.price}</span>
                            <span className="text-gray-500 text-sm">/person</span>
                          </div>
                          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                            <button 
                              onClick={() => navigate(`/tour/${tour.id}`)}
                              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                            >
                              View Details
                            </button>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllToursPage;