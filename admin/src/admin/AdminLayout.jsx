// src/admin/AdminLayout.js
import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaMapMarkedAlt, 
  FaRoute, 
  FaCalendarAlt, 
  FaCog, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaSearch
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const adminMenu = [
    { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/admin' },
    { name: 'Users', icon: <FaUsers />, path: '/admin/users' },
    { name: 'Bookings', icon: <FaUsers />, path: '/admin/bookings' },
    { name: 'Tours', icon: <FaRoute />, path: '/admin/tours' },
    { name: 'Destinations', icon: <FaMapMarkedAlt />, path: '/admin/destinations' },
    { name: 'Events', icon: <FaCalendarAlt />, path: '/admin/events' },
    { name: 'Settings', icon: <FaCog />, path: '/admin/settings' },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div 
        className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30`}
        initial={false}
        animate={{ width: sidebarOpen ? '16rem' : '0' }}
      >
        <div className="flex items-center justify-between mb-10 px-4">
          <h1 className="text-2xl font-bold text-orange-500">Amzei Admin</h1>
          <button 
            onClick={toggleSidebar}
            className="md:hidden text-gray-400 hover:text-white focus:outline-none"
          >
            <FaTimes />
          </button>
        </div>
        
        <nav>
          {adminMenu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 py-2.5 px-4 rounded transition duration-200 ${
                location.pathname === item.path ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        
        <div className="absolute bottom-0 w-full p-4">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 py-2.5 px-4 rounded text-gray-300 hover:bg-gray-700 transition duration-200 w-full"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-md">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={toggleSidebar}
              className="md:hidden text-gray-500 focus:outline-none"
            >
              <FaBars />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2.5" 
                  placeholder="Search..."
                />
              </div>
              
              <div className="relative">
                <button 
                  className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                >
                  <FaBell />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">3</span>
                </button>
                
                {notificationsOpen && (
                  <motion.div 
                    className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="px-4 py-2 border-b">
                      <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {[
                        { title: "New tour booking", time: "2 min ago" },
                        { title: "User registration", time: "1 hour ago" },
                        { title: "Payment received", time: "3 hours ago" }
                      ].map((notif, index) => (
                        <div key={index} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                          <p className="text-sm font-medium text-gray-800">{notif.title}</p>
                          <p className="text-xs text-gray-500">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                  A
                </div>
                <span className="hidden md:inline text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;