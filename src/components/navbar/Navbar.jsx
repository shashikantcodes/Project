import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FaSearch, FaSignInAlt, FaPalette, FaUser, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const themes = [
  { id: 'classic-light', label: 'Classic Light' },
  { id: 'classic-dark', label: 'Classic Dark' },
  { id: 'classic-blue', label: 'Classic Blue' },
  { id: 'anim-glow', label: 'Animated Glow' },
  { id: 'anim-slide', label: 'Animated Slide' },
  { id: 'anim-fade', label: 'Animated Fade' },
];

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('selectedTheme') || 'anim-fade';
  });

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(theme);
    localStorage.setItem('selectedTheme', theme);
  }, [theme]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      alert(`Searching for: ${searchQuery}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top theme-bg">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          Project
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

<<<<<<< HEAD
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="dashboardDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dashboard
              </Link>
              <ul className="dropdown-menu" aria-labelledby="dashboardDropdown">
                <li><Link className="dropdown-item" to="/notes">Notes</Link></li>
                <li><Link className="dropdown-item" to="/create-task">Create Task</Link></li>
                <li><Link className="dropdown-item" to="/generate-report">Generate Report</Link></li>
                <li><Link className="dropdown-item" to="/reminders">Reminders</Link></li>
              </ul>
            </li>
=======
            {isAuthenticated && (
              <>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="dashboardDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dashboard
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="dashboardDropdown">
                    <li><Link className="dropdown-item" to="/dashboard">My Dashboard</Link></li>
                    <li><Link className="dropdown-item" to="/dashboard-home">Dashboard Home</Link></li>
                    <li><Link className="dropdown-item" to="/notes">Notes</Link></li>
                    <li><Link className="dropdown-item" to="/reminders">Reminders</Link></li>
                    <li><Link className="dropdown-item" to="/create-task">Create Task</Link></li>
                    <li><Link className="dropdown-item" to="/generate-report">Generate Report</Link></li>
                  </ul>
                </li>
>>>>>>> e5e554ead1fbc55a53cfb6a72e120c334ced6e87

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="featuresDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Features
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="featuresDropdown">
                    <li><Link className="dropdown-item" to="/features/ai">AI Tools</Link></li>
                    <li><Link className="dropdown-item" to="/features/integrations">Integrations</Link></li>
                    <li><Link className="dropdown-item" to="/features/automation">Automation</Link></li>
                  </ul>
                </li>
              </>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>

          <form className="d-flex me-3" role="search" onSubmit={handleSearch}>
            <input
              className="form-control form-control-sm me-1"
              type="search"
              placeholder="Search anything..."
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-light btn-sm d-flex align-items-center gap-1" type="submit">
              <FaSearch /> Go
            </button>
          </form>

          <div className="d-flex align-items-center gap-2">
            <div className="d-flex align-items-center gap-1">
              <FaPalette className="text-white me-1" />
              <select
                className="form-select form-select-sm w-auto"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                {themes.map((t) => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>

            {isAuthenticated ? (
              <div className="dropdown">
                <button
                  className="btn btn-light btn-sm dropdown-toggle d-flex align-items-center gap-1"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUser />
                  {user?.name || 'User'}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <h6 className="dropdown-header">
                      {user?.name}
                      <br />
                      <small className="text-muted">{user?.email}</small>
                    </h6>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center gap-2" to="/dashboard">
                      <FaUser /> Dashboard
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item d-flex align-items-center gap-2 text-danger"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link className="btn btn-outline-light btn-sm d-flex align-items-center gap-1" to="/login">
                  <FaSignInAlt /> Login
                </Link>
                <Link className="btn btn-light btn-sm d-flex align-items-center gap-1" to="/signup">
                  <FaUserPlus /> Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
