



import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // ✅ for redirect
import "./SearchRide.css"; // custom CSS

const SearchRide = () => {
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    date: "",
  });
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate(); // ✅ navigation hook

  const passengerId = 1; // TEMP: replace with real passenger later
  const passengerName = "Anjali"; // ✅ Added for DB storage
  const passengerEmail = "anjalijaisinghani42@gmail.com"; // ✅ Added for DB storage

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    Swal.fire({
      title: "Logout Confirmation",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userRole");
        Swal.fire("Logged Out!", "You have been logged out successfully.", "success").then(() => {
          navigate("/login"); // ✅ redirect to login page
        });
      }
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/v1/rides/search?source=${formData.source}&destination=${formData.destination}&date=${formData.date}`
      );
      const data = await response.json();
      setRides(data);
    } catch (error) {
      console.error("Error fetching rides:", error);
      Swal.fire("Error", "Something went wrong while fetching rides.", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED FUNCTION — Added passengerName & passengerEmail
  const handleBookRide = async (ride) => {
    if (userRole === "driver") {
      Swal.fire({
        title: "Access Denied 🚫",
        text: "Drivers cannot book rides.",
        icon: "warning",
        confirmButtonColor: "#d33",
      });
      return;
    }

    const { value: seats } = await Swal.fire({
      title: `Book Ride: ${ride.source} → ${ride.destination}`,
      input: "number",
      inputLabel: `Available Seats: ${ride.availableSeats}`,
      inputAttributes: {
        min: 1,
        max: ride.availableSeats,
        step: 1,
      },
      inputValue: 1,
      showCancelButton: true,
      confirmButtonText: "Confirm Booking",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
    });

    if (seats) {
      try {
        // ✅ Added passengerName & passengerEmail in query params
        const response = await fetch(
          `http://localhost:8080/v1/rides/book?rideId=${ride.id}&passengerId=${passengerId}&seatsBooked=${seats}&passengerName=${encodeURIComponent(
            passengerName
          )}&passengerEmail=${encodeURIComponent(passengerEmail)}`,
          { method: "POST" }
        );
        const data = await response.text();
        Swal.fire("✅ Success", data, "success");
      } catch (error) {
        console.error("Booking error:", error);
        Swal.fire("Error", "❌ Something went wrong!", "error");
      }
    }
  };

  return (
    <div className="searchride-container">
      {/* ✅ Logout Button (visible only for passenger) */}
      {userRole === "passenger" && (
        <div style={{ textAlign: "right", padding: "20px 40px" }}>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#ff4b4b",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 0 10px rgba(255,75,75,0.5)",
              transition: "0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "#e63939")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "#ff4b4b")
            }
          >
            Logout
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero">
        <h2>Find Affordable Rides Easily</h2>
        <p>Search and book verified rides anywhere, anytime.</p>
      </section>

      {/* Search Form */}
      <section className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <label>Source</label>
            <input
              type="text"
              name="source"
              placeholder="Enter source"
              value={formData.source}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Destination</label>
            <input
              type="text"
              name="destination"
              placeholder="Enter destination"
              value={formData.destination}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="search-btn">
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </section>

      {/* Ride Results */}
      <section className="results">
        {rides.length === 0 && !loading ? (
          <p className="no-results">No rides found yet. Try searching above!</p>
        ) : (
          <div className="ride-list">
            {rides.map((ride) => (
              <div className="ride-card" key={ride.id}>
                <div className="ride-info">
                  <h3>
                    {ride.source} → {ride.destination}
                  </h3>
                  <p>📅 {ride.date}</p>
                  <p>🚗 {ride.vehicleType}</p>
                  <p>👤 {ride.driverName}</p>
                </div>
                <div className="ride-action">
                  <span className="seats">{ride.availableSeats} Seats</span>

                  <button
                    className="book-btn"
                    onClick={() => handleBookRide(ride)}
                    disabled={userRole === "driver"}
                    style={{
                      opacity: userRole === "driver" ? 0.6 : 1,
                      cursor: userRole === "driver" ? "not-allowed" : "pointer",
                    }}
                  >
                    {userRole === "driver" ? "Not Allowed" : "Book"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} RideFinder. All rights reserved.
      </footer>
    </div>
  );
};

export default SearchRide;


// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import "./SearchRide.css";

// const SearchRide = () => {
//   const [formData, setFormData] = useState({
//     source: "",
//     destination: "",
//     date: "",
//   });
//   const [rides, setRides] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [userRole, setUserRole] = useState("");
//   const navigate = useNavigate();

//   const passengerId = 1; // TEMP: replace with real passenger later
//   const passengerName = "Anjali"; // ✅ Added for DB storage
//   const passengerEmail = "anjalijaisinghani42@gmail.com"; // ✅ Added for DB storage

//   useEffect(() => {
//     const role = localStorage.getItem("userRole");
//     setUserRole(role);
//   }, []);

//   // ✅ Logout function
//   const handleLogout = () => {
//     Swal.fire({
//       title: "Logout Confirmation",
//       text: "Are you sure you want to logout?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Logout",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("userRole");
//         Swal.fire(
//           "Logged Out!",
//           "You have been logged out successfully.",
//           "success"
//         ).then(() => {
//           navigate("/login");
//         });
//       }
//     });
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ FIXED handleSearch FUNCTION
//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch(
//         `http://localhost:8080/v1/rides/search?source=${formData.source}&destination=${formData.destination}&date=${formData.date}`
//       );

//       const contentType = response.headers.get("content-type");
//       let data;

//       if (contentType && contentType.includes("application/json")) {
//         data = await response.json();
//       } else {
//         data = [];
//       }

//       console.log("Fetched data:", data);

//       // ✅ Ensure rides is always an array
//       if (Array.isArray(data)) {
//         setRides(data);
//       } else if (data && Array.isArray(data.rides)) {
//         setRides(data.rides);
//       } else {
//         setRides([]);
//       }
//     } catch (error) {
//       console.error("Error fetching rides:", error);
//       Swal.fire("Error", "Something went wrong while fetching rides.", "error");
//       setRides([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ FIXED FUNCTION — Added passengerName & passengerEmail
//   const handleBookRide = async (ride) => {
//     if (userRole === "driver") {
//       Swal.fire({
//         title: "Access Denied 🚫",
//         text: "Drivers cannot book rides.",
//         icon: "warning",
//         confirmButtonColor: "#d33",
//       });
//       return;
//     }

//     const { value: seats } = await Swal.fire({
//       title: `Book Ride: ${ride.source} → ${ride.destination}`,
//       input: "number",
//       inputLabel: `Available Seats: ${ride.availableSeats}`,
//       inputAttributes: {
//         min: 1,
//         max: ride.availableSeats,
//         step: 1,
//       },
//       inputValue: 1,
//       showCancelButton: true,
//       confirmButtonText: "Confirm Booking",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#2563eb",
//       cancelButtonColor: "#6b7280",
//     });

//     if (seats) {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/v1/rides/book?rideId=${ride.id}&passengerId=${passengerId}&seatsBooked=${seats}&passengerName=${encodeURIComponent(
//             passengerName
//           )}&passengerEmail=${encodeURIComponent(passengerEmail)}`,
//           { method: "POST" }
//         );

//         const data = await response.text();
//         Swal.fire("✅ Success", data, "success");
//       } catch (error) {
//         console.error("Booking error:", error);
//         Swal.fire("Error", "❌ Something went wrong!", "error");
//       }
//     }
//   };

//   return (
//     <div className="searchride-container">
//       {/* ✅ Logout Button (visible only for passenger) */}
//       {userRole === "passenger" && (
//         <div style={{ textAlign: "right", padding: "20px 40px" }}>
//           <button
//             onClick={handleLogout}
//             style={{
//               backgroundColor: "#ff4b4b",
//               color: "white",
//               border: "none",
//               padding: "8px 16px",
//               borderRadius: "8px",
//               cursor: "pointer",
//               fontWeight: "bold",
//               boxShadow: "0 0 10px rgba(255,75,75,0.5)",
//               transition: "0.3s ease",
//             }}
//             onMouseOver={(e) => (e.target.style.backgroundColor = "#e63939")}
//             onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4b4b")}
//           >
//             Logout
//           </button>
//         </div>
//       )}

//       {/* Hero Section */}
//       <section className="hero">
//         <h2>Find Affordable Rides Easily</h2>
//         <p>Search and book verified rides anywhere, anytime.</p>
//       </section>

//       {/* Search Form */}
//       <section className="search-section">
//         <form onSubmit={handleSearch} className="search-form">
//           <div className="form-group">
//             <label>Source</label>
//             <input
//               type="text"
//               name="source"
//               placeholder="Enter source"
//               value={formData.source}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Destination</label>
//             <input
//               type="text"
//               name="destination"
//               placeholder="Enter destination"
//               value={formData.destination}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Date</label>
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit" className="search-btn">
//             {loading ? "Searching..." : "Search"}
//           </button>
//         </form>
//       </section>

//       {/* Ride Results */}
//       <section className="results">
//         {(!Array.isArray(rides) || rides.length === 0) && !loading ? (
//           <p className="no-results">No rides found yet. Try searching above!</p>
//         ) : (
//           <div className="ride-list">
//             {Array.isArray(rides) &&
//               rides.map((ride) => (
//                 <div className="ride-card" key={ride.id}>
//                   <div className="ride-info">
//                     <h3>
//                       {ride.source} → {ride.destination}
//                     </h3>
//                     <p>📅 {ride.date}</p>
//                     <p>🚗 {ride.vehicleType}</p>
//                     <p>👤 {ride.driverName}</p>
//                   </div>
//                   <div className="ride-action">
//                     <span className="seats">{ride.availableSeats} Seats</span>
//                     <button
//                       className="book-btn"
//                       onClick={() => handleBookRide(ride)}
//                       disabled={userRole === "driver"}
//                       style={{
//                         opacity: userRole === "driver" ? 0.6 : 1,
//                         cursor:
//                           userRole === "driver" ? "not-allowed" : "pointer",
//                       }}
//                     >
//                       {userRole === "driver" ? "Not Allowed" : "Book"}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         )}
//       </section>

//       {/* Footer */}
//       <footer className="footer">
//         © {new Date().getFullYear()} RideFinder. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default SearchRide;
