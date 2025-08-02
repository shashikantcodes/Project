import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaEnvelope, FaCalendar, FaShieldAlt, FaSignOutAlt } from 'react-icons/fa';

function UserDashboard({ theme }) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className={`card shadow-lg border-0 bg-${theme === 'dark' ? 'dark' : 'light'} text-${theme === 'dark' ? 'light' : 'dark'}`}>
            <div className="card-header bg-primary text-white text-center py-4">
              <FaUser className="mb-2" size={48} />
              <h2 className="mb-0">User Dashboard</h2>
            </div>
            
            <div className="card-body p-4">
              <div className="row g-3">
                {/* Name */}
                <div className="col-12">
                  <div className="d-flex align-items-center mb-3">
                    <FaUser className="text-primary me-3" />
                    <div>
                      <small className="text-muted">Name</small>
                      <h5 className="mb-0">{user.name}</h5>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="col-12">
                  <div className="d-flex align-items-center mb-3">
                    <FaEnvelope className="text-primary me-3" />
                    <div>
                      <small className="text-muted">Email</small>
                      <h6 className="mb-0">{user.email}</h6>
                      {user.emailVerified ? (
                        <small className="text-success">✓ Verified</small>
                      ) : (
                        <small className="text-warning">⚠ Not verified</small>
                      )}
                    </div>
                  </div>
                </div>

                {/* Role */}
                <div className="col-12">
                  <div className="d-flex align-items-center mb-3">
                    <FaShieldAlt className="text-primary me-3" />
                    <div>
                      <small className="text-muted">Role</small>
                      <h6 className="mb-0">
                        <span className={`badge bg-${user.role === 'admin' ? 'danger' : 'info'}`}>
                          {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
                        </span>
                      </h6>
                    </div>
                  </div>
                </div>

                {/* Join Date */}
                <div className="col-12">
                  <div className="d-flex align-items-center mb-3">
                    <FaCalendar className="text-primary me-3" />
                    <div>
                      <small className="text-muted">Member Since</small>
                      <h6 className="mb-0">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </h6>
                    </div>
                  </div>
                </div>

                {/* Last Login */}
                {user.lastLogin && (
                  <div className="col-12">
                    <div className="d-flex align-items-center mb-3">
                      <FaCalendar className="text-primary me-3" />
                      <div>
                        <small className="text-muted">Last Login</small>
                        <h6 className="mb-0">
                          {new Date(user.lastLogin).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </h6>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="card-footer text-center py-3">
              <button 
                onClick={handleLogout}
                className="btn btn-outline-danger d-flex align-items-center justify-content-center gap-2 mx-auto"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
