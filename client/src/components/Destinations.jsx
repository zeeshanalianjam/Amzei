// src/components/Destinations.js
import React from 'react';
import { Link } from 'react-router-dom';
// import { destinations } from '../data/Destinations';
import { useSelector } from 'react-redux';

const Destinations = () => {
  const places = useSelector((state) => state.places);
  const destinations = places?.allDestinations.slice(0, 6)
  console.log("Places from Redux:", places);
  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Top Destinations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore the most iconic attractions across the UAE</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div key={destination._id} className="card hover-lift animate-slide-up">
              <div className="h-48 bg-gray-200" style={{ backgroundImage: `url('${destination.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{destination.name}</h3>
                <p className="text-gray-600 mb-4">{destination.shortDescription}</p>
                <Link to={`/destination/${destination._id}`} className="text-orange-500 font-semibold hover:text-orange-600 transition-colors">
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;