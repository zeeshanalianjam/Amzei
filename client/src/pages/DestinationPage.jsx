// src/pages/DestinationPage.js
import React from 'react';
import { useLocation, useNavigate} from 'react-router-dom';

const DestinationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location?.state?.destination

  if (!destination) {
    return <div className="section-padding">Destination not found</div>;
  }


 

  return (
    <div className="section-padding">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{destination.name}</h1>
          <p className="text-gray-600">location: {destination.location}</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <div className="h-96 bg-gray-200 rounded-lg shadow-md" style={{ backgroundImage: `url('${destination.imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About {destination.name}</h2>
              <p className="text-gray-600 mb-4">{destination.shortDescription}</p>
              <p className="text-gray-700">{destination.detailedDescription}</p>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Book a Tour</h3>
                <button onClick={() => navigate(`/booking/${destination._id}`, { state : {destination : destination.location} })} className="btn-primary">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationPage;