import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Footer from './components/footer/Footer';
import Login from './components/auth/Login';
import SignUp from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import VerifyOtp from './components/auth/VerifyOtp';
import UpdatePassword from './components/auth/UpdatePassword';
import UserDashboard from './components/user/UserDashboard';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        
        {/* Guest Only Routes (redirect authenticated users) */}
        <Route 
          path="/login" 
          element={
            <ProtectedRoute requireAuth={false}>
              <Login />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <ProtectedRoute requireAuth={false}>
              <SignUp />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/forgot/password" 
          element={
            <ProtectedRoute requireAuth={false}>
              <ForgotPassword />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/otp/verify" 
          element={
            <ProtectedRoute requireAuth={false}>
              <VerifyOtp />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/password/update" 
          element={
            <ProtectedRoute requireAuth={false}>
              <UpdatePassword />
            </ProtectedRoute>
          } 
        />

        {/* Protected Routes (require authentication) */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute requireAuth={true}>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Unauthorized Route */}
        <Route 
          path="/unauthorized" 
          element={
            <div className="container py-5 text-center">
              <h2>Unauthorized Access</h2>
              <p>You don't have permission to access this page.</p>
            </div>
          } 
        />

        {/* 404 Route */}
        <Route 
          path="*" 
          element={
            <div className="container py-5 text-center">
              <h2>Page Not Found</h2>
              <p>The page you're looking for doesn't exist.</p>
            </div>
          } 
        />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;