// src/admin/AdminEventForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSave, FaTimes } from 'react-icons/fa';

const AdminEventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: 'Dubai',
    description: '',
    details: '',
    image: ''
  });

  useEffect(() => {
    if (isEditing) {
      // In a real app, you would fetch the event data from an API
      // For demo purposes, we'll use mock data
      const mockEvent = {
        id: 1,
        title: "Dubai Shopping Festival",
        date: "2023-12-15",
        location: "Dubai",
        description: "Annual shopping festival with discounts and entertainment",
        details: "The Dubai Shopping Festival is an annual month-long event that draws visitors from around the world. Enjoy massive discounts, entertainment shows, and lucky draws. The festival features concerts, fireworks, and family-friendly activities across various venues in Dubai.",
        image: "https://images.unsplash.com/photo-1512416964559-19bc0ded6091?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
      };
      
      setFormData(mockEvent);
    }
  }, [isEditing, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would send the data to an API
    console.log('Event data:', formData);
    
    alert(isEditing ? 'Event updated successfully!' : 'Event added successfully!');
    navigate('/admin/events');
  };

  const formVariants = {
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
      opacity: 1 
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <motion.h1 
          className="text-2xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isEditing ? 'Edit Event' : 'Add New Event'}
        </motion.h1>
        <button 
          onClick={() => navigate('/admin/events')}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="text-xl" />
        </button>
      </div>
      
      <motion.div 
        className="bg-white rounded-lg shadow-md p-6"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Event Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                Event Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                Location *
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="Dubai">Dubai</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
                <option value="Sharjah">Sharjah</option>
                <option value="Ajman">Ajman</option>
                <option value="Umm Al Quwain">Umm Al Quwain</option>
                <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                <option value="Fujairah">Fujairah</option>
              </select>
            </motion.div>
            
            <motion.div variants={itemVariants} className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="https://example.com/image.jpg"
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Short Description *
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="details">
                Detailed Description *
              </label>
              <textarea
                id="details"
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                rows="6"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              ></textarea>
            </motion.div>
          </div>
          
          <motion.div 
            className="flex justify-end mt-8 space-x-3"
            variants={itemVariants}
          >
            <button
              type="button"
              onClick={() => navigate('/admin/events')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center"
            >
              <FaSave className="mr-2" /> {isEditing ? 'Update Event' : 'Add Event'}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminEventForm;