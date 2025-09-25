// src/admin/AdminDestinationForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSave, FaTimes, FaTrash, FaUpload } from 'react-icons/fa';
import { Axios } from '../common/axios';
import { summaryApi } from '../common/summaryApi';
import { useDispatch, useSelector } from 'react-redux';
import { setAllDestinations } from '../adminStore/dashboardSlice';
import toast from 'react-hot-toast';

const AdminDestinationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [loading, setLoading] = useState(false);
  const dashboard = useSelector((state) => state?.dashboard);
  const destinations = dashboard?.allDestinations;
  const dispatch = useDispatch();
  const location = useLocation();
  const destination = location?.state?.destination || {};

  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    location: 'Dubai',
    detailedDescription: '',
    image: ''
  });

  useEffect(() => {
    if (isEditing) {
      const mockDestination = {
        id: 1,
        name: destination?.name || "N/A",
        shortDescription: destination?.shortDescription || "N/A",
        location: destination?.location || "Dubai",
        detailedDescription: destination?.detailedDescription || "N/A",
        image: destination?.imageUrl || "N/A"
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file), // preview ke liye temporary URL
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     const data = new FormData();
    data.append('name', formData.name);
    data.append('shortDescription', formData.shortDescription);
    data.append('location', formData.location);
    data.append('detailedDescription', formData.detailedDescription);
    data.append('image', formData.image);

    if(isEditing){
      try {
        setLoading(true)
        const res = await Axios({
          ...summaryApi.updateDestination(id),
          data,
          headers: { "Content-Type": "multipart/form-data" }
        })

        if (res?.data?.success) {
          toast.success(res?.data?.message || 'Destination updated successfully!');
          const updatedDestination = res?.data?.data;
          const updatedDestinations = destinations.map((destination) =>
            destination._id === updatedDestination._id ? updatedDestination : destination
          );
          dispatch(setAllDestinations(updatedDestinations));
          navigate('/admin/destinations');
        }
        
      } catch (error) {
        console.log("Error in updating destination", error);
        toast.error(error?.response?.data?.message || "Error in updating destination");
      } finally {
        setLoading(false)
      }
      return;
    }

   
    try {
      setLoading(true);
      const res = await Axios({
        ...summaryApi.addDestination,
        data,
        headers: { "Content-Type": "multipart/form-data" }
      })

      if (res?.data?.success) {
        toast.success(res?.data?.message || 'Destination added successfully!');
        dispatch(setAllDestinations([...destinations, res?.data?.data]));
        navigate('/admin/destinations');
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error(error?.response?.data?.message || 'Error in adding destination');
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


            <motion.div variants={itemVariants} >
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

            <motion.div variants={itemVariants}>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="location"
              >
                Location *
              </label>
              <div className="relative">
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 
                 overflow-y-auto"
                  required
                  size={6} // 👈 ek waqt me sirf 5 options visible hon
                >
                  <option value="Dubai">Dubai</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Ajman">Ajman</option>
                  <option value="Umm Al Quwain">Umm Al Quwain</option>
                  <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                  <option value="Fujairah">Fujairah</option>
                  <option value="Burj Khalifa">Burj Khalifa</option>
                  <option value="Palm Jumeirah">Palm Jumeirah</option>
                  <option value="Burj Al Arab">Burj Al Arab</option>
                  <option value="Dubai Frame">Dubai Frame</option>
                  <option value="Dubai Fountain Show">Dubai Fountain Show</option>
                  <option value="Dubai Marina">Dubai Marina</option>
                  <option value="Jumeirah Beach">Jumeirah Beach</option>
                  <option value="Dubai Desert Safari">Dubai Desert Safari</option>
                  <option value="Global Village">Global Village</option>
                  <option value="Dubai Miracle Garden">Dubai Miracle Garden</option>
                  <option value="Sheikh Zayed Grand Mosque">Sheikh Zayed Grand Mosque</option>
                  <option value="Louvre Abu Dhabi">Louvre Abu Dhabi</option>
                  <option value="Ferrari World">Ferrari World</option>
                  <option value="Yas Island">Yas Island</option>
                  <option value="Qasr Al Watan">Qasr Al Watan (Presidential Palace)</option>
                  <option value="Corniche Beach">Corniche Beach</option>
                  <option value="Emirates Palace">Emirates Palace</option>
                  <option value="Sharjah Al Noor Mosque">Sharjah Al Noor Mosque</option>
                  <option value="Ras Al Khaimah Jebel Jais">Ras Al Khaimah – Jebel Jais</option>
                  <option value="Fujairah Fort">Fujairah Fort</option>
                  <option value="Snoopy Island">Snoopy Island</option>
                  <option value="Al Ain Jebel Hafeet">Al Ain – Jebel Hafeet Mountain</option>
                  <option value="Hatta Dam">Hatta Dam</option>
                </select>
              </div>
            </motion.div>


            <motion.div variants={itemVariants} >
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


            <motion.div variants={itemVariants} className="md:col-span-2">
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
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-t-2 border-white border-solid rounded-full"
                />
              ) : (
                <><FaSave className="mr-2" /> {isEditing ? 'Update Destination' : 'Add Destination'} </>
              )}

            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminDestinationForm;