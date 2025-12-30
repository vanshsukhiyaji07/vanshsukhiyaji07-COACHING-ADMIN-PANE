import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';

// Pages
import Home from './pages/public/Home';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Enquiries from './pages/admin/Enquiries';
import Students from './pages/admin/Students';
import Courses from './pages/admin/Courses';
import Settings from './pages/admin/Settings';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  
  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes (Tier 2 Equivalent) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div className="p-8">About Page Placeholder</div>} />
          <Route path="/courses" element={<div className="p-8">Courses List Placeholder</div>} />
        </Route>

        {/* Admin Authentication */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Routes (Tier 3 Exclusive) */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="students" element={<Students />} />
          <Route path="courses" element={<Courses />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<div className="p-20 text-center text-gray-500">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;