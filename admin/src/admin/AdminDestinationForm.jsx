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

    pricingDetails: [{
      perPerson: "",
      perRoom: "",
      perDay: "",
      taxFee: ""
    }],

    overview: [{
      title: ""
    }],

    thingsToDo: [{
      title: "",
      description: "",
      duration: "",
      price: "",
      imageUrl: null
    }],

    accommodations: [{
      title: "",
      description: "",
      price: "",
      priceType: "night",
      imageUrl: null
    }],

    restaurants: [{
      title: "",
      description: "",
      price: "",
      priceType: "person",
      imageUrl: null
    }],

    travelTips: [{
      title: "",
      options: []
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

        pricingDetails: destination.pricingDetails || [{
          perPerson: "",
          perRoom: "",
          perDay: "",
          taxFee: ""
        }],

        overview: destination.overview || [{
          title: ""
        }],

        thingsToDo: destination.thingsToDo || [{
          title: "",
          description: "",
          duration: "",
          price: "",
          imageUrl: null
        }],

        accommodations: destination.accommodations || [{
          title: "",
          description: "",
          price: "",
          priceType: "night",
          imageUrl: null
        }],

        restaurants: destination.restaurants || [{
          title: "",
          description: "",
          price: "",
          priceType: "person",
          imageUrl: null
        }],

        travelTips: destination.travelTips || [{
          title: "",
          options: []
        }],

        imageUrl: null
      });

      // Set start and end months if bestTimeToVisit exists
      if (destination.bestTimeToVisit) {
        const months = destination.bestTimeToVisit.split(' - ');
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

  const addNestedField = (parentField, template) => {
    setFormData({
      ...formData,
      [parentField]: [...formData[parentField], template]
    });
  };

  const removeNestedField = (parentField, index) => {
    if (formData[parentField].length > 1) {
      const updated = [...formData[parentField]];
      updated.splice(index, 1);
      setFormData({ ...formData, [parentField]: updated });
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
    data.append('pricingDetails', JSON.stringify(formData.pricingDetails));
    data.append('overview', JSON.stringify(formData.overview));
    data.append('thingsToDo', JSON.stringify(formData.thingsToDo));
    data.append('accommodations', JSON.stringify(formData.accommodations));
    data.append('restaurants', JSON.stringify(formData.restaurants));
    data.append('travelTips', JSON.stringify(formData.travelTips));

    // 🔹 Main destination image
    if (formData.imageUrl) {
      data.append("imageUrl", formData.imageUrl);
    }

    // 🔹 Things to do images (all items)
    formData.thingsToDo.forEach((item) => {
      if (item.imageUrl) {
        data.append("thingsToDoImageUrl", item.imageUrl); // 👈 same field name multiple times
      }
    });


    formData.accommodations.forEach((item) => {
      if (item.imageUrl) {
        data.append("accommodationImageUrl", item.imageUrl);
      }
    });


    formData.restaurants.forEach((item) => {
      if (item.imageUrl) {
        data.append("restaurantImageUrl", item.imageUrl);
      }
    });


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
                  value={formData.pricingDetails[0].perPerson}
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
                  value={formData.pricingDetails[0].perRoom}
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
                  value={formData.pricingDetails[0].perDay}
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
                  value={formData.pricingDetails[0].taxFee}
                  onChange={(e) => handleNestedInputChange("pricingDetails", 0, "taxFee", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  placeholder="e.g., 5"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Overview Section */}
          <motion.div
            className="mb-8 p-4 bg-gray-50 rounded-lg"
            variants={sectionVariants}
          >
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
            </div>

            {formData.overview.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleNestedInputChange("overview", index, "title", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    placeholder="e.g., Overview of Dubai"
                  />
                  {formData.overview.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeNestedField("overview", index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <FaMinus />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}

            <motion.div variants={itemVariants}>
              <button
                type="button"
                onClick={() => addNestedField("overview", { title: "" })}
                className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
              >
                <FaPlus className="mr-2" /> Add Overview
              </button>
            </motion.div>
          </motion.div>

          {/* Things To Do Section */}
          <motion.div
            className="mb-8 p-4 bg-gray-50 rounded-lg"
            variants={sectionVariants}
          >
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Things To Do</h2>
            </div>

            {formData.thingsToDo.map((item, index) => (
              <motion.div key={index} className="mb-6 p-4 bg-white rounded-lg shadow-sm" variants={itemVariants}>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-gray-800">Activity #{index + 1}</h3>
                  {formData.thingsToDo.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeNestedField("thingsToDo", index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <FaMinus />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleNestedInputChange("thingsToDo", index, "title", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                      placeholder="e.g., Visit Burj Khalifa"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={item.duration}
                      onChange={(e) => handleNestedInputChange("thingsToDo", index, "duration", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., 2 hours"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Price
                    </label>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleNestedInputChange("thingsToDo", index, "price", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., 100"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Image
                    </label>
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          handleNestedInputChange("thingsToDo", index, "imageUrl", file);
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      accept="image/*"
                    />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants} className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                  </label>
                  <textarea
                    value={item.description}
                    onChange={(e) => handleNestedInputChange("thingsToDo", index, "description", e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Experience the tallest building in the world"
                  ></textarea>
                </motion.div>
              </motion.div>
            ))}

            <motion.div variants={itemVariants}>
              <button
                type="button"
                onClick={() => addNestedField("thingsToDo", {
                  title: "",
                  description: "",
                  duration: "",
                  price: "",
                  imageUrl: null
                })}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
              >
                <FaPlus className="mr-2" /> Add Activity
              </button>
            </motion.div>
          </motion.div>

          {/* Accommodations Section */}
          <motion.div
            className="mb-8 p-4 bg-gray-50 rounded-lg"
            variants={sectionVariants}
          >
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Accommodations</h2>
            </div>

            {formData.accommodations.map((item, index) => (
              <motion.div key={index} className="mb-6 p-4 bg-white rounded-lg shadow-sm" variants={itemVariants}>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-gray-800">Accommodation #{index + 1}</h3>
                  {formData.accommodations.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeNestedField("accommodations", index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <FaMinus />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleNestedInputChange("accommodations", index, "title", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                      placeholder="e.g., Burj Al Arab"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Price *
                    </label>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleNestedInputChange("accommodations", index, "price", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                      placeholder="e.g., 500"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Price Type *
                    </label>
                    <select
                      value={item.priceType}
                      onChange={(e) => handleNestedInputChange("accommodations", index, "priceType", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    >
                      <option value="night">Per Night</option>
                      <option value="person">Per Person</option>
                      <option value="room">Per Room</option>
                    </select>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Image
                    </label>
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          handleNestedInputChange("accommodations", index, "imageUrl", file);
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      accept="image/*"
                    />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants} className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description *
                  </label>
                  <textarea
                    value={item.description}
                    onChange={(e) => handleNestedInputChange("accommodations", index, "description", e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    placeholder="e.g., Luxury hotel with stunning views"
                  ></textarea>
                </motion.div>
              </motion.div>
            ))}

            <motion.div variants={itemVariants}>
              <button
                type="button"
                onClick={() => addNestedField("accommodations", {
                  title: "",
                  description: "",
                  price: "",
                  priceType: "night",
                  imageUrl: null
                })}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
              >
                <FaPlus className="mr-2" /> Add Accommodation
              </button>
            </motion.div>
          </motion.div>

          {/* Restaurants Section */}
          <motion.div
            className="mb-8 p-4 bg-gray-50 rounded-lg"
            variants={sectionVariants}
          >
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Restaurants</h2>
            </div>

            {formData.restaurants.map((item, index) => (
              <motion.div key={index} className="mb-6 p-4 bg-white rounded-lg shadow-sm" variants={itemVariants}>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-gray-800">Restaurant #{index + 1}</h3>
                  {formData.restaurants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeNestedField("restaurants", index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <FaMinus />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleNestedInputChange("restaurants", index, "title", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                      placeholder="e.g., Al Mahara"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Price *
                    </label>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleNestedInputChange("restaurants", index, "price", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                      placeholder="e.g., 200"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Price Type *
                    </label>
                    <select
                      value={item.priceType}
                      onChange={(e) => handleNestedInputChange("restaurants", index, "priceType", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    >
                      <option value="person">Per Person</option>
                      <option value="meal">Per Meal</option>
                      <option value="buffet">Buffet</option>
                    </select>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Image
                    </label>
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          handleNestedInputChange("restaurants", index, "imageUrl", file);
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      accept="image/*"
                    />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants} className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description *
                  </label>
                  <textarea
                    value={item.description}
                    onChange={(e) => handleNestedInputChange("restaurants", index, "description", e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    placeholder="e.g., Seafood restaurant with underwater dining"
                  ></textarea>
                </motion.div>
              </motion.div>
            ))}

            <motion.div variants={itemVariants}>
              <button
                type="button"
                onClick={() => addNestedField("restaurants", {
                  title: "",
                  description: "",
                  price: "",
                  priceType: "person",
                  imageUrl: null
                })}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
              >
                <FaPlus className="mr-2" /> Add Restaurant
              </button>
            </motion.div>
          </motion.div>

          {/* Travel Tips Section */}
          <motion.div
            className="mb-8 p-4 bg-gray-50 rounded-lg"
            variants={sectionVariants}
          >
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Travel Tips</h2>
            </div>

            {formData.travelTips.map((item, index) => (
              <motion.div key={index} className="mb-6 p-4 bg-white rounded-lg shadow-sm" variants={itemVariants}>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-gray-800">Tip #{index + 1}</h3>
                  {formData.travelTips.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeNestedField("travelTips", index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <FaMinus />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleNestedInputChange("travelTips", index, "title", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                      placeholder="e.g., Best Time to Visit"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Options (comma separated)
                    </label>
                    <textarea
                      value={item.options.join(', ')}
                      onChange={(e) => {
                        const options = e.target.value.split(',').map(opt => opt.trim()).filter(opt => opt);
                        handleNestedInputChange("travelTips", index, "options", options);
                      }}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., November to March, Avoid peak summer"
                    ></textarea>
                  </motion.div>
                </div>
              </motion.div>
            ))}

            <motion.div variants={itemVariants}>
              <button
                type="button"
                onClick={() => addNestedField("travelTips", {
                  title: "",
                  options: []
                })}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
              >
                <FaPlus className="mr-2" /> Add Travel Tip
              </button>
            </motion.div>
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