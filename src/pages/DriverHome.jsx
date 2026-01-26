import React from "react";
import { Link } from "react-router-dom";
import "./PageStyles.css";

const DriverHome = () => {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Driver Dashboard</h1>
        <nav>
          <Link to="/post-ride" className="nav-link">Post a Ride</Link>
          <Link to="/my-rides" className="nav-link">My Rides</Link>
          <Link to="/" className="nav-link">Logout</Link>
        </nav>
      </header>

      <main className="page-content">
        <h2>Welcome, Driver!</h2>
        <p>Here you can post rides and manage your existing ones.</p>
        <div className="card-container">
          <div className="info-card">
            <h3>Post New Ride</h3>
            <p>Share your ride details to connect with passengers.</p>
            <Link to="/post-ride" className="btn">Post Ride</Link>
          </div>

          <div className="info-card">
            <h3>View My Rides</h3>
            <p>Check your active and past rides.</p>
            <Link to="/my-rides" className="btn">View Rides</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DriverHome;
