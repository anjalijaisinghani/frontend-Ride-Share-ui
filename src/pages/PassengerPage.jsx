import React, { useState } from "react";
import Swal from "sweetalert2";

const PassengerPage = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [rides, setRides] = useState([]);

  // ✅ Fetch rides from backend
  const searchRides = async () => {
    if (!source || !destination) {
      Swal.fire("Oops!", "Please enter both source and destination!", "warning");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/rides/search?source=${source}&destination=${destination}&date=${date}`
      );
      if (!response.ok) throw new Error("Failed to fetch rides");
      const data = await response.json();
      setRides(data);
    } catch (error) {
      Swal.fire("Error", "Failed to search rides!", "error");
    }
  };

  // ✅ Book a ride
  const bookRide = async (rideId) => {
    const passengerId = 1; // ⚠️ Replace with logged-in passenger ID
    const { value: seats } = await Swal.fire({
      title: "Enter seats to book",
      input: "number",
      inputLabel: "How many seats would you like to book?",
      inputAttributes: { min: 1 },
      showCancelButton: true,
      confirmButtonText: "Book Ride",
    });

    if (!seats) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/bookings/book?rideId=${rideId}&passengerId=${passengerId}&seatsBooked=${seats}`,
        { method: "POST" }
      );
      const message = await res.text();

      if (res.ok) {
        Swal.fire("Success", message, "success");
        searchRides(); // Refresh ride list
      } else {
        Swal.fire("Booking Failed", message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Could not complete booking!", "error");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Find a Ride</h1>
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={styles.input}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
        />
        <button onClick={searchRides} style={styles.button}>
          Search
        </button>
      </div>

      {/* Ride Results */}
      {rides.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Source</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Time</th>
              <th>Available Seats</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((ride) => (
              <tr key={ride.id}>
                <td>{ride.source}</td>
                <td>{ride.destination}</td>
                <td>{ride.date}</td>
                <td>{ride.time}</td>
                <td>{ride.availableSeats}</td>
                <td>
                  <button
                    style={styles.bookButton}
                    onClick={() => bookRide(ride.id)}
                    disabled={ride.availableSeats <= 0}
                  >
                    {ride.availableSeats > 0 ? "Book Ride" : "Full"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ marginTop: "20px" }}>No rides found. Try searching!</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  heading: {
    color: "#333",
    fontSize: "28px",
    marginBottom: "20px",
  },
  searchBox: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "10px 20px",
    cursor: "pointer",
  },
  table: {
    width: "80%",
    margin: "auto",
    borderCollapse: "collapse",
  },
  bookButton: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "5px 12px",
    cursor: "pointer",
  },
};

export default PassengerPage;
