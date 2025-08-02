// pages/Home.jsx
import React from 'react';
import './Home.css'; // optional custom styles

function Home() {
  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Quick Desk AI</h1>
        <p className="lead text-muted">Supercharge your productivity with AI-powered automation, insights, and collaboration — built for Odoo workflows.</p>
        <a href="/signup" className="btn btn-primary btn-lg mt-3">Get Started</a>
      </div>

      {/* Features Teaser */}
      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <h5>⚡ AI Tools</h5>
          <p>Generate content, analyze data, and make smart decisions faster with AI models.</p>
        </div>
        <div className="col-md-4 mb-4">
          <h5>🔗 Integrations</h5>
          <p>Seamlessly integrate with Odoo modules, Google, Notion, Slack, and more.</p>
        </div>
        <div className="col-md-4 mb-4">
          <h5>🤖 Automation</h5>
          <p>Automate reports, emails, task creation and routine workflows with zero code.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
