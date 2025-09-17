// src/components/AboutUs.js
import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <section className="section-padding bg-orange-50">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="h-80 bg-gray-200 rounded-lg shadow-md" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About UAE Tours</h2>
            <p className="text-gray-600 mb-4">
              With over 15 years of experience in the UAE tourism industry, we specialize in creating unforgettable travel experiences across all seven emirates. Our team of local experts ensures you discover both iconic landmarks and hidden gems.
            </p>
            <p className="text-gray-600 mb-6">
              We pride ourselves on personalized service, attention to detail, and creating memories that last a lifetime. Whether you're seeking luxury, adventure, or cultural immersion, we have the perfect tour for you.
            </p>
            <Link to="/about" className="btn-primary">
              Meet Our Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;