// src/admin/AdminDestinationForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSave, FaTimes, FaTrash, FaUpload, FaPlus, FaMinus } from 'react-icons/fa';
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
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    shortDescription: "",
    detailedDescription: "",
    currency: "AED",
    bestTimeToVisit: "",
    reviews: [],
    rating: 3.4,
    highlights: [],
    language: "",

    pricingDetails: [{
      perPerson: "",
      perRoom: "",
      perDay: "",
      taxFee: ""
    }],

    imageUrl: null
  });

  useEffect(() => {
    if (isEditing && destination) {
      setFormData({
        name: destination.name || "",
        location: destination.location || "",
        shortDescription: destination.shortDescription || "",
        detailedDescription: destination.detailedDescription || "",
        currency: destination.currency || "AED",
        bestTimeToVisit: destination.bestTimeToVisit || "",
        reviews: destination.reviews || [],
        rating: destination.rating || 3.4,
        highlights: destination.highlights || [],
        language: destination.language || "",


        pricingDetails: destination.pricingDetails || [{
          perPerson: "",
          perRoom: "",
          perDay: "",
          taxFee: ""
        }],

        imageUrl: null
      });

      // Set start and end months if bestTimeToVisit exists
      if (destination.bestTimeToVisit) {
        const months = destination.bestTimeToVisit.split(' to ');
        if (months.length === 2) {
          setStartMonth(months[0]);
          setEndMonth(months[1]);
        }
      }
    }
  }, [isEditing, destination]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNestedInputChange = (parentField, index, field, value) => {
    const updated = [...formData[parentField]];
    updated[index][field] = value;
    setFormData({ ...formData, [parentField]: updated });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageUrl: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleMonthChange = (type, value) => {
    if (type === "start") {
      setStartMonth(value);
      setFormData((prev) => ({
        ...prev,
        bestTimeToVisit: value && endMonth ? `${value} to ${endMonth}` : "",
      }));
    } else {
      setEndMonth(value);
      setFormData((prev) => ({
        ...prev,
        bestTimeToVisit: startMonth && value ? `${startMonth} to ${value}` : "",
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
    data.append('currency', formData.currency);
    data.append('bestTimeToVisit', formData.bestTimeToVisit);
    data.append('rating', formData.rating);
    data.append('reviews', formData.reviews);
    data.append('highlights',formData.highlights);
    data.append('language', formData.language);
    data.append('pricingDetails', JSON.stringify(formData.pricingDetails));

    // 🔹 Main destination image
    if (formData.imageUrl) {
      data.append("imageUrl", formData.imageUrl);
    }

    if (isEditing) {
      try {
        setLoading(true);
        const res = await Axios({
          ...summaryApi.updateDestination(id),
          data,
          headers: { "Content-Type": "multipart/form-data" }
        });

        if (res?.data?.success) {
          toast.success(res?.data?.message || 'Destination updated successfully!');
          const updatedDestination = res?.data?.data;
          const updatedDestinations = destinations.map((dest) =>
            dest._id === updatedDestination._id ? updatedDestination : dest
          );
          dispatch(setAllDestinations(updatedDestinations));
          navigate('/admin/destinations');
        }
      } catch (error) {
        console.log("Error in updating destination", error);
        toast.error(error?.response?.data?.message || "Error in updating destination");
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      setLoading(true);
      const res = await Axios({
        ...summaryApi.addDestination,
        data,
        headers: { "Content-Type": "multipart/form-data" }
      });

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

    console.log("Form Data:", formData);
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="p-6">
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
          {/* Basic Information Section */}
          <motion.div
            className="mb-8 p-4 bg-gray-50 rounded-lg"
            variants={sectionVariants}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  placeholder='Enter destination name'
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Location *
                </label>
                <div className="relative">
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    placeholder='Select location'
                  >
                    <option value="" disabled>Select Location</option>
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

              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Short Description *
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  placeholder='Enter short description'
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Language *
                </label>
                <input
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  placeholder='Enter language: eg. English, Arabic'
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Currency *
                </label>
                <div className="relative">
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    placeholder='Select currency'
                  >
                    <option value="" disabled>Select Currency</option>
                    <option value="AED">AED – United Arab Emirates Dirham</option>
                    <option value="USD">USD – United States Dollar</option>
                    <option value="PKR">PKR – Pakistani Rupee</option>
                    <option value="IRR">IRR – Iranian Rial</option>
                  </select>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Best Time to Visit *
                </label>
                <div className="flex gap-4">
                  <div className="relative w-1/2">
                    <select
                      value={startMonth}
                      onChange={(e) => handleMonthChange("start", e.target.value)}
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    >
                      <option value="" disabled>-- Start Month --</option>
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>
                  </div>

                  <div className="relative w-1/2">
                    <select
                      value={endMonth}
                      onChange={(e) => handleMonthChange("end", e.target.value)}
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    >
                      <option value="" disabled>-- End Month --</option>
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Rating
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  placeholder='Enter rating'
                />
              </motion.div>

              <motion.div variants={itemVariants} className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Reviews (comma separated)
                </label>
                <textarea
                  value={formData.reviews?.join(', ')}
                  onChange={(e) => {
                    const options = e.target.value.split(',').map(opt => opt.trim());
                    setFormData({
                      ...formData,
                      reviews: options
                    });
                  }}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Review 1, Review 2, Review 3"
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

              <motion.div variants={itemVariants} className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Detailed Description *
                </label>
                <textarea
                  name="detailedDescription"
                  value={formData.detailedDescription}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  placeholder='Enter detailed description'
                ></textarea>
              </motion.div>


            </div>
          </motion.div>

          {/* Pricing Details Section */}
          <motion.div
            className="mb-8 p-4 bg-gray-50 rounded-lg"
            variants={sectionVariants}
          >
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Pricing Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Per Person Cost *
                </label>
                <input
                  type="number"
                  value={formData?.pricingDetails[0]?.perPerson}
                  onChange={(e) => handleNestedInputChange("pricingDetails", 0, "perPerson", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  placeholder="e.g., 500"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Per Room Cost *
                </label>
                <input
                  type="number"
                  value={formData?.pricingDetails[0]?.perRoom}
                  onChange={(e) => handleNestedInputChange("pricingDetails", 0, "perRoom", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  placeholder="e.g., 200"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Per Day Cost *
                </label>
                <input
                  type="number"
                  value={formData?.pricingDetails[0]?.perDay}
                  onChange={(e) => handleNestedInputChange("pricingDetails", 0, "perDay", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  placeholder="e.g., 100"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tax Fee (%) *
                </label>
                <input
                  type="number"
                  value={formData?.pricingDetails[0]?.taxFee}
                  onChange={(e) => handleNestedInputChange("pricingDetails", 0, "taxFee", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  placeholder="e.g., 5"
                />
              </motion.div>
            </div>
          </motion.div>


          {/* Image Upload Section */}
          <motion.div
            className="mb-8 p-4 bg-gray-50 rounded-lg"
            variants={sectionVariants}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">Destination Image</h2>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {formData?.preview ? (
                  <div className="relative">
                    <img src={formData.preview} alt="Destination" className="mx-auto h-80 rounded-lg" />
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, imageUrl: null, preview: null }))}
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
          </motion.div>

          {/* Submit Buttons */}
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