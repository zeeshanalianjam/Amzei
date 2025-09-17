// src/pages/AboutPage.js
import React from 'react';

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Ahmed Hassan",
      position: "Founder & CEO",
      bio: "With over 20 years of experience in the UAE tourism industry, Ahmed founded UAE Tours with a vision to showcase the best of the Emirates.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "Sarah Johnson",
      position: "Tour Operations Manager",
      bio: "Sarah ensures every tour runs smoothly, from planning to execution, with attention to detail and customer satisfaction.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "Mohammed Al-Falasi",
      position: "Lead Tour Guide",
      bio: "Mohammed brings UAE history and culture to life with his extensive knowledge and engaging storytelling.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "Lisa Chen",
      position: "Customer Experience Manager",
      bio: "Lisa is dedicated to ensuring every traveler has an unforgettable experience with personalized service and support.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  return (
    <div className="section-padding">
      <div className="container">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">About UAE Tours</h1>
        
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <div className="md:w-1/2">
            <div className="h-96 bg-gray-200 rounded-lg shadow-md" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-md h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2008, UAE Tours began as a small team of passionate travel enthusiasts who wanted to share the beauty and culture of the United Arab Emirates with the world. What started as a modest operation has grown into one of the most trusted tour companies in the region.
              </p>
              <p className="text-gray-600 mb-4">
                Our mission is to provide authentic, memorable travel experiences that go beyond typical tourist attractions. We believe in sustainable tourism that respects local culture and benefits local communities.
              </p>
              <p className="text-gray-600">
                With a team of expert guides, travel planners, and customer service professionals, we're committed to making your UAE journey truly unforgettable.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Excellence",
                description: "We strive for excellence in everything we do, from tour planning to customer service."
              },
              {
                title: "Authenticity",
                description: "We provide genuine experiences that showcase the true culture and heritage of the UAE."
              },
              {
                title: "Sustainability",
                description: "We're committed to responsible tourism that preserves the environment and supports local communities."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200" style={{ backgroundImage: `url('${member.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-orange-500 text-sm mb-2">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;