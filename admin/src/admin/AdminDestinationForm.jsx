// src/admin/AdminDestinationForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSave, FaTimes } from 'react-icons/fa';

const AdminDestinationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: 'Dubai',
    details: '',
    image: ''
  });

  useEffect(() => {
    if (isEditing) {
      // In a real app, you would fetch the destination data from an API
      // For demo purposes, we'll use mock data
      const mockDestination = {
        id: 1,
        name: "Burj Khalifa",
        description: "World's tallest building",
        location: "Dubai",
        details: "Standing at 828 meters tall, the Burj Khalifa is the world's tallest building and an iconic symbol of modern Dubai. Visitors can enjoy breathtaking views from the observation decks on the 124th and 148th floors.",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
      };
      
      setFormData(mockDestination);
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
    console.log('Destination data:', formData);
    
    alert(isEditing ? 'Destination updated successfully!' : 'Destination added successfully!');
    navigate('/admin/destinations');
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
          {isEditing ? 'Edit Destination' : 'Add New Destination'}
        </motion.h1>
        <button 
          onClick={() => navigate('/admin/destinations')}
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
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
              onClick={() => navigate('/admin/destinations')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center"
            >
              <FaSave className="mr-2" /> {isEditing ? 'Update Destination' : 'Add Destination'}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminDestinationForm;