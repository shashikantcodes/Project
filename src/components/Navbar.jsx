import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Navbar.css';
import { FaSearch, FaSignInAlt, FaPalette } from 'react-icons/fa';

const themes = [
  { id: 'classic-light', label: 'Classic Light' },
  { id: 'classic-dark', label: 'Classic Dark' },
  { id: 'classic-blue', label: 'Classic Blue' },
  { id: 'anim-glow', label: 'Animated Glow' },
  { id: 'anim-slide', label: 'Animated Slide' },
  { id: 'anim-fade', label: 'Animated Fade' },
];

const Navbar = () => {
  const [theme, setTheme] = useState('classic-light');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(theme);
  }, [theme]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      alert(`Searching for: ${searchQuery}`);
      // Example: window.location.href = `/search?q=${searchQuery}`;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark shadow-sm sticky-top" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="/">🔍 QuickDesk</a>

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
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="dashboardDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dashboard
              </a>
              <ul className="dropdown-menu" aria-labelledby="dashboardDropdown">
                <li><a className="dropdown-item" href="/dashboard/overview">Overview</a></li>
                <li><a className="dropdown-item" href="/dashboard/stats">Stats</a></li>
                <li><a className="dropdown-item" href="/dashboard/reports">Reports</a></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="featuresDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Features
              </a>
              <ul className="dropdown-menu" aria-labelledby="featuresDropdown">
                <li><a className="dropdown-item" href="/features/ai">AI Tools</a></li>
                <li><a className="dropdown-item" href="/features/integrations">Integrations</a></li>
                <li><a className="dropdown-item" href="/features/automation">Automation</a></li>
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/contact">Contact</a>
            </li>

            <li className="nav-item ms-lg-3">
              <a className="btn btn-light btn-sm fw-bold d-flex align-items-center gap-1" href="/login">
                <FaSignInAlt /> Login
              </a>
            </li>
          </ul>

          <form className="d-flex me-2" role="search" onSubmit={handleSearch}>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
