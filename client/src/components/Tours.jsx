// src/components/Tours.js
import React from 'react';
import { Link } from 'react-router-dom';
import { tours } from '../data/tours';

const Tours = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Popular Tour Packages</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Choose from our carefully designed tour packages</p>
          <div className="mt-4">
            <Link to="/tours" className="text-orange-500 font-semibold hover:text-orange-600 transition-colors">
              View All Tours →
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.slice(0, 3).map((tour) => (
            <div key={tour.id} className="card hover-lift animate-fade-in-delay">
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
    </section>
  );
};

export default Tours;