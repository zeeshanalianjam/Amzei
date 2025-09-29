// src/pages/BookingPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getTourById } from '../data/Tours';
import { toast } from 'react-hot-toast';
import { Axios } from '../common/axios';
import { summaryApi } from '../common/summaryApi';
import LoadingPopup from '../utils/LoadingPopup';
import { useSelector } from 'react-redux';

const BookingPage = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(state => state.user);
  
  const [loading, setLoading] = useState(false);
  const [tour, setTour] = useState(null);
  
  // Destination pricing configuration
  const destinationPricing = {
    dubai: {
      perPerson: 300,
      perRoom: 100,
      perDay: 40, // Price per day in Dubai
      description: "Experience the luxury of Dubai with our exclusive tour package. Visit iconic landmarks like Burj Khalifa, Dubai Mall, Palm Jumeirah, and more.",
      highlights: [
        "Pickup from Dubai International Airport and drop at Burj Khalifa (30 km, 45 minutes)",
        "Scenic route via Sheikh Zayed Road with city skyline views",
        "Visit to Dubai Mall and Fountain Show (2 hours)",
        "Desert Safari with dinner and entertainment (6 hours)"
      ]
    },
    abu_dhabi: {
      perPerson: 250,
      perRoom: 90,
      perDay: 20, // Price per day in Abu Dhabi
      description: "Discover the capital of UAE with its rich cultural heritage and modern architecture.",
      highlights: [
        "Pickup from Abu Dhabi Airport and drop at Sheikh Zayed Grand Mosque (35 km, 50 minutes)",
        "Route via Corniche Road with coastal views",
        "Visit to Louvre Abu Dhabi and Qasr Al Watan (3 hours)",
        "Yas Island tour including Ferrari World (4 hours)"
      ]
    },
    sharjah: {
      perPerson: 200,
      perRoom: 80,
      perDay: 15, // Price per day in Sharjah
      description: "Explore the cultural capital of UAE with its museums, heritage sites, and beautiful mosques.",
      highlights: [
        "Pickup from Sharjah Airport and drop at Al Noor Mosque (20 km, 30 minutes)",
        "Route via King Faisal Street with cultural landmarks",
        "Visit to Sharjah Museum of Islamic Civilization (2 hours)",
        "Al Qasba and Al Majaz Waterfront tour (3 hours)"
      ]
    }
  };
  
  // Trip type pricing
  const tripTypePricing = {
    solo: 100,
    couple: 150,
    family: 200,
    group: 250
  };
  
  // Tour type pricing
  const tourTypePricing = {
    adventure: 200,
    cultural: 150,
    relaxation: 100,
    wildlife: 250,
    historical: 180
  };

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
    numberOfDays: 1, // Default to 1 day
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
          numberOfDays: 1,
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
  };

  useEffect(() => {
    if(!user?._id){
      navigate('/login');
    }
  }, []);

  // Calculate pricing
  const calculatePricing = () => {
    const destination = bookingData.destination.toLowerCase().replace(' ', '_');
    const destConfig = destinationPricing[destination] || { perPerson: 0, perRoom: 0, perDay: 0 };
    
    const personCost = destConfig.perPerson * bookingData.numberOfGuests;
    const roomCost = destConfig.perRoom * bookingData.numberOfRooms;
    const dayCost = destConfig.perDay * bookingData.numberOfDays; // Cost based on number of days
    const tripCost = tripTypePricing[bookingData.tripType] || 0;
    const tourCost = tourTypePricing[bookingData.kindOfTour] || 0;
    
    const subtotal = personCost + roomCost + dayCost + tripCost + tourCost;
    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + tax;
    
    return {
      personCost,
      roomCost,
      dayCost,
      tripCost,
      tourCost,
      subtotal,
      tax,
      total
    };
  };
  
  const pricing = calculatePricing();
  const destinationKey = bookingData.destination.toLowerCase().replace(' ', '_');
  const destinationInfo = destinationPricing[destinationKey] || null;

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
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
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
                      {["solo", "couple", "family", "group"].map(type => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)} (AED {tripTypePricing[type]})
                        </option>
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
                      {["adventure", "cultural", "relaxation", "wildlife", "historical"].map(type => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)} (AED {tourTypePricing[type]})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Number of Days</label>
                    <select
                      name="numberOfDays"
                      value={bookingData.numberOfDays}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Day' : 'Days'} (AED {num * (destinationInfo?.perDay || 0)})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Number of Rooms</label>
                    <input
                      type="number"
                      name="numberOfRooms"
                      placeholder="e.g., 2"
                      value={bookingData.numberOfRooms}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div>
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
                      placeholder="e.g., Emirati"
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
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Summary</h2>

              {destinationInfo && (
                <div className="mb-6">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">{bookingData.destination}</h3>
                  <p className="text-gray-600 text-sm mb-3">{destinationInfo.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Tour Highlights</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      {destinationInfo.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Price Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Person Cost ({bookingData.numberOfGuests} guests × {destinationInfo?.perPerson || 0} AED)</span>
                    <span>AED {pricing.personCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Room Cost ({bookingData.numberOfRooms} rooms × {destinationInfo?.perRoom || 0} AED)</span>
                    <span>AED {pricing.roomCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Day Cost ({bookingData.numberOfDays} days × {destinationInfo?.perDay || 0} AED/day)</span>
                    <span>AED {pricing.dayCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trip Type ({bookingData.tripType})</span>
                    <span>AED {pricing.tripCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tour Type ({bookingData.kindOfTour})</span>
                    <span>AED {pricing.tourCost}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span>Subtotal</span>
                    <span>AED {pricing.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>AED {pricing.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-orange-500">AED {pricing.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                <p>Price includes accommodation, transportation, and guided tours as per itinerary.</p>
                <p className="mt-2">Cancellation policy: Free cancellation up to 48 hours before departure.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;