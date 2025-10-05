// src/pages/DestinationPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaStar, FaMapMarkerAlt, FaClock, FaUsers, FaHotel, FaUtensils, FaBus, FaCamera, FaSwimmingPool, FaShoppingBag, FaCalendarAlt, FaMoneyBillWave, FaHeart, FaShareAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const DestinationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [destination, setDestination] = useState(location?.state?.destination);
  console.log("destination: ", destination)
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Simulate loading additional destination data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Destination Not Found</h2>
          <button
            onClick={() => navigate('/destinations')}
            className="px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors"
          >
            Back to Destinations
          </button>
        </div>
      </div>
    );
  }

  // Mock data for additional destination information
  const destinationDetails = {
    ...destination,
    rating: 4.7,
    reviews: 1243,
    bestTimeToVisit: "November to March",
    averageTemperature: "25°C - 30°C",
    currency: "AED",
    language: ["Arabic", "English"],
    highlights: [
      "Stunning architecture and modern skyscrapers",
      "World-class shopping experiences",
      "Rich cultural heritage and museums",
      "Beautiful beaches and desert landscapes",
      "Exciting adventure activities"
    ],
    thingsToDo: [
      {
        title: "City Tour",
        description: "Explore the iconic landmarks and attractions",
        duration: "Half Day",
        price: "AED 250"
      },
      {
        title: "Desert Safari",
        description: "Experience the thrill of dune bashing and cultural entertainment",
        duration: "6 Hours",
        price: "AED 350"
      },
      {
        title: "Dhow Cruise",
        description: "Enjoy a dinner cruise along the coastline",
        duration: "3 Hours",
        price: "AED 200"
      },
      {
        title: "Theme Park Visit",
        description: "Fun-filled day at world-renowned theme parks",
        duration: "Full Day",
        price: "AED 400"
      }
    ],
    accommodations: [
      {
        name: "Luxury Resort",
        description: "5-star beachfront resort with premium amenities",
        price: "AED 800/night"
      },
      {
        name: "Boutique Hotel",
        description: "Stylish hotel in the heart of the city",
        price: "AED 500/night"
      },
      {
        name: "Budget-Friendly",
        description: "Comfortable accommodation at an affordable price",
        price: "AED 250/night"
      }
    ],
    restaurants: [
      {
        name: "Fine Dining Restaurant",
        cuisine: "International",
        price: "AED 300/person"
      },
      {
        name: "Local Eatery",
        cuisine: "Traditional",
        price: "AED 80/person"
      },
      {
        name: "Cafe",
        cuisine: "Continental",
        price: "AED 120/person"
      }
    ],
    travelTips: [
      "Dress modestly when visiting religious sites",
      "Stay hydrated and protect yourself from the sun",
      "Bargain is expected in traditional markets",
      "Public transportation is efficient and affordable",
      "Learn a few basic Arabic phrases"
    ]
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

  const handleBookNow = () => {
    navigate('/booking', {
      state: {
        destination: destination.name,
        destinationData: destination
      }
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: destination.name,
        text: destination.shortDescription,
        url: window.location.href,
      })
        .catch(console.error);
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading destination details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header with back button */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center text-orange-500 font-medium mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft className="mr-2" /> Back
          </motion.button>
        </motion.div>

        <motion.div
          className="mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Destination Header */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{destination.name || "Not Available"}</h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{destination.location || "Not Available"}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center bg-orange-100 text-orange-500 px-2 py-1 rounded-md mr-3">
                    <FaStar className="mr-1" />
                    <span>{destination.rating || "Not Available"}</span>
                  </div>
                  <span className="text-gray-500">({destination.reviews?.length} reviews)</span>
                </div>
              </div>
              <div className="flex space-x-3 mt-4 md:mt-0">
                <motion.button
                  onClick={toggleFavorite}
                  className={`p-3 rounded-full ${isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-500 bg-gray-100'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaHeart />
                </motion.button>
                <motion.button
                  onClick={handleShare}
                  className="p-3 rounded-full text-gray-500 bg-gray-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaShareAlt />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Destination Image */}
          <motion.div
            className="relative h-96 rounded-2xl overflow-hidden shadow-xl mb-8"
            variants={itemVariants}
          >
            <div
              className="h-full w-full transform transition-transform duration-700 hover:scale-105"
              style={{
                backgroundImage: `url('${destination.imageUrl}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center mb-2">
                <FaCalendarAlt className="mr-2" />
                <span>Best time to visit: {destination.bestTimeToVisit || "Not Available"}</span>
              </div>
              <div className="flex items-center">
                <FaMoneyBillWave className="mr-2" />
                <span>Currency: {destination.currency || "Not Available"}</span>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex border-b border-gray-200">
              {['overview', 'thingsToDo', 'accommodations', 'restaurants', 'travelTips'].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 font-medium text-sm ${activeTab === tab ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div variants={itemVariants}>
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">About {destination.name || "Not Available"}</h2>
                    <p className="text-gray-600 mb-4">{destination.shortDescription || "Not Available"}</p>
                    <p className="text-gray-700">{destination.detailedDescription || "Not Available"}</p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Highlights</h3>
                    {destination.highlights && destination.highlights.length > 0 ? (
                      <ul className="space-y-2">
                        {destination.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                            </div>
                            <span className="text-gray-600">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic">No highlights found</p>
                    )}
                  </div>

                </div>

                <div>
                  <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Facts</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <FaClock className="text-orange-500 mr-3" />
                        <div>
                          <div className="text-sm text-gray-500">Best Time to Visit</div>
                          <div className="font-medium">{destination.bestTimeToVisit || 'Unknown'}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FaUsers className="text-orange-500 mr-3" />
                        <div>
                          <div className="text-sm text-gray-500">Language</div>
                          <div className="font-medium">{destination?.language?.join(', ') || 'Unknown'}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FaMoneyBillWave className="text-orange-500 mr-3" />
                        <div>
                          <div className="text-sm text-gray-500">Currency</div>
                          <div className="font-medium">{destination.currency || 'Unknown'}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-md p-6 text-white">
                    <h3 className="text-xl font-bold mb-4">Ready to Explore?</h3>
                    <p className="mb-4">Book your trip to {destination.name || "Not Available"} now and create unforgettable memories.</p>
                    <motion.button
                      onClick={handleBookNow}
                      className="w-full py-3 bg-white text-orange-500 rounded-lg font-bold shadow-md hover:bg-orange-50 transition-colors"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Book Now
                    </motion.button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'thingsToDo' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {destination.thingsToDo.map((activity, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="h-48 bg-gray-200" style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}></div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{activity.title || "Not Available"}</h3>
                        <span className="text-orange-500 font-bold">{activity.price || "Not Available"} {destination.currency}</span>
                      </div>
                      <p className="text-gray-600 mb-4">{activity.description || "Not Available"}</p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <FaClock className="mr-2" />
                        <span>{activity.duration || "Not Available"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'accommodations' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {destination.accommodations.map((accommodation, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="h-48 bg-gray-200" style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}></div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{accommodation.title || "Not Available"}</h3>
                      <p className="text-gray-600 mb-4">{accommodation.description || "Not Available"}</p>
                      <div className="text-orange-500 font-bold">{accommodation.price || "Not Available"} {destination.currency}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'restaurants' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {destination.restaurants.map((restaurant, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="h-48 bg-gray-200" style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}></div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{restaurant.title || "Not Available"}</h3>
                      <div className="text-gray-600 mb-2">{restaurant.cuisine || "Not Available"} Cuisine</div>
                      <div className="text-orange-500 font-bold">{restaurant.price || "Not Available"} {destination.currency}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'travelTips' && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Travel Tips for {destination.name || "Not Available"}</h3>
                <ul className="space-y-3">
                  {destination.travelTips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      </div>
                      <span className="text-gray-600">{tip.title || "Not Available"}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DestinationPage;