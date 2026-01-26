import React from "react";

const RideList = ({ rides = [] }) => {
  if (rides.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "#555" }}>
        <h3>No rides found 🚗</h3>
        <p>Once passengers book your rides, they’ll appear here.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Your Bookings</h2>
      {rides.map((ride, index) => (
        <div
          key={index}
          style={{
            background: "#fff",
            margin: "10px 0",
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3>{ride.destination}</h3>
          <p>Date: {ride.date}</p>
          <p>Pickup: {ride.pickupLocation}</p>
          <p>Drop: {ride.dropLocation}</p>
          <p>Fare: ₹{ride.fare}</p>
        </div>
      ))}
    </div>
  );
};

export default RideList; // ✅ this fixes your error
