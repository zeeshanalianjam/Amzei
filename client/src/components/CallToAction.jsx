// src/components/CallToAction.js
import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="section-padding bg-purple-600 text-white">
      <div className="container text-center">
        <h2 className="text-3xl font-bold mb-4">Just pack and go, leave the rest to us</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Experience the UAE with our expertly crafted tours and exceptional service</p>
        <Link to="/booking" className="bg-white text-purple-600 px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors shadow-lg">
          Start Planning
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;