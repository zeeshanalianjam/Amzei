// src/pages/TourConfirmationPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Axios } from '../common/axios';
import { summaryApi } from '../common/summaryApi';
import LoadingPopup from '../utils/LoadingPopup';
import { FaCheck, FaCalendarAlt, FaUsers, FaMoneyBillWave, FaMapMarkerAlt, FaStar, FaArrowLeft, FaHotel, FaUtensils, FaBus, FaHiking, FaSwimmer, FaCamera, FaClock } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const TourConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const { tour, bookingData, pricing } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    if (!tour || !bookingData || !pricing) {
      navigate('/tours');
    }
  }, [tour, bookingData, pricing, navigate]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString("en-AE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Dubai"
    });
  };

  const handleConfirmBooking = async () => {
    if (!bookingData.travelDate) {
      toast.error("Please select a travel date");
      return;
    }

    try {
      setPaymentProcessing(true);
      
      // Prepare the booking data for API
      const bookingPayload = {
        ...bookingData,
        fullName: user?.username,
        email: user?.email,
        phone: user?.phone,
        tourTitle: tour.title,
        tourLocation: tour.location,
        pricingDetails: [{
          basePrice: pricing.basePrice,
          perPersonPrice: pricing.perPersonPrice,
          additionalCost: pricing.additionalCost,
          totalPrice: pricing.totalPrice,
        }]
      };

      console.log("Booking Payload:", bookingPayload);

      // Call the booking API
      const response = await Axios({
        ...summaryApi.addTourPackage,
        data: bookingPayload
      });

      if (response.data.success) {
        setBookingId(response.data.bookingId || response.data._id);
        setBookingConfirmed(true);
        toast.success("Tour booked successfully!");
      } else {
        toast.error(response.data.message || "Failed to book tour");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.message || "Failed to book tour");
    } finally {
      setPaymentProcessing(false);
    }
  };

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

   useEffect(() => {
      if (!user?._id) {
        navigate('/login');
      }
    }, []);

  if (!tour || !bookingData || !pricing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Invalid Booking Information</h2>
          <button 
            onClick={() => navigate('/tours')}
            className="px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors"
          >
            Back to Tours
          </button>
        </div>
      </div>
    );
  }

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div 
              className="bg-white rounded-2xl shadow-xl overflow-hidden text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-8">
                <motion.div 
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
                  variants={itemVariants}
                >
                  <FaCheck className="text-green-500 text-3xl" />
                </motion.div>
                <motion.h2 
                  className="text-3xl font-bold text-white mb-2"
                  variants={itemVariants}
                >
                  Booking Confirmed!
                </motion.h2>
                <motion.p 
                  className="text-green-100"
                  variants={itemVariants}
                >
                  Your tour has been successfully booked
                </motion.p>
              </div>
              
              <div className="p-8">
                <motion.div 
                  className="mb-6"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Booking Details</h3>
                  <p className="text-gray-600">Booked Username: <span className="font-mono capitalize">{user?.username}</span></p>
                  <p className="text-gray-600">Email: <span className="font-mono">{user?.email}</span></p>
                </motion.div>
                
                <motion.div 
                  className="mb-6"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Tour Information</h3>
                  <div className="flex items-center mb-2">
                    <FaMapMarkerAlt className="text-orange-500 mr-2" />
                    <span className="text-gray-600">{tour.title}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaStar className="text-orange-500 mr-2" />
                    <span className="text-gray-600">{tour.rating} Rating</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-orange-500 mr-2" />
                    <span className="text-gray-600">{formatDate(bookingData.travelDate)}</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="mb-6"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Booking Information</h3>
                  <div className="flex items-center mb-2">
                    <FaUsers className="text-orange-500 mr-2" />
                    <span className="text-gray-600">{bookingData.numberOfGuests} Guests</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaCalendarAlt className="text-orange-500 mr-2" />
                    <span className="text-gray-600">{bookingData.numberOfDays} Days</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="mb-6"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Summary</h3>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Base Price</span>
                    <span className="text-gray-800">{formatCurrency(pricing.basePrice)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Total for {bookingData.numberOfGuests} guests</span>
                    <span className="text-gray-800">{formatCurrency(pricing.perPersonPrice)}</span>
                  </div>
                  {pricing.additionalCost > 0 && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Group surcharge</span>
                      <span className="text-gray-800">{formatCurrency(pricing.additionalCost)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-200 font-bold text-lg">
                    <span>Total Paid</span>
                    <span className="text-orange-500">{formatCurrency(pricing.totalPrice)}</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="mb-6"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4">What's Included</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <FaHotel className="text-orange-500 mr-2" />
                      <span className="text-gray-600">Accommodation</span>
                    </div>
                    <div className="flex items-center">
                      <FaUtensils className="text-orange-500 mr-2" />
                      <span className="text-gray-600">Meals</span>
                    </div>
                    <div className="flex items-center">
                      <FaBus className="text-orange-500 mr-2" />
                      <span className="text-gray-600">Transportation</span>
                    </div>
                    <div className="flex items-center">
                      <FaHiking className="text-orange-500 mr-2" />
                      <span className="text-gray-600">Guided Tours</span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex justify-center"
                  variants={itemVariants}
                >
                  <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                  >
                    Back to Home
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white pt-24 pb-16">
      <LoadingPopup isOpen={loading || paymentProcessing} />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              onClick={() => navigate(-1)}
              className="flex items-center text-orange-500 font-medium mb-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowLeft className="mr-2" /> Back
            </motion.button>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Confirm Your Booking</h1>
            <p className="text-gray-600">Please review your booking details before confirming</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tour Details */}
            <div className="lg:col-span-2">
              <motion.div 
                className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Tour Image */}
                <div className="relative h-64 overflow-hidden">
                  <div 
                    className="h-full w-full bg-gray-200" 
                    style={{ 
                      backgroundImage: `url('${tour.imageUrl}')`, 
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center' 
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-2xl font-bold">{tour.title}</h2>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>{tour.location}</span>
                    </div>
                  </div>
                </div>

                {/* Tour Info */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center bg-orange-100 text-orange-500 px-4 py-2 rounded-lg">
                      <FaStar className="mr-2" />
                      <span className="font-medium">{tour.rating} Rating</span>
                    </div>
                    <div className="flex items-center bg-blue-100 text-blue-500 px-4 py-2 rounded-lg">
                      <FaClock className="mr-2" />
                      <span className="font-medium">{tour.duration}</span>
                    </div>
                    <div className="flex items-center bg-green-100 text-green-500 px-4 py-2 rounded-lg">
                      <FaUsers className="mr-2" />
                      <span className="font-medium">{tour.groupSize} People</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Tour Description</h3>
                    <p className="text-gray-600">{tour.description}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Tour Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tour.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start">
                          <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                          <span className="text-gray-600">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">What's Included</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <FaHotel className="text-orange-500 text-xl mr-3" />
                        <span className="text-gray-600">Accommodation</span>
                      </div>
                      <div className="flex items-center">
                        <FaUtensils className="text-orange-500 text-xl mr-3" />
                        <span className="text-gray-600">Meals as per itinerary</span>
                      </div>
                      <div className="flex items-center">
                        <FaBus className="text-orange-500 text-xl mr-3" />
                        <span className="text-gray-600">Transportation</span>
                      </div>
                      <div className="flex items-center">
                        <FaHiking className="text-orange-500 text-xl mr-3" />
                        <span className="text-gray-600">Guided tours</span>
                      </div>
                      <div className="flex items-center">
                        <FaSwimmer className="text-orange-500 text-xl mr-3" />
                        <span className="text-gray-600">Water activities</span>
                      </div>
                      <div className="flex items-center">
                        <FaCamera className="text-orange-500 text-xl mr-3" />
                        <span className="text-gray-600">Photography service</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Booking Summary */}
            <div>
              <motion.div 
                className="bg-white rounded-2xl shadow-xl p-6 sticky top-24"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking Summary</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Tour Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tour</span>
                      <span className="text-gray-800">{tour.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location</span>
                      <span className="text-gray-800">{tour.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="text-gray-800">{tour.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating</span>
                      <span className="text-gray-800">{tour.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Number of Guests</span>
                      <span className="text-gray-800">{bookingData.numberOfGuests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Number of Days</span>
                      <span className="text-gray-800">{bookingData.numberOfDays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Travel Date</span>
                      <span className="text-gray-800">{formatDate(bookingData.travelDate)}</span>
                    </div>
                    {bookingData.specialRequests && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Special Requests</span>
                        <span className="text-gray-800">{bookingData.specialRequests || 'None'}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base Price</span>
                      <span className="text-gray-800">{formatCurrency(pricing.basePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total for {bookingData.numberOfGuests} guests</span>
                      <span className="text-gray-800">{formatCurrency(pricing.perPersonPrice)}</span>
                    </div>
                    {pricing.additionalCost > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Group surcharge</span>
                        <span className="text-gray-800">{formatCurrency(pricing.additionalCost)}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-gray-200 font-bold text-lg">
                      <span>Total</span>
                      <span className="text-orange-500">{formatCurrency(pricing.totalPrice)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 p-4 bg-orange-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Important Information</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Free cancellation up to 48 hours before departure</li>
                    <li>• Please arrive at the meeting point 15 minutes early</li>
                    <li>• Bring comfortable clothing and shoes</li>
                    <li>• Don't forget your camera for memorable moments</li>
                  </ul>
                </div>
                
                <motion.button
                  onClick={handleConfirmBooking}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold text-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={paymentProcessing}
                >
                  {paymentProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Confirm Booking
                    </>
                  )}
                </motion.button>
                
                <div className="text-xs text-gray-500 mt-4">
                  <p>By confirming this booking, you agree to our terms and conditions.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourConfirmationPage;