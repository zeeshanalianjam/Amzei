// src/admin/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaRoute, FaMapMarkedAlt, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 1242,
    tours: 24,
    destinations: 18,
    events: 8,
    pendingTours: 3
  });

  const [recentBookings, setRecentBookings] = useState([
    { id: 1, customer: 'John Smith', tour: 'Dubai City Tour', date: '2023-10-15', amount: 'AED 2,500', status: 'Confirmed' },
    { id: 2, customer: 'Emma Johnson', tour: 'Desert Safari', date: '2023-10-16', amount: 'AED 1,200', status: 'Pending' },
    { id: 3, customer: 'Michael Brown', tour: 'Abu Dhabi Explorer', date: '2023-10-17', amount: 'AED 3,800', status: 'Confirmed' },
    { id: 4, customer: 'Sarah Davis', tour: 'UAE Grand Tour', date: '2023-10-18', amount: 'AED 6,800', status: 'Cancelled' },
    { id: 5, customer: 'David Wilson', tour: 'Northern Emirates', date: '2023-10-19', amount: 'AED 5,200', status: 'Confirmed' },
  ]);

  const tourData = [
    { name: 'Jan', tours: 12 },
    { name: 'Feb', tours: 19 },
    { name: 'Mar', tours: 15 },
    { name: 'Apr', tours: 22 },
    { name: 'May', tours: 18 },
    { name: 'Jun', tours: 24 },
  ];

  const destinationData = [
    { name: 'Dubai', value: 45 },
    { name: 'Abu Dhabi', value: 25 },
    { name: 'Sharjah', value: 15 },
    { name: 'Others', value: 15 },
  ];

  const COLORS = ['#FF8042', '#00C49F', '#FFBB28', '#0088FE'];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div>
      <motion.h1 
        className="text-2xl font-bold text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Admin Dashboard
      </motion.h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {[
          { title: 'Total Users', value: stats.users, icon: <FaUsers className="text-blue-500" />, color: 'bg-blue-100' },
          { title: 'Total Tours', value: stats.tours, icon: <FaRoute className="text-green-500" />, color: 'bg-green-100' },
          { title: 'Destinations', value: stats.destinations, icon: <FaMapMarkedAlt className="text-purple-500" />, color: 'bg-purple-100' },
          { title: 'Events', value: stats.events, icon: <FaCalendarAlt className="text-yellow-500" />, color: 'bg-yellow-100' },
          { title: 'Pending Tours', value: stats.pendingTours, icon: <FaChartLine className="text-red-500" />, color: 'bg-red-100' },
        ].map((stat, index) => (
          <motion.div 
            key={index}
            className="bg-white rounded-lg shadow-md p-6 flex items-center"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <div className={`p-3 rounded-full ${stat.color} mr-4`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Tours</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tourData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tours" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Destination Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={destinationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {destinationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
      
      {/* Recent Bookings */}
      <motion.div 
        className="bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
          <button className="text-orange-500 hover:text-orange-600 font-medium">
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.tour}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                      booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;