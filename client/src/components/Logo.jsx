import React from 'react';

const Logo = ({ className = "w-12 h-12" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="50" cy="50" r="45" fill="#f97316" />

      {/* Stylized "A" */}
      <path
        d="M25 75 L35 25 L45 25 L55 75 M35 50 L45 50"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Stylized "M" */}
      <path
        d="M55 75 L60 25 L65 45 L70 25 L75 75"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Decorative elements */}
      <circle cx="50" cy="50" r="2" fill="white" opacity="0.8" />
      <circle cx="35" cy="35" r="1.5" fill="white" opacity="0.6" />
      <circle cx="65" cy="35" r="1.5" fill="white" opacity="0.6" />
    </svg>
  );
};

export default Logo;