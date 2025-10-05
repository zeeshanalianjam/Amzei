// src/App.js
import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminUsers from './admin/AdminUsers';
import AdminTours from './admin/AdminTours';
import AdminTourForm from './admin/AdminTourForm';
import AdminDestinations from './admin/AdminDestinations';
import AdminDestinationForm from './admin/AdminDestinationForm';
import AdminEvents from './admin/AdminEvents';
import AdminEventForm from './admin/AdminEventForm';
import './index.css';
import AdminLogin from './admin/AdminLogin';
import ProtectedRoute from './admin/ProtectedRoute';
import AdminSettings from './admin/AdminSettings';
import PageNotFound from './components/PageNotFound';
import { Toaster, toast } from 'react-hot-toast';
import { Axios } from './common/axios';
import { summaryApi } from './common/summaryApi';
import { useDispatch } from 'react-redux';
import { setAllUsers, setAllTours, setAllDestinations, setAllEvents, setAllTourBookings } from './adminStore/dashboardSlice';
import ComingSoon from './components/ComingSoon';
import ComingSoonCSS3D from './components/ComingSoonCSS3D';
import AdminBookings from './admin/AdminBookings';
import OTPPage from './components/OTPPage';
import ResetPasswordPage from './components/ResetPasswordPage';



function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = 'Admin Dashboard';
    if(location.pathname === '/' || location.pathname === '/login') {
      window.location.href = '/admin';
    }
  })


  // Api's calls
  const fetchAllUsers = async () => {
    try {
      const res = await Axios({
        ...summaryApi.fetchAllUsers,
      })

      if(res?.data?.success) {
      return dispatch(setAllUsers(res?.data?.data));
      }
    } catch (error) {
      console.log("Error in fetching all users", error);
      toast.error("Error in fetching all users");
    }
  }

  const fetchAllTours = async () => {
    try {
      const res = await Axios({
        ...summaryApi.fetchAllTours,
      })

      if(res?.data?.success) {
        return dispatch(setAllTours(res?.data?.data));
      }
    } catch (error) {
      console.log("Error in fetching all tours", error);
      toast.error("Error in fetching all tours");
    }
  }

  const fetchAllDestinations = async () => {
    try {
      const res = await Axios({
        ...summaryApi.fetchAllDestinations,
      })

      if(res?.data?.success) {
        return dispatch(setAllDestinations(res?.data?.data));
      }
    } catch (error) {
      console.log("Error in fetching all destinations", error);
      toast.error("Error in fetching all destinations");
    }
  }

  const fetchAllEvents = async () => {
    try {
      const res = await Axios({
        ...summaryApi.fetchAllEvents,
      })

      if(res?.data?.success) {
        return dispatch(setAllEvents(res?.data?.data));
      }
    } catch (error) {
      console.log("Error in fetching all events", error);
      toast.error("Error in fetching all events");
    }
  }

  const fetchAllTourBookings = async () => {
    try {
      const res = await Axios({
        ...summaryApi.fetchAllTourBookings,
      })
      if(res?.data?.success) {
        return dispatch(setAllTourBookings(res?.data?.data?.bookings));
      }
    } catch (error) {
      console.log("Error in fetching all tour bookings", error);
      toast.error("Error in fetching all tour bookings");
    }
  }

  useEffect(() => {
    fetchAllUsers();
    fetchAllTours();
    fetchAllDestinations();
    fetchAllEvents();
    fetchAllTourBookings();
  }, [fetchAllDestinations, fetchAllEvents, fetchAllTourBookings, fetchAllTours, fetchAllUsers])


  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
           <Route path="/admin/otp" element={<OTPPage />} />
          <Route path="/admin/reset-password" element={<ResetPasswordPage />} />
          <Route path="/admin" element={<ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="bookings" element={<AdminBookings />} />
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
    </>
  );
}

export default App;