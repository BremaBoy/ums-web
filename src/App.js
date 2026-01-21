import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Classes from './pages/Classes';
import Payments from './pages/Payments';
import Results from './pages/Results';
import Profile from './pages/Profile';
import HelpSupport from './pages/HelpSupport';
import PrivacyPolicy from './pages/PrivacyPolicy';
import './index.css';

import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import RootRedirect from './components/RootRedirect';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/results" element={<Results />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/help-support" element={<HelpSupport />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Route>

        {/* Smart Root Redirect */}
        <Route path="/" element={<RootRedirect />} />
        {/* Fallback for other routes to Dashboard (as they are not implemented yet) */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
