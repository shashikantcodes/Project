import React from "react";
import { useNavigate } from "react-router-dom";


const DashboardHome = () => {
    const userName = "godhand"; // Replace with dynamic data later if needed
    const navigate = useNavigate();

    return (
        <article className="py-5 px-3 bg-light text-dark dark:bg-black dark:text-white min-vh-100">
            <div className="container">
                {/* Welcome Section */}
                <section className="mb-5">
                    <h2 className="fw-bold">Welcome back, {userName}! 👋</h2>
                    <p className="text-muted fs-5">
                        Here’s what you can do with <strong>Quick Desk AI</strong> today.
                    </p>
                </section>

                {/* Quick Actions */}
                <section className="row g-4 mb-5">
                    <div className="col-md-4">
                        <button
                            className="btn btn-primary w-100 py-3 rounded-3 shadow-sm"
                            onClick={() => navigate("/notes")}
                        >
                            📝 Add Note
                        </button>
                    </div>

                    <div className="col-md-4">
                        <button className="btn btn-success w-100 py-3 rounded-3 shadow-sm">
                            ✅ Create Task
                        </button>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-warning w-100 py-3 rounded-3 shadow-sm text-dark">
                            📊 Generate Report
                        </button>
                    </div>
                </section>

                {/* AI Assistant */}
                <section className="card bg-white dark:bg-dark border-0 shadow-sm mb-5">
                    <div className="card-body">
                        <h5 className="card-title fw-semibold">🤖 Your AI Assistant</h5>
                        <p className="card-text">
                            “You have 3 pending tasks today. Would you like to start with your top priority?”
                        </p>
                        <button className="btn btn-outline-primary">Open Assistant</button>
                    </div>
                </section>

                {/* Recent Activity */}
                <section className="card bg-white dark:bg-dark border-0 shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title fw-semibold">🕒 Recent Activity</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item bg-transparent">🗂️ Project X updated 1 hour ago</li>
                            <li className="list-group-item bg-transparent">✅ Task “Design Dashboard” marked complete</li>
                            <li className="list-group-item bg-transparent">📩 AI Summary Report generated</li>
                        </ul>
                    </div>
                </section>
            </div>
        </article>
    );
};

export default DashboardHome;
