
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaFilter, FaCheck, FaTimes, FaEye } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Axios } from '../common/axios';
import { summaryApi } from '../common/summaryApi';
import toast from 'react-hot-toast';
import ConfirmPopup from '../components/ConfirmPopup';
import BookingDetailsPopup from '../components/BookingDetailsPopup';

const AdminBookings = () => {
    const dashboard = useSelector((state) => state?.dashboard);
    const [tours, setTours] = useState(dashboard?.allTourBookings);
    console.log("tours", tours)
    const navigate = useNavigate();
    const [loadingId, setLoadingId] = useState(null)
    // console.log("tours data :", tours)

    const [filteredTours, setFilteredTours] = useState(tours);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [locationFilter, setLocationFilter] = useState('All');
    // State for booking details popup
    const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);



    useEffect(() => {
        let result = tours;

        if (searchTerm) {
            result = result.filter(tour =>
                tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tour.destination.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter !== 'All') {
            result = result.filter(tour => tour.status === statusFilter);
        }

        if (locationFilter !== 'All') {
            result = result.filter(tour => tour.destination === locationFilter);
        }

        setFilteredTours(result);
    }, [tours, searchTerm, statusFilter, locationFilter]);

 
  const openDetailsPopup = (booking) => {
        setSelectedBooking(booking);
        setIsDetailsPopupOpen(true);
    };

    const closeDetailsPopup = () => {
        setIsDetailsPopupOpen(false);
        setSelectedBooking(null);
    };



    const handleStatusChange = async (id, newStatus) => {
        try {
            setLoadingId(id)
            const res = await Axios({
                ...summaryApi.updateTourBookingStatus(id),
                data: { status: newStatus }
            })

            if (res?.data?.success) {
                toast.success(res?.data?.message || 'Status updated successfully!');
                setTours(tours.map(tour =>
                    tour._id === id ? { ...tour, status: newStatus } : tour
                ));
            }

        } catch (error) {
            console.log("Error in updating status", error);
            toast.error(error?.response?.data?.message || "Error in updating status");
        } finally {
            setLoadingId(null)
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

    const locations = ['All', ...new Set(tours.map(tour => tour.destination))];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <motion.h1
                    className="text-2xl font-bold text-gray-800"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    All Bookings
                </motion.h1>
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
                            placeholder="Search bookings..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="approved">Approved</option>
                            <option value="pending">Pending</option>
                            <option value="cancelled">Rejected</option>
                        </select>
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

            {/* Booking Table */}
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
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">People</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preferred Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 max-w-xs truncate">{tour.FullName || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tour.email || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tour.phone || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tour.numberOfGuests || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">  {new Date(tour.preferredTravelDate).toLocaleString("en-AE", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        timeZone: "Asia/Dubai"
                                    })}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tour.destination || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex space-x-2">
                                            {tour.status?.toLowerCase().trim() === 'pending' && (
                                                <>
                                                    <button
                                                        className="text-green-600 hover:text-green-900"
                                                        onClick={() => handleStatusChange(tour._id, 'approved')}
                                                        title="Approve"
                                                    >

                                                        <FaCheck />
                                                    </button>
                                                    <button
                                                        className="text-red-600 hover:text-red-900"
                                                        onClick={() => handleStatusChange(tour._id, 'cancelled')}
                                                        title="Reject"
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </>
                                            )}

                                            <span className={`px-2 space-x-2 inline-flex text-xs leading-5 font-semibold rounded-full ${tour.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                tour.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800 space-x-2'
                                                }`}>
                                                 {loadingId === tour._id ? (<motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                            className="w-5 h-5 border-t-2 border-black border-solid rounded-full"
                                                        />) : (
                                                            <>{tour?.status.toUpperCase() || "N/A"}</>
                                                        )}
                                                

                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <motion.button
                                            onClick={() => openDetailsPopup(tour)}
                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            title="View Details"
                                        >
                                            <FaEye />
                                        </motion.button>
                                        <button
                                            className="text-red-600 hover:text-red-900"
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
                        No bookings found matching your criteria
                    </div>
                )}
            </motion.div>
           
             {/* Booking Details Popup */}
            <BookingDetailsPopup
                isOpen={isDetailsPopupOpen}
                onClose={closeDetailsPopup}
                bookingData={selectedBooking}
            />
        </div>
    );
};

export default AdminBookings;