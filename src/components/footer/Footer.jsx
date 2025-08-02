import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-section py-4 mt-5 border-top">
      <div className="container text-center text-md-start">
        <div className="row">
          {/* About */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">QuickDesk</h5>
            <p className="small">
              Your all-in-one productivity dashboard for managing tasks, exploring tools, and staying organized with smart integrations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-decoration-none">Home</Link></li>
              <li><Link to="/dashboard-home" className="text-decoration-none">Dashboard</Link>  </li>
              <li><Link to="#" className="text-decoration-none">AI Tools</Link></li>
              <li><Link to="#" className="text-decoration-none">Contact</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Follow Us</h6>
            <div className="d-flex gap-3 justify-content-md-start justify-content-center">
              <Link to="https://facebook.com" target="_blank" rel="noreferrer" className="text-reset"><FaFacebook /></Link>
              <Link to="https://twitter.com" target="_blank" rel="noreferrer" className="text-reset"><FaTwitter /></Link>
              <Link to="https://linkedin.com" target="_blank" rel="noreferrer" className="text-reset"><FaLinkedin /></Link>
              <Link to="https://instagram.com" target="_blank" rel="noreferrer" className="text-reset"><FaInstagram /></Link>
            </div>
          </div>
        </div>

        <hr className="my-3" />
        <p className="text-center small mb-0">&copy; {new Date().getFullYear()} QuickDesk. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
