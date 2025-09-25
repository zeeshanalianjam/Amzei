import React from "react";

const Logo = ({ className = "w-16 h-16" }) => {
    return (
        <svg
            className={className}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Gradient Background Circle */}
            <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ffb347" />
                </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="url(#grad)" />

            {/* Stylized "A" */}
            <path
                d="M28 72 L38 28 L48 28 L58 72 M38 48 L48 48"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#shadow)"
            />

            {/* Stylized "Z" */}
            <path
                d="M60 28 H78 L60 72 H78"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />

            {/* Glow Effect */}
            <circle cx="50" cy="50" r="46" stroke="white" strokeOpacity="0.15" strokeWidth="4" />

            {/* Decorative Stars */}
            <circle cx="32" cy="34" r="2" fill="white" opacity="0.7" />
            <circle cx="70" cy="34" r="2" fill="white" opacity="0.7" />
            <circle cx="50" cy="65" r="1.8" fill="white" opacity="0.6" />
        </svg>
    );
};

export default Logo;
