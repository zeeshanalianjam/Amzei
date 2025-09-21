// src/admin/AdminLayout.js
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaMapMarkedAlt, 
  FaRoute, 
  FaCalendarAlt, 
  FaCog, 
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const adminMenu = [
    { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/admin' },
    { name: 'Users', icon: <FaUsers />, path: '/admin/users' },
    { name: 'Tours', icon: <FaRoute />, path: '/admin/tours' },
    { name: 'Destinations', icon: <FaMapMarkedAlt />, path: '/admin/destinations' },
    { name: 'Events', icon: <FaCalendarAlt />, path: '/admin/events' },
    { name: 'Settings', icon: <FaCog />, path: '/admin/settings' },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
          <Link 
            to="/" 
            className="flex items-center space-x-3 py-2.5 px-4 rounded text-gray-300 hover:bg-gray-700 transition duration-200"
          >
            <FaSignOutAlt />
            <span>Back to Site</span>
          </Link>
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
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <input 
                  type="text" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2.5" 
                  placeholder="Search..."
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <button className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                  </button>
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">3</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <span className="hidden md:inline text-gray-700">Admin</span>
                </div>
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