// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from './Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container py-3">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
            <Link to="/" className="flex items-center space-x-3">
              <Logo className="w-10 h-10" />
              <span className="text-2xl font-bold text-orange-500">Amzei</span>
            </Link>
            <button
              className="md:hidden text-gray-600 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          
          <div className="text-center md:text-right mb-4 md:mb-0">
            <p className="text-gray-600">Contact: +971 4 123 4567</p>
            <p className="text-gray-600">Business Hours: 9AM - 8PM</p>
          </div>
          
          <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto`}>
            <nav className="md:mr-6">
              <ul className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Destinations', path: '/#destinations' },
                  { name: 'Tours', path: '/tours' },
                  { name: 'About', path: '/about' },
                  { name: 'Contact', path: '/contact' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="block text-gray-700 hover:text-orange-500 transition-colors px-2 py-1 rounded-md text-sm md:text-base"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-4 md:mt-0">
              <Link to="/login" className="btn-secondary text-center">Login</Link>
              <Link to="/signup" className="btn-primary text-center">Sign Up</Link>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <Link to="/booking" className="btn-primary shadow-lg">
            Plan My Trip
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;