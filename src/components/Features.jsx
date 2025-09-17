// src/components/Features.js
import React from 'react';

const Features = () => {
  const features = [
    {
      icon: "👤",
      title: "Personalized Service",
      description: "Tailored itineraries to match your preferences and travel style"
    },
    {
      icon: "✅",
      title: "Peace of Mind",
      description: "Hassle-free travel with expert guides and 24/7 support"
    },
    {
      icon: "⭐",
      title: "2000+ Reviews",
      description: "Highly rated by travelers from around the world"
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose UAE Tours</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We provide exceptional travel experiences with personalized service and attention to detail</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;