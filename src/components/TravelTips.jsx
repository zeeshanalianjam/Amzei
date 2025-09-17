// src/components/TravelTips.js
import React from 'react';

const TravelTips = () => {
  const tips = [
    {
      title: "Best Time to Visit",
      icon: "🌤️",
      description: "November to March offers pleasant weather for outdoor activities"
    },
    {
      title: "Visa Requirements",
      icon: "🛂",
      description: "Many nationalities get visa on arrival. Check requirements before traveling"
    },
    {
      title: "Local Customs",
      icon: "🕌",
      description: "Respect local traditions, especially during Ramadan and at religious sites"
    },
    {
      title: "Currency",
      icon: "💰",
      description: "UAE Dirham (AED) is the local currency. Credit cards widely accepted"
    }
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Travel Tips for UAE</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Essential information to make your UAE trip smooth and enjoyable</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl mb-4">{tip.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{tip.title}</h3>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelTips;