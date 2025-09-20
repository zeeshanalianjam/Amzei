import React from "react";
import { ThreeDot } from "react-loading-indicators";

const LoadingPopup = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-80 flex flex-col items-center">
        <h2 className="text-xl font-semibold text-orange-500 mb-4">
          Please wait...
        </h2>

        <ThreeDot
          variant="bounce"
          color="#ff7b00" // orange
          size="medium"
          text=""
          textColor=""
        />

        <p className="mt-4 text-sm text-gray-600">
          We are processing your request
        </p>
      </div>
    </div>
  );
};

export default LoadingPopup;
