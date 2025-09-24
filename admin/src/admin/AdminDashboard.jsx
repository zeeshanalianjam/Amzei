// src/admin/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaRoute, FaMapMarkedAlt, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const dashboard = useSelector((state) => state?.dashboard);
  // console.log("tours : ", dashboard.allTourBookings);
  // console.log("Dashboard:", dashboard);
  const [stats, setStats] = useState({
    users: dashboard.allUsers.length,
    tours: dashboard.allTours.length,
    destinations: dashboard.allDestinations.length,
    events: dashboard.allEvents.length,
    pendingTours: 3,
  });

  const recentBookings = dashboard.allTourBookings.slice(0, 5);

  const preferredDate = dashboard?.allTourBookings;
const jan = preferredDate.filter(booking => booking.preferredTravelDate.includes("2025-01"));
const feb = preferredDate.filter(booking => booking.preferredTravelDate.includes("2025-02"));
const mar = preferredDate.filter(booking => booking.preferredTravelDate.includes("2025-03"));
const apr = preferredDate.filter(booking => booking.preferredTravelDate.includes("2025-04"));
const may = preferredDate.filter(booking => booking.preferredTravelDate.includes("2025-05"));
const jun = preferredDate.filter(booking => booking.preferredTravelDate.includes("2025-06"));
const jul = preferredDate.filter(booking => booking.preferredTravelDate.includes("2025-07"));
const aug = preferredDate.filter(booking => booking.preferredTravelDate.includes("2025-08"));
const sep = preferredDate.filter(booking => booking.preferredTravelDate.includes("2025-09"));
const oct = preferredDate.filter(booking => booking.preferredTravelDate.includes("2025-10"));
const nov = preferredDate.filter(booking => booking.preferredTravelDate.includes("2025-11"));
const dec = preferredDate.filter(booking => booking.preferredTravelDate.includes("2025-12"));


  const tourData = [
    { name: 'Jan', tours: jan.length },
    { name: 'Feb', tours: feb.length },
    { name: 'Mar', tours: mar.length },
    { name: 'Apr', tours: apr.length },
    { name: 'May', tours: may.length },
    { name: 'Jun', tours: jun.length },
    { name: 'Jul', tours: jul.length },
    { name: 'Aug', tours: aug.length },
    { name: 'Sep', tours: sep.length },
    { name: 'Oct', tours: oct.length },
    { name: 'Nov', tours: nov.length },
    { name: 'Dec', tours: dec.length },
    
  ];

  const destination = dashboard?.allTourBookings;
  const dubai = destination.filter(booking => booking.destination.includes("Dubai"));
  const abuDhabi = destination.filter(booking => booking.destination.includes("Abu Dhabi"));
  const sharjah = destination.filter(booking => booking.destination.includes("Sharjah"));
  const others = destination.filter(booking => !booking.destination.includes("Dubai") && !booking.destination.includes("Abu Dhabi") && !booking.destination.includes("Sharjah"));

  
  const destinationData = [
    { name: 'Dubai', value: dubai.length },
    { name: 'Abu Dhabi', value: abuDhabi.length },
    { name: 'Sharjah', value: sharjah.length },
    { name: 'Others', value: others.length },
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
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Booking Tours</h2>
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
              {recentBookings.map((booking, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1 || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.FullName || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.destination || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">  {new Date(booking.preferredTravelDate).toLocaleString("en-AE", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: "Asia/Dubai"
                  })}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.amount || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
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