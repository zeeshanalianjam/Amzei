// src/pages/BookingPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getTourById } from '../data/Tours';
import { toast } from 'react-hot-toast';
import { Axios } from '../common/axios';
import { summaryApi } from '../common/summaryApi';
import LoadingPopup from '../utils/LoadingPopup';

const BookingPage = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  console.log("location state:", location.state);
  const [tour, setTour] = useState(null);
  console.log("tourId:", tourId);
  console.log("tour:", tour);
  const [bookingData, setBookingData] = useState({
    FullName: '',
    email: '',
    phone: '',
    destination: location?.state?.destination || '',
    preferredTravelDate: '',
    checkIn: location?.state?.checkIn || '',
    checkOut: location?.state?.checkOut || '',
    numberOfGuests: 1,
    specialRequests: '',
    tripType: 'solo',
    kindOfTour: 'adventure',
    numberOfDays: '',
    numberOfRooms: '',
    nationality: '',
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

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
   
    try {
      setLoading(true);
      const res = await Axios({
        ...summaryApi.bookATour,
        data: bookingData
      })

      if(res?.data?.success) {
        toast.success(res?.data?.message || 'Booking successful!');
        navigate('/');
        setBookingData({
          FullName: '',
          email: '',
          phone: '',
          destination: '',
          preferredTravelDate: '',
          checkIn: '',
          checkOut: '',
          numberOfGuests: 1,
          specialRequests: '',
          tripType: '',
          kindOfTour: '',
          numberOfDays: '',
          numberOfRooms: '',
          nationality: '',
        })
      }

    } catch (error) {
      toast.error(error?.response?.data?.message ||'Failed to submit booking. Please try again.');
      console.error('Booking submission error:', error);
      return;
    } finally {
      setLoading(false);
    }

    console.log('Booking Data:', bookingData);
  };

  return (
    <div className="section-padding">
      <LoadingPopup isOpen={loading} />
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
                      name="FullName"
                      placeholder="Your full name"
                      value={bookingData.FullName}
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
                      placeholder="Your email address"
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
                      placeholder="+971 50 123 4567"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({
                        ...bookingData,
                        phone: e.target.value.replace(/\s+/g, '')
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Number of Travelers</label>
                    <select
                      name="numberOfGuests"
                      value={bookingData.numberOfGuests}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Your Trip Type</label>
                    <select
                      name="tripType"
                      value={bookingData.tripType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {["solo", "couple", "family", "group"].map(num => (
                        <option key={num} value={num}>{num.charAt(0).toUpperCase() + num.slice(1) } </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">What kind of tour?</label>
                    <select
                      name="kindOfTour"
                      value={bookingData.kindOfTour}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {["adventure", "cultural", "relaxation", "wildlife", "historical"].map(num => (
                        <option key={num} value={num}>{num.charAt(0).toUpperCase() + num.slice(1) } </option>
                      ))}
                    </select>
                  </div>

                   <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Number of Days</label>
                    <input
                      type="tel"
                      name="numberOfDays"
                      placeholder="e.g., 5"
                      value={bookingData.numberOfDays}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                   <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Number of Rooms</label>
                    <input
                      type="tel"
                      name="numberOfRooms"
                      placeholder="e.g., 5"
                      value={bookingData.numberOfRooms}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  
                  <div >
                    <label className="block text-gray-700 text-sm font-bold mb-2">Preferred Travel Date</label>
                    <input
                      type="date"
                      name="preferredTravelDate"
                      value={bookingData.preferredTravelDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                   <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Your Nationality</label>
                    <input
                      type="text"
                      name="nationality"
                      placeholder="e.g., Arabian"
                      value={bookingData.nationality}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Special Requests</label>
                    <textarea
                      name="specialRequests"
                      placeholder="Any special requests?"
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
            {!tour && (
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Tour Summary</h2>
                
                <div className="mb-4">
                  <div className="h-40 bg-gray-200 rounded-md mb-4" style={{ backgroundImage: `url('${tour?.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                  <h3 className="font-semibold text-gray-800">{tour?.title}</h3>
                  <p className="text-gray-600 text-sm">{tour?.duration} • {tour?.location}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Highlights</h4>
                  <ul className="text-sm text-gray-600">
                    {tour?.highlights.map((highlight, index) => (
                      <li key={index} className="mb-1">• {highlight}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-gray-500">Total Price </span>
                    <span className="text-xl font-bold text-orange-500">AED {tour?.price * bookingData?.travelers}</span>
                  </div>
                  <div className="flex items-center bg-orange-100 text-orange-500 px-2 py-1 rounded-md">
                    <span>{tour?.rating}</span>
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