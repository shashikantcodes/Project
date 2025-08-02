import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requireAuth = true, requireAdmin = false }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth status
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If route requires authentication
  if (requireAuth) {
    if (!isAuthenticated) {
      // Redirect to login page with return url
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If route requires admin access
    if (requireAdmin && user?.role !== 'admin') {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // If route is for guests only (like login/register pages)
  if (!requireAuth && isAuthenticated) {
    // Redirect authenticated users away from guest-only pages
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return children;
};

export default ProtectedRoute;
