// src/pages/TourDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getTourById } from '../data/Tours';
import { toast } from 'react-hot-toast';
import { FaStar, FaMapMarkerAlt, FaClock, FaUsers, FaCalendarAlt, FaArrowLeft, FaCheck, FaHotel, FaUtensils, FaBus, FaHiking, FaSwimmer, FaCamera } from 'react-icons/fa';

const TourDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("location", location?.state?.tour);
  const tour = location?.state?.tour
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    numberOfGuests: 1,
    numberOfDays: 1,
    specialRequests: '',
    travelDate: ''
  });

  // useEffect(() => {
  //   const fetchTour = async () => {
  //     setLoading(true);
  //     try {
  //       // Simulate API call
  //       setTimeout(() => {
  //         const foundTour = getTourById(id);
  //         if (foundTour) {
  //           setTour(foundTour);
  //           // Set default number of days to tour duration
  //           const days = parseInt(foundTour.duration);
  //           setBookingData(prev => ({
  //             ...prev,
  //             numberOfDays: days
  //           }));
  //         } else {
  //           toast.error("Tour not found");
  //           navigate('/tours');
  //         }
  //         setLoading(false);
  //       }, 800);
  //     } catch (error) {
  //       toast.error("Failed to load tour details");
  //       console.error(error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchTour();
  // }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculatePricing = () => {
    if (!tour) return { basePrice: 0, totalPrice: 0, perPersonPrice: 0 };
    
    const basePrice = tour.price * bookingData.numberOfDays;
    const perPersonPrice = basePrice * bookingData.numberOfGuests;
    
    // Add additional costs based on group size
    let additionalCost = 0;
    if (bookingData.numberOfGuests > 4) {
      additionalCost = perPersonPrice * 0.1; // 10% surcharge for large groups
    }
    
    const totalPrice = perPersonPrice + additionalCost;
    
    return {
      basePrice,
      perPersonPrice,
      additionalCost,
      totalPrice
    };
  };

  const pricing = calculatePricing();

  const handleBookNow = () => {
    if (!bookingData.travelDate) {
      toast.error("Please select a travel date");
      return;
    }

    console.log("Booking data:", bookingData);
    console.log("Pricing:", pricing);
    
    // Navigate to booking page with tour and booking data
    // navigate('/booking', { 
    //   state: { 
    //     tour, 
    //     bookingData,
    //     pricing
    //   } 
    // });
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

  const cardVariants = {
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

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
  //         <p className="text-gray-600">Loading tour details...</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tour Not Found</h2>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header with back button */}
        <motion.div 
          className="mb-8"
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
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tour Details */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Tour Image */}
              <div className="relative h-96 overflow-hidden">
                <div 
                  className="h-full w-full bg-gray-200" 
                  style={{ 
                    backgroundImage: `url('${tour.imageUrl}')`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h1 className="text-3xl font-bold mb-2">{tour.title}</h1>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    <span className="text-lg">{tour.location}</span>
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

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Tour</h2>
                  <p className="text-gray-600 mb-4">{tour.description}</p>
                  <p className="text-gray-600">{tour.longDescription}</p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Tour Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tour.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">What's Included</h2>
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

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Itinerary</h2>
                  <div className="space-y-4">
                    {tour?.itinerary?.map((day, index) => (
                      <div key={index} className="border-l-2 border-orange-500 pl-4 py-1">
                        <h3 className="font-bold text-lg text-gray-800">Day {day.day}: {day.title}</h3>
                        <p className="text-gray-600">{day.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Booking Panel */}
          <div>
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-6 sticky top-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Book This Tour</h2>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Base Price</span>
                  <span className="text-lg font-semibold">AED {tour.price}/day</span>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Number of Guests</label>
                  <select
                    name="numberOfGuests"
                    value={bookingData.numberOfGuests}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Number of Days</label>
                  <select
                    name="numberOfDays"
                    value={bookingData.numberOfDays}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {[...Array(14)].map((_, i) => {
                      const days = i + 1;
                      return (
                        <option key={days} value={days}>
                          {days} {days === 1 ? 'Day' : 'Days'}
                        </option>
                      );
                    })}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Travel Date</label>
                  <input
                    type="date"
                    name="travelDate"
                    value={bookingData.travelDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Special Requests</label>
                  <textarea
                    name="specialRequests"
                    value={bookingData.specialRequests}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows="3"
                    placeholder="Any special requests?"
                  ></textarea>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Price per person</span>
                    <span>AED {pricing.basePrice}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Total for {bookingData.numberOfGuests} guests</span>
                    <span>AED {pricing.perPersonPrice}</span>
                  </div>
                  {pricing.additionalCost > 0 && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Group surcharge</span>
                      <span>AED {pricing.additionalCost}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-orange-500">AED {pricing.totalPrice}</span>
                  </div>
                </div>
                
                <motion.button
                  onClick={handleBookNow}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold text-lg shadow-md hover:shadow-lg transition-all"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Book Now
                </motion.button>
              </div>
              
              <div className="text-xs text-gray-500 mt-4">
                <p>Free cancellation up to 48 hours before departure.</p>
                <p className="mt-1">Secure payment with encrypted transactions.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailPage;