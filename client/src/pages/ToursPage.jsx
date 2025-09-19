// src/pages/ToursPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { tours } from '../data/tours';

const ToursPage = () => {
  return (
    <div className="section-padding">
      <div className="container">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">All Tour Packages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div key={tour.id} className="card">
              <div className="h-48 bg-gray-200" style={{ backgroundImage: `url('${tour.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{tour.title}</h3>
                  <div className="flex items-center bg-orange-100 text-orange-500 px-2 py-1 rounded-md">
                    <span>{tour.rating}</span>
                    <span className="ml-1">★</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{tour.description}</p>
                <div className="mb-4">
                  <span className="text-gray-500">Duration: </span>
                  <span className="font-semibold">{tour.duration}</span>
                </div>
                <div className="mb-4">
                  <span className="text-gray-500">Location: </span>
                  <span className="font-semibold">{tour.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-500">From </span>
                    <span className="text-xl font-bold text-orange-500">AED {tour.price}</span>
                  </div>
                  <Link 
                    to={`/booking/${tour.id}`}
                    className="btn-primary"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToursPage;