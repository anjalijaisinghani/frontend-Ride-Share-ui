import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const RideForm = () => {
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

  const handleChange = (e) => {
    setRide({ ...ride, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/v1/rides/add", ride);
      Swal.fire({
        icon: "success",
        title: "Ride Posted Successfully!",
        text: "Your ride is now visible to passengers.",
        confirmButtonColor: "#3085d6",
      });
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
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Post Ride",
        text: "Please check your input or server connection.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">Post a Ride</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {["source", "destination", "vehicleType", "driverName"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={ride[field]}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
        ))}

        <input type="date" name="date" value={ride.date} onChange={handleChange} required className="border p-2 rounded" />
        <input type="number" name="price" placeholder="Price" value={ride.price} onChange={handleChange} required className="border p-2 rounded" />
        <input type="number" name="driverRating" placeholder="Driver Rating (1-5)" value={ride.driverRating} onChange={handleChange} className="border p-2 rounded" />
        <input type="number" name="availableSeats" placeholder="Available Seats" value={ride.availableSeats} onChange={handleChange} required className="border p-2 rounded" />

        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Post Ride
        </button>
      </form>
    </div>
  );
};

export default RideForm;
