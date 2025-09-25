// src/admin/AdminTours.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaFilter, FaCheck, FaTimes } from 'react-icons/fa';
import {  useSelector } from 'react-redux';
import { Axios } from '../common/axios';
import { summaryApi } from '../common/summaryApi';
import toast from 'react-hot-toast';
import ConfirmPopup from '../components/ConfirmPopup';

const AdminTours = () => {
  const dashboard = useSelector((state) => state?.dashboard);
  const [tours, setTours] = useState(dashboard?.allTours);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  // console.log("tours data :", tours)

  const [filteredTours, setFilteredTours] = useState(tours);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    tourId: null,
    tourTitle: ''
  });

  useEffect(() => {
    let result = tours;

    if (searchTerm) {
      result = result.filter(tour =>
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      result = result.filter(tour => tour.status === statusFilter);
    }

    if (locationFilter !== 'All') {
      result = result.filter(tour => tour.location === locationFilter);
    }

    setFilteredTours(result);
  }, [tours, searchTerm, statusFilter, locationFilter]);

  const handleDeleteTour = (id, title) => {
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
        ...summaryApi.deleteTour(deleteConfirm.tourId),
      })

      if (res?.data?.success) {
        toast.success(res?.data?.message || 'Tour deleted successfully!');
        setTours(tours.filter(tour => tour._id !== deleteConfirm.tourId));
        setDeleteConfirm({ isOpen: false, tourId: null, tourTitle: '' });
      }
    } catch (error) {
      console.log("Error in deleting tour", error);
      toast.error(error?.response?.data?.message || "Error in deleting tour");

    } finally {
      setLoading(false)
    }

  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, tourId: null, tourTitle: '' });
  };





  const handleStatusChange = (id, newStatus) => {
    setTours(tours.map(tour =>
      tour.id === id ? { ...tour, status: newStatus } : tour
    ));
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

  const locations = ['All', ...new Set(tours.map(tour => tour.location))];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <motion.h1
          className="text-2xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Tours Management
        </motion.h1>
        <Link to="/admin/tours/add">
          <motion.button
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus className="mr-2" /> Add Tour
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div className="relative" variants={itemVariants}>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2.5"
              placeholder="Search tours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>

          {/* <motion.div variants={itemVariants}>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </motion.div> */}

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

      {/* Tours Table */}
      <motion.div
        className="bg-white rounded-lg shadow-md overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th> */}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTours.map((tour, index) => (
                <motion.tr
                  key={index}
                  className="hover:bg-gray-50"
                  variants={itemVariants}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1 || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 max-w-xs truncate">{tour.title || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="mr-1">★</span>
                      {tour.rating || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">AED {tour.price || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tour.duration || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tour.location || 'N/A'}</td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      {tour.status === 'Pending' && (
                        <>
                          <button
                            className="text-green-600 hover:text-green-900"
                            onClick={() => handleStatusChange(tour.id, 'Approved')}
                            title="Approve"
                          >
                            <FaCheck />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleStatusChange(tour.id, 'Rejected')}
                            title="Reject"
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${tour.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          tour.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                        {tour.status}
                      </span>
                    </div>
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => navigate(`/admin/tours/edit/${tour._id}`, { state: { tour } })} className="text-indigo-600 hover:text-indigo-900 mr-3">
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteTour(tour._id, tour.title)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTours.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No tours found matching your criteria
          </div>
        )}
      </motion.div>
      {/* Delete Confirmation Popup */}
      <ConfirmPopup
        isOpen={deleteConfirm.isOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Tour"
        message={`Are you sure you want to delete "${deleteConfirm.tourTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={loading}
      />
    </div>
  );
};

export default AdminTours;