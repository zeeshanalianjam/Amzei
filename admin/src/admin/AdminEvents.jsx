// src/admin/AdminEvents.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Axios } from '../common/axios';
import { summaryApi } from '../common/summaryApi';
import toast from 'react-hot-toast';
import ConfirmPopup from '../components/ConfirmPopup';

const AdminEvents = () => {
  const dashboard = useSelector((state) => state?.dashboard);
  const [events, setEvents] = useState(dashboard?.allEvents);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  

  const [filteredEvents, setFilteredEvents] = useState(events);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
    const [deleteConfirm, setDeleteConfirm] = useState({
        isOpen: false,
        tourId: null,
        tourTitle: ''
      });

  useEffect(() => {
    let result = events;
    
    if (searchTerm) {
      result = result.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        event.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (locationFilter !== 'All') {
      result = result.filter(event => event.location === locationFilter);
    }
    
    setFilteredEvents(result);
  }, [events, searchTerm, locationFilter]);

  const handleDeleteEvent = (id, title) => {
   setDeleteConfirm({
      isOpen: true,
      tourId: id,
      tourTitle: title
    });
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...summaryApi.deleteEvent(deleteConfirm.tourId),
      })

      if (res?.data?.success) {
        toast.success(res?.data?.message || 'Event deleted successfully!');
        setEvents(events.filter(event => event._id !== deleteConfirm.tourId));
        setDeleteConfirm({ isOpen: false, tourId: null, tourTitle: '' });
      }
      
    } catch (error) {
      console.log("Error in deleting event", error);
      toast.error(error?.response?.data?.message || "Error in deleting event");
    } finally {
      setLoading(false)
    }
  }

   const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, tourId: null, tourTitle: '' });
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

  const locations = ['All', ...new Set(events.map(event => event.location))];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <motion.h1 
          className="text-2xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Events Management
        </motion.h1>
        <Link to="/admin/events/add">
          <motion.button
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus className="mr-2" /> Add Event
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
              placeholder="Search events..."
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
      
      {/* Events Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredEvents.map((event) => (
          <motion.div 
            key={event.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="h-48 bg-gray-200" style={{ backgroundImage: `url('${event.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {event.location}
                </span>
              </div>
              
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <FaCalendarAlt className="mr-2" />
                {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              
              <div className="flex items-center text-gray-600 text-sm mb-4">
                <FaMapMarkerAlt className="mr-2" />
                {event.location}
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{event.description}</p>
              
              <div className="flex justify-end space-x-2">
                <button onClick={() => navigate(`/events/edit/${event._id}`, { state: { event } })} className="text-indigo-600 hover:text-indigo-900">
                  <FaEdit />
                </button>
                <button 
                  className="text-red-600 hover:text-red-900"
                  onClick={() => handleDeleteEvent(event._id, event.title)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {filteredEvents.length === 0 && (
        <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-md">
          No events found matching your criteria
        </div>
      )}

      {/* Delete Confirmation Popup */}
                  <ConfirmPopup
                    isOpen={deleteConfirm.isOpen}
                    onClose={cancelDelete}
                    onConfirm={confirmDelete}
                    title="Delete Event"
                    message={`Are you sure you want to delete "${deleteConfirm.tourTitle}"? This action cannot be undone.`}
                    confirmText="Delete"
                    cancelText="Cancel"
                    loading={loading}
                  />
    </div>
  );
};

export default AdminEvents;