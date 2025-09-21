// src/admin/AdminTourForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSave, FaTimes } from 'react-icons/fa';

const AdminTourForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rating: 4.5,
    price: 0,
    duration: '',
    location: 'Dubai',
    status: 'Pending',
    highlights: ['', '', '', ''],
    image: ''
  });

  useEffect(() => {
    if (isEditing) {
      // In a real app, you would fetch the tour data from an API
      // For demo purposes, we'll use mock data
      const mockTour = {
        id: 1,
        title: "03 Days Dubai City & Desert Safari",
        description: "Experience the best of Dubai with city tours and an exciting desert safari.",
        rating: 4.8,
        price: 2500,
        duration: "3 days",
        location: "Dubai",
        status: "Approved",
        highlights: ["Burj Khalifa", "Desert Safari", "Dubai Mall", "Dhow Cruise"],
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
      };
      
      setFormData({
        ...mockTour,
        highlights: mockTour.highlights.length >= 4 ? mockTour.highlights : [...mockTour.highlights, ...Array(4 - mockTour.highlights.length).fill('')]
      });
    }
  }, [isEditing, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = value;
    setFormData({
      ...formData,
      highlights: newHighlights
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out empty highlights
    const filteredHighlights = formData.highlights.filter(highlight => highlight.trim() !== '');
    
    const tourData = {
      ...formData,
      highlights: filteredHighlights
    };
    
    // In a real app, you would send the data to an API
    console.log('Tour data:', tourData);
    
    alert(isEditing ? 'Tour updated successfully!' : 'Tour added successfully!');
    navigate('/admin/tours');
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
          {isEditing ? 'Edit Tour' : 'Add New Tour'}
        </motion.h1>
        <button 
          onClick={() => navigate('/admin/tours')}
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
                Title *
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
                <option value="All Emirates">All Emirates</option>
                <option value="Northern Emirates">Northern Emirates</option>
              </select>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
                Duration *
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., 3 days, 1 week"
                required
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                Price (AED) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                min="0"
                required
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
                Rating
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                min="0"
                max="5"
                step="0.1"
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
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
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              ></textarea>
            </motion.div>
            
            <motion.div variants={itemVariants} className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Highlights
              </label>
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => handleHighlightChange(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder={`Highlight ${index + 1}`}
                  />
                </div>
              ))}
            </motion.div>
          </div>
          
          <motion.div 
            className="flex justify-end mt-8 space-x-3"
            variants={itemVariants}
          >
            <button
              type="button"
              onClick={() => navigate('/admin/tours')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center"
            >
              <FaSave className="mr-2" /> {isEditing ? 'Update Tour' : 'Add Tour'}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminTourForm;