import React from "react";
import "./PassengerRideList.css"; // optional: create this for styling

export default function PassengerRideList({ rides }) {
  if (!rides || rides.length === 0) {
    return <p>No rides available at the moment.</p>;
  }

  return (
    <div className="passenger-ride-list">
      {rides.map((ride, index) => (
        <div className="ride-card" key={index}>
          <div className="ride-header">
            <h3>{ride.driverName}</h3>
            <span className="fare">₹{ride.farePerKm}/km</span>
          </div>

          <div className="ride-info">
            <p>
              <strong>From:</strong> {ride.pickupLocation}
            </p>
            <p>
              <strong>To:</strong> {ride.destination}
            </p>
            <p>
              <strong>Date:</strong> {ride.date}
            </p>
            <p>
              <strong>Seats Available:</strong> {ride.availableSeats}
            </p>
          </div>

          <button className="book-btn">Book Ride</button>
        </div>
      ))}
    </div>
  );
}
