
// src/components/Hero.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTourBooking } from "../store/tourBookingSlice";

const Hero = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        destination: "Dubai",
        checkIn: "",
        checkOut: "",
    });

    const destinations = [
        "Dubai",
        "Abu Dhabi",
        "Sharjah",
        "Ajman",
        "Fujairah",
        "Ras Al Khaimah",
        "Umm Al Quwain",
    ];

    // Input change handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user._id) {
            navigate("/login");
            return;
        }
        dispatch(setTourBooking(formData));
        navigate(`/booking/${user._id}`, { state: formData });
    };

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Local Background Video */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="/13153069_2160_3840_30fps.mp4"
                autoPlay
                loop
                muted
                playsInline
            />

            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
            <div className="absolute inset-0 hero-gradient"></div>

            {/* Content */}
            <div className="relative z-10 text-white text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-bounce-in">
                    Discover the Magic of UAE
                </h1>

                {/* Booking Form */}
                <div className="bg-white bg-opacity-95 rounded-xl p-8 max-w-3xl mx-auto shadow-2xl backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Plan Your Perfect Trip
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-4 gap-6"
                    >
                        {/* Destination */}
                        <div className="md:col-span-1">
                            <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                                <span className="mr-2">📍</span> Destination
                            </label>
                            <select
                                name="destination"
                                value={formData.destination}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-black"
                            >
                                {destinations.map((dest) => (
                                    <option key={dest} value={dest}>
                                        {dest}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Check-in */}
                        <div className="md:col-span-1">
                            <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                                <span className="mr-2">📅</span> Check-in
                            </label>
                            <input
                                type="date"
                                name="checkIn"
                                value={formData.checkIn}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-black"
                                min={new Date().toISOString().split("T")[0]}
                                required
                            />
                        </div>

                        {/* Check-out */}
                        <div className="md:col-span-1">
                            <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                                <span className="mr-2">📅</span> Check-out
                            </label>
                            <input
                                type="date"
                                name="checkOut"
                                value={formData.checkOut}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-black"
                                min={new Date().toISOString().split("T")[0]}
                                required
                            />
                        </div>

                        {/* Search Button */}
                        <div className="md:col-span-1 flex items-end">
                            <button
                                type="submit"
                                className="w-full btn-primary text-center py-3 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                            >
                                Search Tours
                            </button>
                        </div>
                    </form>
                </div>
// src/components/Hero.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTourBooking } from "../store/tourBookingSlice";
import { motion } from "framer-motion";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaSpinner } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Hero = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const places = useSelector((state) => state.places);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    destination: "Dubai",
    checkIn: "",
    checkOut: "",
  });

  // Get unique destinations from the Redux store
  const destinations = places?.allDestinations 
    ? [...new Set(places.allDestinations.map((destination) => destination.location))]
    : [];

  useEffect(() => {
    // Simulate loading destinations
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [places]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user._id) {
      navigate("/login");
      return;
    }

    // Validate dates
    if(formData.checkIn || formData.checkOut) {
      if ( !formData.checkIn || !formData.checkOut) {
        toast.error("Please select both check-in and check-out dates");
        return;
      }
    }

    if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      dispatch(setTourBooking(formData));
      navigate(`/booking/${user._id}`, { state: formData });
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("Failed to search tours. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
    },
    tap: { scale: 0.95 }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <img
          className="w-full h-full object-cover"
          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExandnaTZlOGo5Mnl0b3VidDAzaTgzOWY5eXhyY3ZoMXFocjFyY214NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2yxdwElVqwapon7aZA/giphy.gif"
          alt="UAE Landscape"
        />
      </div>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 text-white text-center w-full px-4">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            variants={itemVariants}
          >
            Discover the Magic of UAE
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-10 text-orange-100"
            variants={itemVariants}
          >
            Experience luxury, adventure, and culture in the heart of the Middle East
          </motion.p>

          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-2xl font-bold mb-6"
              variants={itemVariants}
            >
              Plan Your Perfect Trip
            </motion.h2>
            
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-0 md:grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Destination */}
              <motion.div className="md:col-span-4" variants={itemVariants}>
                <label className="block text-sm font-semibold mb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-orange-400" /> Destination
                </label>
                <div className="relative">
                  {loading ? (
                    <div className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg flex items-center justify-center">
                      <FaSpinner className="animate-spin text-white mr-2" />
                      <span>Loading destinations...</span>
                    </div>
                  ) : (
                    <select
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-white appearance-none"
                    >
                      {destinations.length > 0 ? (
                        destinations.map((dest) => (
                          <option key={dest} value={dest} className="text-gray-800">
                            {dest}
                          </option>
                        ))
                      ) : (
                        <option value="" className="text-gray-800" disabled>
                          No destinations available
                        </option>
                      )}
                    </select>
                  )}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Check-in */}
              <motion.div className="md:col-span-3" variants={itemVariants}>
                <label className="block text-sm font-semibold mb-2 flex items-center">
                  <FaCalendarAlt className="mr-2 text-orange-400" /> Check-in
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-white"
                  min={new Date().toISOString().split("T")[0]}
                 
                />
              </motion.div>

              {/* Check-out */}
              <motion.div className="md:col-span-3" variants={itemVariants}>
                <label className="block text-sm font-semibold mb-2 flex items-center">
                  <FaCalendarAlt className="mr-2 text-orange-400" /> Check-out
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-white"
                  min={formData.checkIn || new Date().toISOString().split("T")[0]}
                  
                />
              </motion.div>

              {/* Submit */}
              <motion.div className="md:col-span-2 flex items-end" variants={itemVariants}>
                <motion.button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl flex items-center justify-center"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <FaSearch className="mr-2" />
                      Search
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          <motion.div 
            className="mt-8 flex flex-wrap justify-center gap-6"
            variants={itemVariants}
          >
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
              <span>Luxury Experiences</span>

            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
              <span>Expert Guides</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
              <span>Best Price Guarantee</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;