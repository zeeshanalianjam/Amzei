// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="tours" element={<AdminTours />} />
            <Route path="tours/add" element={<AdminTourForm />} />
            <Route path="tours/edit/:id" element={<AdminTourForm />} />
            <Route path="destinations" element={<AdminDestinations />} />
            <Route path="destinations/add" element={<AdminDestinationForm />} />
            <Route path="destinations/edit/:id" element={<AdminDestinationForm />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="events/add" element={<AdminEventForm />} />
            <Route path="events/edit/:id" element={<AdminEventForm />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;