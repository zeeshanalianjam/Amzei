// src/components/Hero.js
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="container relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-bounce-in">
          Discover the Magic of UAE
        </h1>
        
        <div className="bg-white bg-opacity-95 rounded-xl p-8 max-w-3xl mx-auto shadow-2xl backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Plan Your Perfect Trip</h2>
          <form className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                <span className="mr-2">📍</span> Destination
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all">
                <option>Dubai</option>
                <option>Abu Dhabi</option>
                <option>Sharjah</option>
                <option>All Emirates</option>
              </select>
            </div>

            <div className="md:col-span-1">
              <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                <span className="mr-2">📅</span> Check-in
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                <span className="mr-2">📅</span> Check-out
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="md:col-span-1 flex items-end">
              <Link
                to="/booking/1"
                className="w-full btn-primary text-center py-3 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Search Tours
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;