// src/pages/DestinationPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaArrowLeft, FaStar, FaMapMarkerAlt, FaClock, FaUsers, 
  FaMoneyBillWave, FaCalendarAlt, FaHeart, FaShareAlt 
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const DestinationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [destination, setDestination] = useState(location?.state?.destination);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  console.log("location , ", location)

  useEffect(() => {
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
      }).catch(console.error);
    } else {
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

        {/* Destination Info */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {destination.name || "Not Available"}
              </h1>
              <div className="flex items-center text-gray-600 mb-2">
                <FaMapMarkerAlt className="mr-2" />
                <span>{destination.location || "Not Available"}</span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center bg-orange-100 text-orange-500 px-2 py-1 rounded-md mr-3">
                  <FaStar className="mr-1" />
                  <span>{destination.rating || "Not Available"}</span>
                </div>
                <span className="text-gray-500">({destination.reviews?.length || 0} reviews)</span>
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

          {/* Destination Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl mb-8">
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
          </div>

          {/* Overview Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  About {destination.name || "Not Available"}
                </h2>
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

            {/* Right Column */}
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
                      <div className="font-medium">{destination?.language || 'Unknown'}</div>
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
                <p className="mb-4">
                  Book your trip to {destination.name || "Not Available"} now and create unforgettable memories.
                </p>
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
        </motion.div>
      </div>
    </div>
  );
};

export default DestinationPage;
