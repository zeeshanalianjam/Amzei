// src/pages/BookingSuccess.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave, FaPrint, FaDownload } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  
  const { bookingId, paymentId, destination } = location.state || {};

  useEffect(() => {
    if (!bookingId) {
      navigate('/');
    }
  }, [bookingId, navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
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

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert('Booking details downloaded!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white text-center">
            <motion.div variants={itemVariants}>
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  <FaCheckCircle className="text-white text-4xl" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-orange-100">Thank you for booking with Amzei Tours</p>
            </motion.div>
          </div>

          {/* Booking Details */}
          <div className="p-8">
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Booking Information</h3>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="text-gray-500 w-32">Booking ID:</span>
                      <span className="font-medium">{bookingId}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-32">Payment ID:</span>
                      <span className="font-medium">{paymentId}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-32">Booked By:</span>
                      <span className="font-medium">{user?.name}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-32">Email:</span>
                      <span className="font-medium">{user?.email}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Trip Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-orange-500 mr-2" />
                      <span className="font-medium">{destination}</span>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-orange-500 mr-2" />
                      <span className="font-medium">Travel Date: To be confirmed</span>
                    </div>
                    <div className="flex items-center">
                      <FaMoneyBillWave className="text-orange-500 mr-2" />
                      <span className="font-medium">Payment: Successful</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">What's Next?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-orange-100 text-orange-500 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Confirmation Email</h3>
                    <p className="text-gray-600">We've sent a confirmation email with all the details of your booking.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-orange-100 text-orange-500 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Travel Itinerary</h3>
                    <p className="text-gray-600">You'll receive a detailed itinerary 7 days before your trip.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-orange-100 text-orange-500 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Enjoy Your Trip</h3>
                    <p className="text-gray-600">Have a wonderful time exploring {destination}!</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handlePrint}
                className="flex items-center justify-center px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FaPrint className="mr-2" />
                Print Booking
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center justify-center px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                <FaDownload className="mr-2" />
                Download PDF
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
              >
                Back to Home
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingSuccess;