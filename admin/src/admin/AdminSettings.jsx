// src/admin/AdminSettings.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCog, FaBell, FaLock, FaPalette, FaGlobe, FaDatabase, FaSave, FaUpload, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'UAE Tours',
      siteUrl: 'https://uaetours.com',
      adminEmail: 'admin@uaetours.com',
      contactPhone: '+971 4 123 4567',
      businessHours: '9AM - 8PM',
      timezone: 'Asia/Dubai',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      language: 'en'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      newBookingAlerts: true,
      userRegistrationAlerts: true,
      paymentAlerts: true,
      systemAlerts: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordMinLength: 8,
      requireSpecialChars: true,
      requireNumbers: true,
      loginAttempts: 5,
      lockoutDuration: 15
    },
    appearance: {
      theme: 'light',
      primaryColor: '#fb923c',
      secondaryColor: '#ffffff',
      accentColor: '#f97316',
      logo: null,
      favicon: null,
      customCSS: ''
    },
    seo: {
      metaTitle: 'UAE Tours - Discover Dubai & Emirates',
      metaDescription: 'Your trusted partner for unforgettable UAE experiences. Discover the magic of Dubai, Abu Dhabi, and beyond with our expertly crafted tours.',
      metaKeywords: 'UAE tours, Dubai tours, Abu Dhabi tours, desert safari, travel agency',
      ogImage: null,
      twitterHandle: '@uaetours'
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      backupTime: '02:00',
      retentionPeriod: 30,
      lastBackup: '2023-10-20 02:00:00',
      nextBackup: '2023-10-21 02:00:00'
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const tabs = [
    { id: 'general', name: 'General', icon: <FaCog /> },
    { id: 'notifications', name: 'Notifications', icon: <FaBell /> },
    { id: 'security', name: 'Security', icon: <FaLock /> },
    { id: 'appearance', name: 'Appearance', icon: <FaPalette /> },
    { id: 'seo', name: 'SEO', icon: <FaGlobe /> },
    { id: 'backup', name: 'Backup', icon: <FaDatabase /> }
  ];

  const handleInputChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleFileUpload = (type, e) => {
    const file = e.target.files[0];
    if (file) {
      // Simulate file upload
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploadProgress(0), 1000);
        }
      }, 200);
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1500);
  };

  const handleBackupNow = () => {
    alert('Backup process started. You will be notified when complete.');
  };

  const containerVariants = {
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
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div>
      <motion.h1 
        className="text-2xl font-bold text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Settings
      </motion.h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group inline-flex items-center py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className={`mr-3 ${activeTab === tab.id ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-500'}`}>
                  {tab.icon}
                </span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Tab Content */}
        <motion.div 
          className="p-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Site Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                    <input
                      type="text"
                      value={settings.general.siteName}
                      onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Site URL</label>
                    <input
                      type="text"
                      value={settings.general.siteUrl}
                      onChange={(e) => handleInputChange('general', 'siteUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                    <input
                      type="email"
                      value={settings.general.adminEmail}
                      onChange={(e) => handleInputChange('general', 'adminEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                    <input
                      type="text"
                      value={settings.general.contactPhone}
                      onChange={(e) => handleInputChange('general', 'contactPhone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Regional Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                    <select
                      value={settings.general.timezone}
                      onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Asia/Dubai">Asia/Dubai (GMT+4)</option>
                      <option value="Asia/Abu_Dhabi">Asia/Abu Dhabi (GMT+4)</option>
                      <option value="Asia/Riyadh">Asia/Riyadh (GMT+3)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                    <select
                      value={settings.general.dateFormat}
                      onChange={(e) => handleInputChange('general', 'dateFormat', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Format</label>
                    <select
                      value={settings.general.timeFormat}
                      onChange={(e) => handleInputChange('general', 'timeFormat', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="12h">12-hour (AM/PM)</option>
                      <option value="24h">24-hour</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select
                      value={settings.general.language}
                      onChange={(e) => handleInputChange('general', 'language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="en">English</option>
                      <option value="ar">Arabic</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
          
          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </p>
                        <p className="text-sm text-gray-500">
                          Receive notifications for {key.toLowerCase().replace(/([A-Z])/g, ' $1')}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => handleInputChange('notifications', key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
          
          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Authentication</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.security.twoFactorAuth}
                        onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      min="5"
                      max="120"
                    />
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Password Policy</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Length</label>
                    <input
                      type="number"
                      value={settings.security.passwordMinLength}
                      onChange={(e) => handleInputChange('security', 'passwordMinLength', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      min="6"
                      max="20"
                    />
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Login Attempts</label>
                    <input
                      type="number"
                      value={settings.security.loginAttempts}
                      onChange={(e) => handleInputChange('security', 'loginAttempts', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      min="3"
                      max="10"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Require Special Characters</p>
                      <p className="text-sm text-gray-500">Passwords must contain special characters</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.security.requireSpecialChars}
                        onChange={(e) => handleInputChange('security', 'requireSpecialChars', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Require Numbers</p>
                      <p className="text-sm text-gray-500">Passwords must contain numbers</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.security.requireNumbers}
                        onChange={(e) => handleInputChange('security', 'requireNumbers', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
          
          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Theme</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['light', 'dark', 'auto'].map((theme) => (
                    <div
                      key={theme}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        settings.appearance.theme === theme ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleInputChange('appearance', 'theme', theme)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium capitalize">{theme}</span>
                        {settings.appearance.theme === theme && <FiCheck className="text-orange-500" />}
                      </div>
                      <div className={`h-20 rounded ${
                        theme === 'light' ? 'bg-white border' : 
                        theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-white to-gray-800'
                      }`}></div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Colors</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={settings.appearance.primaryColor}
                        onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                        className="w-12 h-12 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.appearance.primaryColor}
                        onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={settings.appearance.secondaryColor}
                        onChange={(e) => handleInputChange('appearance', 'secondaryColor', e.target.value)}
                        className="w-12 h-12 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.appearance.secondaryColor}
                        onChange={(e) => handleInputChange('appearance', 'secondaryColor', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={settings.appearance.accentColor}
                        onChange={(e) => handleInputChange('appearance', 'accentColor', e.target.value)}
                        className="w-12 h-12 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.appearance.accentColor}
                        onChange={(e) => handleInputChange('appearance', 'accentColor', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Brand Assets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      {settings.appearance.logo ? (
                        <div className="relative">
                          <img src={settings.appearance.logo} alt="Logo" className="mx-auto h-32" />
                          <button
                            onClick={() => handleInputChange('appearance', 'logo', null)}
                            className="mt-2 text-red-600 hover:text-red-800"
                          >
                            <FaTrash /> Remove
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
                                onChange={(e) => handleFileUpload('logo', e)}
                                accept="image/*"
                              />
                            </label>
                            <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 2MB</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      {settings.appearance.favicon ? (
                        <div className="relative">
                          <img src={settings.appearance.favicon} alt="Favicon" className="mx-auto h-16" />
                          <button
                            onClick={() => handleInputChange('appearance', 'favicon', null)}
                            className="mt-2 text-red-600 hover:text-red-800"
                          >
                            <FaTrash /> Remove
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
                                onChange={(e) => handleFileUpload('favicon', e)}
                                accept="image/*"
                              />
                            </label>
                            <p className="mt-1 text-xs text-gray-500">ICO, PNG up to 1MB</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Custom CSS</h3>
                <textarea
                  value={settings.appearance.customCSS}
                  onChange={(e) => handleInputChange('appearance', 'customCSS', e.target.value)}
                  rows="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="/* Add your custom CSS here */"
                ></textarea>
              </motion.div>
            </div>
          )}
          
          {/* SEO Settings */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Meta Tags</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                    <input
                      type="text"
                      value={settings.seo.metaTitle}
                      onChange={(e) => handleInputChange('seo', 'metaTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <p className="mt-1 text-sm text-gray-500">Recommended: 50-60 characters</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                    <textarea
                      value={settings.seo.metaDescription}
                      onChange={(e) => handleInputChange('seo', 'metaDescription', e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    ></textarea>
                    <p className="mt-1 text-sm text-gray-500">Recommended: 150-160 characters</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
                    <input
                      type="text"
                      value={settings.seo.metaKeywords}
                      onChange={(e) => handleInputChange('seo', 'metaKeywords', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <p className="mt-1 text-sm text-gray-500">Separate keywords with commas</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Twitter Handle</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        @
                      </span>
                      <input
                        type="text"
                        value={settings.seo.twitterHandle}
                        onChange={(e) => handleInputChange('seo', 'twitterHandle', e.target.value)}
                        className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Open Graph Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      {settings.seo.ogImage ? (
                        <div className="relative">
                          <img src={settings.seo.ogImage} alt="OG Image" className="mx-auto h-32" />
                          <button
                            onClick={() => handleInputChange('seo', 'ogImage', null)}
                            className="mt-2 text-red-600 hover:text-red-800"
                          >
                            <FaTrash /> Remove
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
                                onChange={(e) => handleFileUpload('ogImage', e)}
                                accept="image/*"
                              />
                            </label>
                            <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 2MB</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
          
          {/* Backup Settings */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Backup Configuration</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Automatic Backup</p>
                      <p className="text-sm text-gray-500">Enable automatic backups of your site data</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.backup.autoBackup}
                        onChange={(e) => handleInputChange('backup', 'autoBackup', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Backup Frequency</label>
                      <select
                        value={settings.backup.backupFrequency}
                        onChange={(e) => handleInputChange('backup', 'backupFrequency', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        disabled={!settings.backup.autoBackup}
                      >
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Backup Time</label>
                      <input
                        type="time"
                        value={settings.backup.backupTime}
                        onChange={(e) => handleInputChange('backup', 'backupTime', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        disabled={!settings.backup.autoBackup}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Retention Period (days)</label>
                      <input
                        type="number"
                        value={settings.backup.retentionPeriod}
                        onChange={(e) => handleInputChange('backup', 'retentionPeriod', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        min="1"
                        max="365"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Backup Status</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Last Backup</h4>
                      <p className="text-lg font-semibold text-gray-900">{settings.backup.lastBackup}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Next Backup</h4>
                      <p className="text-lg font-semibold text-gray-900">{settings.backup.nextBackup}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex space-x-3">
                    <button
                      onClick={handleBackupNow}
                      className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center"
                    >
                      <FaDatabase className="mr-2" />
                      Backup Now
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
                      Download Latest
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
          
          {/* Save Button */}
          <motion.div 
            className="flex justify-end pt-6 border-t border-gray-200"
            variants={itemVariants}
          >
            <button
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center"
            >
              {isSaving ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-t-2 border-white border-solid rounded-full mr-2"
                />
              ) : (
                <FaSave className="mr-2" />
              )}
              Save Settings
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminSettings;