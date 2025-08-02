import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Navbar.css';
import { FaSearch, FaSignInAlt, FaPalette } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const themes = [
  { id: 'classic-light', label: 'Classic Light' },
  { id: 'classic-dark', label: 'Classic Dark' },
  { id: 'classic-blue', label: 'Classic Blue' },
  { id: 'anim-glow', label: 'Animated Glow' },
  { id: 'anim-slide', label: 'Animated Slide' },
  { id: 'anim-fade', label: 'Animated Fade' },
];

const Navbar = () => {
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

  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark shadow-sm sticky-top" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">🔍 QuickDesk</Link>

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
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>

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

            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="featuresDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Features
              </Link>
              <ul className="dropdown-menu" aria-labelledby="featuresDropdown">
                <li><Link className="dropdown-item" to="/features/ai">AI Tools</Link></li>
                <li><Link className="dropdown-item" to="/features/integrations">Integrations</Link></li>
                <li><Link className="dropdown-item" to="/features/automation">Automation</Link></li>
              </ul>
            </li>

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

            <Link className="btn btn-light btn-sm fw-bold d-flex align-items-center gap-1" to="/login">
              <FaSignInAlt /> Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
