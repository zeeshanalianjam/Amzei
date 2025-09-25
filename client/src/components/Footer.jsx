import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Logo className="w-8 h-8" />
              <span className="text-xl font-bold text-orange-500">Amzei</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for unforgettable UAE travel experiences. We specialize in creating personalized tours across all seven emirates.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors transform hover:scale-110">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors transform hover:scale-110">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors transform hover:scale-110">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors transform hover:scale-110">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Destinations', path: '/#destinations' },
                { name: 'Tours', path: '/tours' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-orange-500 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Our Services</h3>
            <ul className="space-y-2">
              {[
                'City Tours',
                'Desert Safari',
                'Cultural Experiences',
                'Airport Transfers',
                'Hotel Bookings',
                'Group Tours',
                'Private Tours',
                'Adventure Activities'
              ].map((service) => (
                <li key={service}>
                  <span className="text-gray-300 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-orange-500 mt-1 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>Dubai, UAE</p>
                  <p>Business Bay, World Trade Center</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-orange-500 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>0581867078</p>
                  <p>0544003554</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-orange-500 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>nangyaluoa249@gmail.com</p>
                 
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for the latest UAE travel deals and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition-colors font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Amzei. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;