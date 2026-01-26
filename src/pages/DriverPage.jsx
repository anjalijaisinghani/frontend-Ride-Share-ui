import React, { useState } from "react";
import Swal from "sweetalert2";

const DriverPage = () => {
  const [ride, setRide] = useState({
    source: "",
    destination: "",
    date: "",
    price: "",
    vehicleType: "",
    driverName: "",
    driverRating: "",
    availableSeats: "",
  });

  // ✅ Handle input change
  const handleChange = (e) => {
    setRide({ ...ride, [e.target.name]: e.target.value });
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!ride.source || !ride.destination || !ride.date || !ride.availableSeats) {
      Swal.fire("Oops!", "Please fill all required fields!", "warning");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/v1/rides/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ride),
      });

      if (response.ok) {
        const data = await response.json();
        Swal.fire("Success!", "Ride posted successfully!", "success");

        // Reset form
        setRide({
          source: "",
          destination: "",
          date: "",
          price: "",
          vehicleType: "",
          driverName: "",
          driverRating: "",
          availableSeats: "",
        });
      } else {
        Swal.fire("Error", "Failed to post ride!", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong while posting ride!", "error");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Post a New Ride</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Source:</label>
          <input
            type="text"
            name="source"
            value={ride.source}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Destination:</label>
          <input
            type="text"
            name="destination"
            value={ride.destination}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={ride.date}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Price (₹):</label>
          <input
            type="number"
            name="price"
            value={ride.price}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Vehicle Type:</label>
          <input
            type="text"
            name="vehicleType"
            value={ride.vehicleType}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Driver Name:</label>
          <input
            type="text"
            name="driverName"
            value={ride.driverName}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Driver Rating:</label>
          <input
            type="number"
            name="driverRating"
            step="0.1"
            value={ride.driverRating}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Available Seats:</label>
          <input
            type="number"
            name="availableSeats"
            value={ride.availableSeats}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <button type="submit" style={styles.button}>
          Post Ride
        </button>
      </form>
    </div>
  );
};

// 💅 Simple inline CSS styles
const styles = {
  container: {
    padding: "30px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    fontSize: "28px",
    color: "#333",
    marginBottom: "25px",
  },
  form: {
    maxWidth: "600px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default DriverPage;
