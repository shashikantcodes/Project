import React from 'react';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../index.css'; // Tailwind styles

const Home = () => {
  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-br from-blue-50 to-white min-h-screen flex items-center">
        <div className="container py-5">
          <div className="row align-items-center">
            {/* Left Content */}
            <div className="col-md-6 text-center text-md-start mb-5 mb-md-0">
              <h1 className="display-4 fw-bold text-gray-800 animate-fadeInDown">
                Automate Sales.<br />Close Faster.
              </h1>
              <p className="lead mt-3 text-gray-600 animate-fadeInUp">
                Meet your AI-powered CRM copilot. Score leads, send follow-ups, and boost conversions – all from one smart dashboard.
              </p>
              <div className="d-flex justify-content-center justify-content-md-start">
                <a href="/dashboard" className="btn btn-primary btn-lg mt-4 shadow animate-fadeInUp">
                  🚀 Get Started
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="col-md-6 text-center">
              <img
                src="https://cdn.dribbble.com/users/32512/screenshots/17054890/media/bf62c3d9fc00f5c4b88828eae1df1b8e.png?compress=1&resize=768x576"
                alt="CRM Illustration"
                className="img-fluid rounded shadow-lg animate-fadeIn"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
