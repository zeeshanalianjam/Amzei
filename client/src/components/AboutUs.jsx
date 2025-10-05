// src/components/AboutUs.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUsers, FaAward, FaGlobe, FaHeart, FaStar, FaArrowRight } from 'react-icons/fa';

const AboutUs = () => {
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

  return (
    <section className="section-padding bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full filter blur-3xl opacity-20 -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-100 rounded-full filter blur-3xl opacity-20 -ml-32 -mb-32"></div>
      
      <div className="container relative z-10">
        <motion.div 
          className="flex flex-col lg:flex-row items-center"
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
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">About UAE Tours</h2>
            <p className="text-gray-600 mb-4">
              With over 15 years of experience in the UAE tourism industry, we specialize in creating unforgettable travel experiences across all seven emirates. Our team of local experts ensures you discover both iconic landmarks and hidden gems.
            </p>
            <p className="text-gray-600 mb-6">
              We pride ourselves on personalized service, attention to detail, and creating memories that last a lifetime. Whether you're seeking luxury, adventure, or cultural immersion, we have the perfect tour for you.
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
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/about" className="btn-primary inline-flex items-center">
                Meet Our Team <FaArrowRight className="ml-2 text-sm" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Values Section */}
        <motion.div 
          className="mt-16"
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
        
        {/* Testimonials Section */}
        <motion.div 
          className="mt-16"
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
      </div>
    </section>
  );
};

export default AboutUs;