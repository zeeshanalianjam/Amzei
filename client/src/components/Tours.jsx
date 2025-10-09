// src/components/Tours.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tours } from '../data/Tours';
import { FaStar, FaMapMarkerAlt, FaClock, FaUsers, FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Tours = () => {
  const places = useSelector((state) => state.places);
  const toursData = places?.allTours
  const featuredTours = toursData.slice(0, 3)
  console.log("Featured Tours:", featuredTours);
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   // Get the first 3 tours as featured
  //   setFeaturedTours(tours.slice(0, 3));
  // }, []);

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

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full filter blur-3xl opacity-20 -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-100 rounded-full filter blur-3xl opacity-20 -ml-32 -mb-32"></div>
      
      <div className="container relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Popular Tour Packages</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Choose from our carefully designed tour packages</p>
          <motion.div 
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link 
              to="/tours" 
              className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors"
            >
              View All Tours <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {featuredTours.map((tour) => (
            <motion.div 
              key={tour.id} 
              className="bg-white rounded-xl overflow-hidden shadow-lg"
              variants={cardVariants}
              whileHover="hover"
              layout
            >
              <div className="relative h-56 overflow-hidden">
                <div 
                  className="h-full w-full bg-gray-200 transform transition-transform duration-700 hover:scale-110" 
                  style={{ 
                    backgroundImage: `url('${tour.imageUrl}')`, 
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
              <div className="p-6">
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
                      onClick={() => navigate(`/tour/${tour._id}`, { state: { tour } })}
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
      </div>
    </section>
  );
};

export default Tours;