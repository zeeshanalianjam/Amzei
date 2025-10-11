// src/App.js
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import './index.css';

// Layouts & Components
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminUsers from './admin/AdminUsers';
import AdminTours from './admin/AdminTours';
import AdminTourForm from './admin/AdminTourForm';
import AdminDestinations from './admin/AdminDestinations';
import AdminDestinationForm from './admin/AdminDestinationForm';
import AdminEvents from './admin/AdminEvents';
import AdminEventForm from './admin/AdminEventForm';
import AdminLogin from './admin/AdminLogin';
import AdminBookings from './admin/AdminBookings';
import ProtectedRoute from './admin/ProtectedRoute';
import PageNotFound from './components/PageNotFound';
import ComingSoonCSS3D from './components/ComingSoonCSS3D';
import OTPPage from './components/OTPPage';
import ResetPasswordPage from './components/ResetPasswordPage';

// ✅ Import single API function
import { fetchAllAdminData } from './api/fetchAdminData';
import AdminTourPackagesBookings from './admin/AdminTourPackagesBookings';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Admin Dashboard';
  }, []);

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/login') {
      // Navigate to the /admin
      window.location.href = '/admin';
    }
  }, []);

  // ✅ Fetch all data once
  useEffect(() => {
    fetchAllAdminData(dispatch);
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/otp" element={<OTPPage />} />
        <Route path="/admin/reset-password" element={<ResetPasswordPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="package-bookings" element={<AdminTourPackagesBookings />} />
          <Route path="tours" element={<AdminTours />} />
          <Route path="tours/add" element={<AdminTourForm />} />
          <Route path="tours/edit/:id" element={<AdminTourForm />} />
          <Route path="destinations" element={<AdminDestinations />} />
          <Route path="destinations/add" element={<AdminDestinationForm />} />
          <Route path="destinations/edit/:id" element={<AdminDestinationForm />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="events/add" element={<AdminEventForm />} />
          <Route path="events/edit/:id" element={<AdminEventForm />} />
          <Route path="settings" element={<ComingSoonCSS3D />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
