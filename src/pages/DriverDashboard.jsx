


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import PostRide from "../components/PostRide";
// import RideList from "../components/RideList"; // can be used later for bookings

// export default function DriverDashboard() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("dashboard");

//   const driverEmail = localStorage.getItem("driverEmail");

//   // Redirect to login if not logged in
//   useEffect(() => {
//     if (!driverEmail) navigate("/login");
//   }, [driverEmail, navigate]);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="driver-dashboard">
//       {/* Left Navigation */}
//       <aside className="sidebar">
//         <h2 className="sidebar-title">🚘 Driver Panel</h2>
//         <ul className="menu">
//           <li
//             className={activeTab === "dashboard" ? "active" : ""}
//             onClick={() => setActiveTab("dashboard")}
//           >
//             🏠 Dashboard
//           </li>
//           <li
//             className={activeTab === "postRide" ? "active" : ""}
//             onClick={() => setActiveTab("postRide")}
//           >
//             📝 Post Ride
//           </li>
//           <li
//             className={activeTab === "bookings" ? "active" : ""}
//             onClick={() => setActiveTab("bookings")}
//           >
//             📦 Bookings
//           </li>
//           <li onClick={handleLogout} className="logout">
//             🔒 Logout
//           </li>
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <main className="dashboard-content">
//         {activeTab === "dashboard" && (
//           <div className="welcome-section">
//             <h1>Welcome to your Driver Dashboard 🚗</h1>
//             <p>
//               Hello <strong>{driverEmail}</strong> 👋  
//               <br />
//               Use the sidebar to post a new ride or view your bookings.
//             </p>
//           </div>
//         )}

//         {activeTab === "postRide" && <PostRide driverEmail={driverEmail} />}
//         {activeTab === "bookings" && <RideList />}
//       </main>

//       {/* ---------- STYLING ---------- */}
//       <style>{`
//         .driver-dashboard {
//           display: flex;
//           height: 100vh;
//           background: #f5f9ff;
//         }

//         .sidebar {
//           width: 230px;
//           background: #0a1931;
//           color: #fff;
//           display: flex;
//           flex-direction: column;
//           padding: 20px 0;
//         }

//         .sidebar-title {
//           text-align: center;
//           font-size: 1.4rem;
//           margin-bottom: 25px;
//           color: #00eaff;
//         }

//         .menu {
//           list-style: none;
//           padding: 0;
//         }

//         .menu li {
//           padding: 14px 20px;
//           cursor: pointer;
//           font-size: 1rem;
//           transition: 0.3s;
//         }

//         .menu li:hover {
//           background: #12264d;
//         }

//         .menu li.active {
//           background: #00bcd4;
//           color: #fff;
//         }

//         .logout {
//           margin-top: auto;
//           background: #e63946;
//           text-align: center;
//           font-weight: bold;
//         }

//         .logout:hover {
//           background: #c92a3a;
//         }

//         .dashboard-content {
//           flex: 1;
//           padding: 30px;
//           overflow-y: auto;
//         }

//         .welcome-section {
//           background: #ffffff;
//           padding: 30px;
//           border-radius: 10px;
//           box-shadow: 0 0 10px rgba(0,0,0,0.1);
//         }
//       `}</style>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostRide from "../components/PostRide";
import RideList from "../components/RideList"; // can be used later for bookings

export default function DriverDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const driverEmail = localStorage.getItem("driverEmail");

  // Redirect to login if not logged in
  useEffect(() => {
    if (!driverEmail) navigate("/login");
  }, [driverEmail, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="driver-dashboard">
      {/* Left Navigation */}
      <aside className="sidebar">
        <h2 className="sidebar-title">🚘 Driver Panel</h2>
        <ul className="menu">
          <li
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => setActiveTab("dashboard")}
          >
            🏠 Dashboard
          </li>
          <li
            className={activeTab === "postRide" ? "active" : ""}
            onClick={() => setActiveTab("postRide")}
          >
            📝 Post Ride
          </li>
          <li
            className={activeTab === "bookings" ? "active" : ""}
            onClick={() => setActiveTab("bookings")}
          >
            📦 Bookings
          </li>
          <li onClick={handleLogout} className="logout">
            🔒 Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        {activeTab === "dashboard" && (
          <div className="welcome-section">
            <h1>Welcome to your Driver Dashboard 🚗</h1>
            <p>
              Hello <strong>{driverEmail}</strong> 👋  
              <br />
              Use the sidebar to post a new ride or view your bookings.
            </p>
          </div>
        )}

        {activeTab === "postRide" && <PostRide driverEmail={driverEmail} />}
        {activeTab === "bookings" && <RideList />}
      </main>

      {/* ---------- STYLING ---------- */}
      <style>{`
        .driver-dashboard {
          display: flex;
          height: 100vh;
          background: #f5f9ff;
        }

        .sidebar {
          width: 230px;
          background: #0a1931;
          color: #fff;
          display: flex;
          flex-direction: column;
          padding: 20px 0;
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
        }

        .sidebar-title {
          text-align: center;
          font-size: 1.4rem;
          margin-bottom: 25px;
          color: #00eaff;
        }

        .menu {
          list-style: none;
          padding: 0;
          flex: 1;
        }

        .menu li {
          padding: 14px 20px;
          cursor: pointer;
          font-size: 1rem;
          transition: 0.3s;
        }

        .menu li:hover {
          background: #12264d;
        }

        .menu li.active {
          background: #00bcd4;
          color: #fff;
        }

        .logout {
          margin-top: auto;
          background: #e63946;
          text-align: center;
          font-weight: bold;
        }

        .logout:hover {
          background: #c92a3a;
        }

        .dashboard-content {
          flex: 1;
          padding: 30px;
          margin-left: 230px; /* Sidebar width */
          overflow-y: auto;
        }

        .welcome-section {
          background: #ffffff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
