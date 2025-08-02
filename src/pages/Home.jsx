import React from 'react';
import Navbar from '../components/Navbar';
// import '../styles/home.css'; // optional

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h1>Welcome to Waste Reporter</h1>
                <p>This app helps users report and manage waste smartly using AI and automation.</p>
                <h2>godhand</h2>
            </div>
        </div>
    );
};

export default Home;