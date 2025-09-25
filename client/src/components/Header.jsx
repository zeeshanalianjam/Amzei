// src/components/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import { useSelector } from 'react-redux';
import useAuthCheck from '../utils/useAuthCheck';
import { Axios } from '../common/axios';
import { summaryApi } from '../common/summaryApi';
import toast from 'react-hot-toast';
import LoadingPopup from '../utils/LoadingPopup';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log("User from Redux:", user);
  console.log("Access Token:", accessToken);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

    useAuthCheck(accessToken, () => {
    console.log("Token expired, logging out...");
    localStorage.removeItem("accessToken");
    setAccessToken("");
    navigate("/");
  });

  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...summaryApi.logout,
      })

      if(res?.data?.success){
        toast.success(res?.data?.message || 'Logout successful!');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setAccessToken('');
        navigate('/login');
      }
      
    } catch (error) {
       toast.error(error?.response?.data?.message || 'logout failed. Please try again.');
        console.log("Error in logout : ", error);
    } finally {
      setLoading(false);
    }
  }


  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <LoadingPopup isOpen={loading} />
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
            <p className="text-gray-600">Contact: 0581867078</p>
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
            
           {user?.email || accessToken ? <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-4 md:mt-0">
              <button onClick={handleLogout} className="btn-secondary text-center">Logout</button>
            </div> : <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-4 md:mt-0">
              <Link to="/login" className="btn-secondary text-center">Login</Link>
              <Link to="/signup" className="btn-primary text-center">Sign Up</Link>
            </div> }
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