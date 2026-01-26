import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import "./PassengerDashboard.css";

const PassengerDashboard = () => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/rides")
      .then((response) => setRides(response.data))
      .catch(() => setRides([]));
  }, []);

  return (
    <div className="passenger-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">SafeRide</h2>
        <nav className="menu">
          <Link to="/passenger-dashboard" className="active">
            Dashboard
          </Link>
          <Link to="/search">Search Ride</Link>
          <Link to="/bookings">My Bookings</Link>
          <Link to="/" className="logout">
            Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="heading">Available Rides</h1>

        <div className="rides-grid">
          {rides.length > 0 ? (
            rides.map((ride) => (
              <div className="ride-card" key={ride.id}>
                <div className="ride-header">
                  <h3>
                    {ride.pickup} <span className="arrow">→</span>{" "}
                    {ride.destination}
                  </h3>
                  <span className="ride-date">{ride.date}</span>
                </div>
                <p>
                  <strong>Driver:</strong> {ride.driver_name}
                </p>
                <p>
                  <strong>Fare:</strong> ₹{ride.fare_per_km}/km
                </p>
                <button className="book-btn">Book Ride</button>
              </div>
            ))
          ) : (
            <p className="no-rides">No rides available at the moment.</p>
          )}
        </div>
      </main>

      <Outlet />
    </div>
  );
};

export default PassengerDashboard;
