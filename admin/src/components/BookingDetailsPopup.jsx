// src/components/BookingDetailsPopup.js
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaBed, FaClock, FaGlobe, FaHeart, FaMoneyBillWave, FaTag, FaPercent } from 'react-icons/fa';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Stars, Float, Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 3D Floating Card Component
function FloatingCard() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.2}>
      <mesh ref={meshRef}>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial
          color="#fb923c"
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

// 3D Floating Orbs Component
function FloatingOrbs() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(i) * 0.5;

        return (
          <Float
            key={i}
            speed={1 + i * 0.2}
            rotationIntensity={0.5}
            floatIntensity={0.5}
            position={[x, y, z]}
          >
            <mesh>
              <sphereGeometry args={[0.2, 32, 32]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? '#fb923c' : '#ffffff'}
                metalness={0.5}
                roughness={0.2}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

// 3D Particle Field Component
function ParticleField({ count = 150 }) {
  const meshRef = useRef();
  const particlesRef = useRef();

  useEffect(() => {
    if (particlesRef.current) {
      const positions = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 15;
        positions[i3 + 1] = (Math.random() - 0.5) * 15;
        positions[i3 + 2] = (Math.random() - 0.5) * 15;
      }

      particlesRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={particlesRef} />
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.7}
        sizeAttenuation={true}
      />
    </points>
  );
}

// 3D Scene Component
function Scene() {
  return (
    <>
      <color attach="background" args={['#1e293b']} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#fb923c" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />

      <FloatingCard />
      <FloatingOrbs />
      <ParticleField count={150} />
      <Stars radius={20} depth={20} count={500} factor={2} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

const BookingDetailsPopup = ({
  isOpen,
  onClose,
  bookingData
}) => {
  if (!bookingData) return null;

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString("en-AE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Dubai"
    });
  };

  // Format currency function
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return 'N/A';
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const getStatusClass = () => {
      switch (status?.toLowerCase()) {
        case 'approved': return 'bg-green-100 text-green-800';
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass()}`}>
        {status?.toUpperCase() || 'N/A'}
      </span>
    );
  };

  // Detail row component
  const DetailRow = ({ icon, label, value, highlight = false }) => (
    <motion.div
      className="flex items-start py-2 border-b border-gray-100 last:border-0"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mr-3">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-500">{label}</div>
        <div className={`text-sm mt-1 ${highlight ? 'font-bold text-orange-500' : 'text-gray-900'}`}>
          {value || 'N/A'}
        </div>
      </div>
    </motion.div>
  );

  // Pricing details component
  const PricingDetails = ({ pricingDetails }) => {
    if (!pricingDetails || pricingDetails.length === 0) return null;

    const pricing = pricingDetails[0]; // Get the first pricing object

    return (
      <div className="bg-gray-50 rounded-xl p-5 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FaMoneyBillWave className="text-orange-500 mr-2" />
          Pricing Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">{pricing.personCost ? 'Person Cost' : 'Additional Cost'} </div>
            <div className="text-lg font-bold text-orange-500">{formatCurrency(pricing.personCost || pricing.additionalCost)}</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">{pricing.roomCost ? 'Room Cost' : 'Base Price'}</div>
            <div className="text-lg font-bold text-orange-500">{formatCurrency(pricing.roomCost || pricing.basePrice)}</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">{pricing.dayCost ? 'Day Cost' : 'Per Person Price'}</div>
            <div className="text-lg font-bold text-orange-500">{formatCurrency(pricing.dayCost || pricing.perPersonPrice)}</div>
          </div>

          {pricing?.tripTypeCost && <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Trip Type Cost</div>
            <div className="text-lg font-bold text-orange-500">{formatCurrency(pricing.tripTypeCost)}</div>
          </div>}

          {pricing?.tourTypeCost && <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Tour Type Cost</div>
            <div className="text-lg font-bold text-orange-500">{formatCurrency(pricing.tourTypeCost)}</div>
          </div>}

          {pricing?.tax && <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Tax</div>
            <div className="text-lg font-bold text-orange-500">{formatCurrency(pricing.tax)}</div>
          </div>}
        </div>

        {pricing?.subtotal && <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <div className="text-sm text-gray-500">Subtotal</div>
          <div className="text-lg font-bold text-gray-800">{formatCurrency(pricing.subtotal)}</div>
        </div>}

        <div className="flex justify-between items-center pt-3">
          <div className="text-sm text-gray-500">Total</div>
          <div className="text-2xl font-bold text-orange-500">{formatCurrency(pricing.total || pricing.totalPrice)}</div>
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 3D Background Canvas */}
            <div className="absolute inset-0 z-0">
              <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <Scene />
              </Canvas>
            </div>

            {/* Popup Content */}
            <motion.div
              className="relative z-10 bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0, rotateX: -10 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 relative">
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes className="text-xl" />
                </motion.button>

                <motion.div
                  className="flex items-center justify-between"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Booking Details</h2>
                    <p className="text-orange-100">ID: {bookingData._id || 'N/A'}</p>
                  </div>
                  <StatusBadge status={bookingData.status} />
                </motion.div>
              </div>

              {/* Body */}
              <motion.div className="p-6">
                {/* Pricing Details */}
                {bookingData.pricingDetails && bookingData.pricingDetails.length > 0 && (
                  <PricingDetails pricingDetails={bookingData.pricingDetails} />
                )}

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Customer Information */}
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <FaUser className="text-orange-500 mr-2" />
                      Customer Information
                    </h3>

                    <div className="space-y-3">
                      <DetailRow
                        icon={<FaUser />}
                        label="Full Name"
                        value={bookingData.FullName || bookingData.fullName}
                      />
                      <DetailRow
                        icon={<FaEnvelope />}
                        label="Email"
                        value={bookingData.email}
                      />
                      <DetailRow
                        icon={<FaPhone />}
                        label="Phone"
                        value={bookingData.phone}
                      />
                      {bookingData?.nationality && <DetailRow
                        icon={<FaGlobe />}
                        label="Nationality"
                        value={bookingData.nationality}
                      />}
                    </div>
                  </div>

                  {/* Booking Information */}
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <FaCalendarAlt className="text-orange-500 mr-2" />
                      Booking Information
                    </h3>

                    <div className="space-y-3">
                      <DetailRow
                        icon={<FaCalendarAlt />}
                        label="Preferred Travel Date"
                        value={formatDate(bookingData.preferredTravelDate || bookingData.travelDate)}
                      />
                      <DetailRow
                        icon={<FaClock />}
                        label="Created At"
                        value={formatDate(bookingData.createdAt)}
                      />
                      <DetailRow
                        icon={<FaClock />}
                        label="Updated At"
                        value={formatDate(bookingData.updatedAt)}
                      />
                      <DetailRow
                        icon={<FaMapMarkerAlt />}
                        label="Destination"
                        value={bookingData.destination || bookingData.tourLocation}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Trip Details */}
                <div className="bg-gray-50 rounded-xl p-5 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FaHeart className="text-orange-500 mr-2" />
                    Trip Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <motion.div
                      className="bg-white rounded-lg p-4 shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="text-3xl font-bold text-orange-500 mb-1">{bookingData.numberOfDays || 0}</div>
                      <div className="text-sm text-gray-500">Number of Days</div>
                    </motion.div>

                    <motion.div
                      className="bg-white rounded-lg p-4 shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="text-3xl font-bold text-orange-500 mb-1">{bookingData.numberOfGuests || 0}</div>
                      <div className="text-sm text-gray-500">Number of Guests</div>
                    </motion.div>

                    {bookingData?.numberOfRooms && <motion.div
                      className="bg-white rounded-lg p-4 shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="text-3xl font-bold text-orange-500 mb-1">{bookingData.numberOfRooms || 0}</div>
                      <div className="text-sm text-gray-500">Number of Rooms</div>
                    </motion.div>}

                    {bookingData?.tripType && <motion.div
                      className="bg-white rounded-lg p-4 shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="text-lg font-bold text-orange-500 mb-1 capitalize">{bookingData.tripType || 'N/A'}</div>
                      <div className="text-sm text-gray-500">Trip Type</div>
                    </motion.div>}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>

                  {bookingData?.FullName && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kind of Tour</label>
                      <div className="px-3 py-2 bg-white rounded-lg border border-gray-200 text-gray-900 capitalize">
                        {bookingData.kindOfTour || 'N/A'}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                      <div className="px-3 py-2 bg-white rounded-lg border border-gray-200 text-gray-900">
                        {bookingData.checkIn ? formatDate(bookingData.checkIn) : 'N/A'}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                      <div className="px-3 py-2 bg-white rounded-lg border border-gray-200 text-gray-900">
                        {bookingData.checkOut ? formatDate(bookingData.checkOut) : 'N/A'}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                      <div className="px-3 py-2 bg-white rounded-lg border border-gray-200 text-gray-900 font-mono text-sm">
                        {bookingData.user || 'N/A'}
                      </div>
                    </div>
                  </div>}

                  {bookingData.specialRequests && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                      <div className="px-3 py-2 bg-white rounded-lg border border-gray-200 text-gray-900 min-h-[60px]">
                        {bookingData.specialRequests || 'No special requests'}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <motion.div
                  className="flex justify-end mt-6 pt-4 border-t border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.button
                    onClick={onClose}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Close
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingDetailsPopup;