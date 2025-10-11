// src/admin/AdminEventForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSave, FaTimes, FaTrash, FaUpload } from 'react-icons/fa';
import { Axios } from '../common/axios';
import { summaryApi } from '../common/summaryApi';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setAllEvents } from '../adminStore/dashboardSlice';

const AdminEventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [loading, setLoading] = useState(false);
  const dashboard = useSelector((state) => state?.dashboard);
  const events = dashboard?.allEvents;
    const dispatch = useDispatch();
  const location = useLocation();
  const event = location?.state?.event || {};
  console.log("event", event);
  
  const [formData, setFormData] = useState({
    title: '',
    date: '2023-12-15',
    location: 'Dubai',
    shortDescription: '',
    detailedDescription: '',
    image: ''
  });

  useEffect(() => {
    if (isEditing) {
      // In a real app, you would fetch the event data from an API
      // For demo purposes, we'll use mock data
      const mockEvent = {
        id: 1,
        title: event?.title,
        date: event?.date ? new Date(event.date).toISOString().split("T")[0] : "",
        location: event?.location,
        shortDescription: event?.shortDescription,
        detailedDescription: event?.detailedDescription,
        image: event?.imageUrl
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

  const handleImageChange = (e) => {
   const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file), // preview ke liye temporary URL
      }));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('date', formData.date);
    data.append('location', formData.location);
    data.append('shortDescription', formData.shortDescription);
    data.append('detailedDescription', formData.detailedDescription);
    data.append('image', formData.image);

     if(isEditing){
      try {
        setLoading(true)
        const res = await Axios({
          ...summaryApi.updateEvent(id),
          data,
          headers: { "Content-Type": "multipart/form-data" }
        })

        if (res?.data?.success) {
          const updatedEvent = res?.data?.data;
          const updatedEvents = events.map((event) =>
            event._id === updatedEvent._id ? updatedEvent : event
          );
          dispatch(setAllEvents(updatedEvents));
          navigate('/events');
        }
        
      } catch (error) {
        console.log("Error in updating event", error);
        toast.error(error?.response?.data?.message || "Error in updating event");
      } finally {
        setLoading(false)
      }
      return;
    }

   
    try {
      setLoading(true);
      const res = await Axios({
        ...summaryApi.addEvent,
        data,
        headers: { "Content-Type": "multipart/form-data" }
      })

      if (res?.data?.success) {
        dispatch(setAllEvents([...events, res?.data?.data]));
        navigate('/events');
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error(error?.response?.data?.message || 'Error in adding event');
    } finally {
      setLoading(false);
    }

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
          onClick={() => navigate('/events')}
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
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
                size={6}
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
            
           <motion.div variants={itemVariants} >
              <label className="block text-sm font-medium text-gray-700 mb-2">Image *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {formData?.preview ? (
                  <div className="relative">
                    <img src={formData.preview} alt="Logo" className="mx-auto h-80 rounded-lg" />
                    <button
                      onClick={() => setFormData((prev) => ({ ...prev, image: null, preview: null }))}
                      className="mt-2 text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ) : (
                  <div>
                    <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label className="cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500">
                        Upload a file
                        <input
                          type="file"
                          className="sr-only"
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                      </label>
                      <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 2MB</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shortDescription">
                Short Description *
              </label>
              <input
                type="text"
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="detailedDescription">
                Detailed Description *
              </label>
              <textarea
                id="detailedDescription"
                name="detailedDescription"
                value={formData.detailedDescription}
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
              onClick={() => navigate('/events')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center"
            >
              {loading ? (
                 <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-5 h-5 border-t-2 border-white border-solid rounded-full"
                                />
              ): (
                <>
 <FaSave className="mr-2" /> {isEditing ? 'Update Event' : 'Add Event'}
                </>
              )}
             
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminEventForm;