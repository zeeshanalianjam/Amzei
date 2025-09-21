// src/admin/AdminDestinations.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaFilter } from 'react-icons/fa';

const AdminDestinations = () => {
  const [destinations, setDestinations] = useState([
    { id: 1, name: "Burj Khalifa", description: "World's tallest building", location: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" },
    { id: 2, name: "Dubai Mall", description: "World's largest shopping destination", location: "Dubai", image: "https://images.unsplash.com/photo-1534423839369-8cf277e0bbbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" },
    { id: 3, name: "Burj Al Arab", description: "Iconic luxury hotel", location: "Dubai", image: "https://images.unsplash.com/photo-1583416550495-3525c9a3aee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" },
    { id: 4, name: "Palm Jumeirah", description: "Artificial archipelago", location: "Dubai", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" },
    { id: 5, name: "Aquaventure Waterpark", description: "Thrilling waterpark", location: "Dubai", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" },
    { id: 6, name: "Sheikh Zayed Grand Mosque", description: "Magnificent mosque in Abu Dhabi", location: "Abu Dhabi", image: "https://images.unsplash.com/photo-1526292067844-8b5a4f5acb1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" },
  ]);

  const [filteredDestinations, setFilteredDestinations] = useState(destinations);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');

  useEffect(() => {
    let result = destinations;
    
    if (searchTerm) {
      result = result.filter(destination => 
        destination.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        destination.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (locationFilter !== 'All') {
      result = result.filter(destination => destination.location === locationFilter);
    }
    
    setFilteredDestinations(result);
  }, [destinations, searchTerm, locationFilter]);

  const handleDeleteDestination = (id) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      setDestinations(destinations.filter(destination => destination.id !== id));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.05 
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

  const locations = ['All', ...new Set(destinations.map(destination => destination.location))];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <motion.h1 
          className="text-2xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Destinations Management
        </motion.h1>
        <Link to="/admin/destinations/add">
          <motion.button
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus className="mr-2" /> Add Destination
          </motion.button>
        </Link>
      </div>
      
      {/* Filters */}
      <motion.div 
        className="bg-white rounded-lg shadow-md p-6 mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div className="relative" variants={itemVariants}>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input 
              type="text" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2.5" 
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <select 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Destinations Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredDestinations.map((destination) => (
          <motion.div 
            key={destination.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="h-48 bg-gray-200" style={{ backgroundImage: `url('${destination.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{destination.name}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {destination.location}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{destination.description}</p>
              <div className="flex justify-end space-x-2">
                <Link to={`/admin/destinations/edit/${destination.id}`} className="text-indigo-600 hover:text-indigo-900">
                  <FaEdit />
                </Link>
                <button 
                  className="text-red-600 hover:text-red-900"
                  onClick={() => handleDeleteDestination(destination.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {filteredDestinations.length === 0 && (
        <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-md">
          No destinations found matching your criteria
        </div>
      )}
    </div>
  );
};

export default AdminDestinations;