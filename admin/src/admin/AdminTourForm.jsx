// src/admin/AdminTourForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSave, FaTimes, FaUpload, FaTrash } from 'react-icons/fa';
import { Axios } from '../common/axios';
import { summaryApi } from '../common/summaryApi';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setAllTours } from '../adminStore/dashboardSlice';

const AdminTourForm = () => {
  const dashboard = useSelector((state) => state?.dashboard);
  const tours = dashboard?.allTours;
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rating: 4.5,
    price: '',
    duration: '',
    location: 'Dubai',
    highlights: [],
    image: ''
  });

  useEffect(() => {
    if (isEditing) {
      const tour = location?.state?.tour || {};
      console.log("tour", tour);
      const mockTour = {
        id: tour?._id,
        title: tour?.title,
        description: tour?.description,
        rating: tour?.rating,
        price: tour?.price,
        duration: tour?.duration,
        location: tour?.location,
        highlights: tour?.highlights,
        image: tour?.imageUrl
      };

      setFormData({
        ...mockTour
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

    // Filter out empty highlights
    const filteredHighlights = formData.highlights?.filter(highlight => highlight.trim() !== '');


    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("rating", formData.rating);
    data.append("price", formData.price);
    data.append("duration", formData.duration);
    data.append("location", formData.location);
    data.append("highlights", filteredHighlights);
    data.append("image", formData.image);

    if (isEditing) {
      try {
        setLoading(true);
        const res = await Axios({
          ...summaryApi.updateTour(id),
          data,
          headers: { "Content-Type": "multipart/form-data" }
        })

        if (res?.data?.success) {
          toast.success(res?.data?.message || 'Tour updated successfully!');
          const updatedTour = res?.data?.data;
          const updatedTours = tours.map(tour =>
            tour._id === updatedTour._id ? updatedTour : tour
          );
          dispatch(setAllTours(updatedTours));

          navigate('/tours');
        }
      } catch (error) {
        console.log("Error in updating tour", error);
        toast.error(error?.response?.data?.message || "Error in updating tour");

      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      setLoading(true);
      const res = await Axios({
        ...summaryApi.addTour,
        data: data,
        headers: { "Content-Type": "multipart/form-data" }

      })

      if (res?.data?.success) {
        toast.success(isEditing ? 'Tour updated successfully!' : 'Tour added successfully!');
        dispatch(setAllTours([...tours, res?.data?.data]));
        setFormData({
          title: '',
          description: '',
          rating: 4.5,
          price: 0,
          duration: '',
          location: 'Dubai',
          highlights: [],
          image: ''
        });
        navigate('/tours');
      }

    } catch (error) {
      console.log("Error in adding tour", error);
      toast.error(error?.response?.data?.message || 'Error in adding tour');
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
          {isEditing ? 'Edit Tour' : 'Add New Tour'}
        </motion.h1>
        <button
          onClick={() => navigate('/tours')}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {formData?.preview ? (
                  <div className="relative">
                    <img src={formData.preview} alt="Logo" className="mx-auto h-32" />
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
                              Highlights (comma separated) *
                            </label>
                            <textarea
                              value={formData.highlights?.join(', ')}
                              onChange={(e) => {
                                const options = e.target.value.split(',').map(opt => opt.trim());
                                setFormData({
                                  ...formData,
                                  highlights: options
                                });
                              }}
                              rows="3"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                              placeholder="e.g., Highlight 1, Highlight 2, Highlight 3"
                            ></textarea>
                          </motion.div>
          </div>

          <motion.div
            className="flex justify-end mt-8 space-x-3"
            variants={itemVariants}
          >
            <button
              type="button"
              onClick={() => navigate('/tours')}
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
                <>
                  <FaSave className="mr-2" /> {isEditing ? 'Update Tour' : 'Add Tour'}
                </>
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminTourForm;