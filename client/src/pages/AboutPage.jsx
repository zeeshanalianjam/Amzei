// src/pages/AboutPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaUsers, FaAward, FaGlobe, FaHeart, FaStar, FaMapMarkerAlt, FaCamera, FaUmbrellaBeach, FaCity } from 'react-icons/fa';

const AboutPage = () => {
  const navigate = useNavigate();

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

  const stats = [
    { number: '15+', label: 'Years Experience' },
    { number: '50K+', label: 'Happy Travelers' },
    { number: '200+', label: 'Tour Packages' },
    { number: '7', label: 'Emirates Covered' }
  ];

  const values = [
    { 
      icon: <FaHeart className="text-orange-500 text-2xl" />, 
      title: 'Passion for Travel', 
      description: 'We share your love for exploring new places and creating unforgettable memories.' 
    },
    { 
      icon: <FaUsers className="text-orange-500 text-2xl" />, 
      title: 'Expert Team', 
      description: 'Our local guides are passionate about sharing their knowledge and hidden gems.' 
    },
    { 
      icon: <FaAward className="text-orange-500 text-2xl" />, 
      title: 'Excellence', 
      description: 'We strive for perfection in every detail of your travel experience.' 
    },
    { 
      icon: <FaGlobe className="text-orange-500 text-2xl" />, 
      title: 'Sustainability', 
      description: 'Committed to responsible tourism that preserves the beauty of the UAE.' 
    }
  ];

  const teamMembers = [
    {
      name: 'Ahmed Al Mansoori',
      role: 'Founder & CEO',
      bio: 'Born and raised in Dubai, Ahmed has over 20 years of experience in the UAE tourism industry.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Fatima Hassan',
      role: 'Tour Operations Manager',
      bio: 'Fatima ensures every tour runs smoothly with her attention to detail and passion for excellence.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Khalid Al Maktoum',
      role: 'Lead Tour Guide',
      bio: 'With a degree in Middle Eastern Studies, Khalid brings history and culture to life on his tours.',
      image: 'https://randomuser.me/api/portraits/men/67.jpg'
    },
    {
      name: 'Sara Abdullah',
      role: 'Customer Experience Manager',
      bio: 'Sara goes above and beyond to ensure every traveler has an unforgettable experience.',
      image: 'https://randomuser.me/api/portraits/women/28.jpg'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Travel Blogger',
      content: 'The desert safari experience was beyond amazing! The team took care of every detail and made us feel like royalty.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Photographer',
      content: 'I\'ve traveled with many tour companies, but UAE Tours stands out for their professionalism and local knowledge.',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'Family Vacationer',
      content: 'Our family trip to Dubai was perfectly organized. The kids loved every moment, and we relaxed knowing everything was taken care of.',
      rating: 4
    }
  ];

  const destinations = [
    {
      name: 'Dubai',
      icon: <FaCity className="text-orange-500 text-xl" />,
      description: 'Experience the futuristic cityscape, luxury shopping, and vibrant nightlife of Dubai.'
    },
    {
      name: 'Abu Dhabi',
      icon: <FaMapMarkerAlt className="text-orange-500 text-xl" />,
      description: 'Discover the rich cultural heritage and modern architecture of the UAE capital.'
    },
    {
      name: 'Sharjah',
      icon: <FaCamera className="text-orange-500 text-xl" />,
      description: 'Explore the cultural capital with its museums, art galleries, and heritage sites.'
    },
    {
      name: 'Fujairah',
      icon: <FaUmbrellaBeach className="text-orange-500 text-xl" />,
      description: 'Relax on pristine beaches and dive into the crystal-clear waters of the Gulf of Oman.'
    }
  ];

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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft className="mr-2" /> Back
          </motion.button>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">About UAE Tours</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Creating unforgettable travel experiences across the United Arab Emirates</p>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          className="flex flex-col lg:flex-row items-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="lg:w-1/2 mb-8 lg:mb-0"
            variants={itemVariants}
          >
            <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl">
              <div 
                className="h-full w-full transform transition-transform duration-700 hover:scale-105" 
                style={{ 
                  backgroundImage: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')", 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center' 
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-2">
                  Since 2008
                </div>
                <h3 className="text-xl font-bold">Creating Unforgettable UAE Experiences</h3>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 lg:pl-12"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              With over 15 years of experience in the UAE tourism industry, we specialize in creating unforgettable travel experiences across all seven emirates. Our journey began in 2008 with a simple mission: to showcase the true beauty and culture of the UAE to visitors from around the world.
            </p>
            <p className="text-gray-600 mb-6">
              What started as a small team of passionate local guides has grown into one of the most trusted tour companies in the region. We pride ourselves on personalized service, attention to detail, and creating memories that last a lifetime. Whether you're seeking luxury, adventure, or cultural immersion, we have the perfect tour for you.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-sm text-center"
                  whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                >
                  <div className="text-2xl font-bold text-orange-500">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Values Section */}
        <motion.div 
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The principles that guide everything we do</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md"
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Destinations Section */}
        <motion.div 
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Destinations We Cover</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore all seven emirates with our expert guides</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md"
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="mb-4">{destination.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{destination.name}</h3>
                <p className="text-gray-600">{destination.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Team Section */}
        <motion.div 
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The passionate people behind your unforgettable experiences</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="h-48 bg-gray-200" style={{ backgroundImage: `url('${member.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                  <div className="text-orange-500 font-medium mb-3">{member.role}</div>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Testimonials Section */}
        <motion.div 
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Travelers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Real experiences from our happy customers</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md"
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 md:p-12 text-center text-white"
          variants={itemVariants}
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.5)" }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready for Your UAE Adventure?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-orange-100">Join thousands of satisfied travelers who have experienced the magic of the UAE with us.</p>
          <motion.button
            onClick={() => navigate('/tours')}
            className="px-8 py-3 bg-white text-orange-500 rounded-full font-bold text-lg shadow-lg hover:bg-orange-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Tours
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;