import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

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
              <li><a href="/" className="text-decoration-none">Home</a></li>
              <li><a href="/dashboard/overview" className="text-decoration-none">Dashboard</a></li>
              <li><a href="/features/ai" className="text-decoration-none">AI Tools</a></li>
              <li><a href="/contact" className="text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Follow Us</h6>
            <div className="d-flex gap-3 justify-content-md-start justify-content-center">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-reset"><FaFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-reset"><FaTwitter /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-reset"><FaLinkedin /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-reset"><FaInstagram /></a>
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
