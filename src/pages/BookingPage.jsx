// src/pages/BookingPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTourById } from '../data/tours';

const BookingPage = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: 1,
    date: '',
    specialRequests: ''
  });

  useEffect(() => {
    if (tourId) {
      const foundTour = getTourById(tourId);
      setTour(foundTour);
    }
  }, [tourId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    // Here you would normally send the booking data to your backend
    alert(`Booking confirmed for ${tour.title}!\n\nDetails:\nName: ${bookingData.name}\nEmail: ${bookingData.email}\nTravelers: ${bookingData.travelers}\nDate: ${bookingData.date}`);
    navigate('/');
  };

  return (
    <div className="section-padding">
      <div className="container">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Book Your Trip</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking Details</h2>
              
              <form onSubmit={handleSubmitBooking}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={bookingData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Number of Travelers</label>
                    <select
                      name="travelers"
                      value={bookingData.travelers}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Preferred Travel Date</label>
                    <input
                      type="date"
                      name="date"
                      value={bookingData.date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Special Requests</label>
                    <textarea
                      name="specialRequests"
                      value={bookingData.specialRequests}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <div>
            {tour && (
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Tour Summary</h2>
                
                <div className="mb-4">
                  <div className="h-40 bg-gray-200 rounded-md mb-4" style={{ backgroundImage: `url('${tour.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                  <h3 className="font-semibold text-gray-800">{tour.title}</h3>
                  <p className="text-gray-600 text-sm">{tour.duration} • {tour.location}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Highlights</h4>
                  <ul className="text-sm text-gray-600">
                    {tour.highlights.map((highlight, index) => (
                      <li key={index} className="mb-1">• {highlight}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-gray-500">Total Price </span>
                    <span className="text-xl font-bold text-orange-500">AED {tour.price * bookingData.travelers}</span>
                  </div>
                  <div className="flex items-center bg-orange-100 text-orange-500 px-2 py-1 rounded-md">
                    <span>{tour.rating}</span>
                    <span className="ml-1">★</span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  <p>Price includes accommodation, transportation, and guided tours as per itinerary.</p>
                  <p className="mt-2">Cancellation policy: Free cancellation up to 48 hours before departure.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;