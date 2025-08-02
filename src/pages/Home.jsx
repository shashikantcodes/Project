// pages/Home.jsx
import React from 'react';
import './Home.css'; // optional custom styles
import Heroes from '../components/heroes/Heroes';
import FeaturedTeaser from '../content/FeaturedTeaser';
import ProblemSolving from '../content/ProblemSolving';
// import DashboardHome from './dashboardHome/DashboardHome';

function Home() {
  return (
    <main>
      <div className="container py-5">

        <Heroes />
        <FeaturedTeaser />

        <ProblemSolving />
        {/* <DashboardHome /> */}
      </div>
    </main>
  );
}

export default Home;
