// import React from "react";
// import { Link } from "react-router-dom";
// import "../App.css";

// const Navbar = ({ userRole, setUserRole }) => {
//   const handleLogout = () => setUserRole(null);

//   return (
//     <nav className="navbar">
//       <h1>SafeRide</h1>
//       <ul className="nav-links">
//         {!userRole && (
//           <>
//             <li><Link to="/">Home</Link></li>
//            <li> <Link to="/admin-login" className="nav-item admin-btn">Admin</Link></li>
//             <li><Link to="/login">Login</Link></li>
//             <li><Link to="/register">Register</Link></li>
//           </>
//         )}

//         {userRole === "passenger" && (
//           <>
//             <li><Link to="/passenger-home">Join Ride</Link></li>
//             <li><Link to="/contact">Contact</Link></li>
//             <li><button onClick={handleLogout}>Logout</button></li>
//           </>
//         )}

//         {userRole === "driver" && (
//           <>
//             <li><Link to="/driver-home">Add Ride</Link></li>
//             <li><Link to="/post-ride" className="nav-link">Post Ride</Link></li>
//             <li><Link to="/contact">Contact</Link></li>
//             <li><button onClick={handleLogout}>Logout</button></li>
//           </>
//         )}

        

//       </ul>
//     </nav>
//   );
// };

// export default Navbar;


// import React from "react";
// import { Link } from "react-router-dom";
// import "../App.css";

// const Navbar = ({ userRole, setUserRole }) => {
//   const handleLogout = () => setUserRole(null);

//   return (
//     <nav className="navbar">
//       <div className="navbar-brand">
//         <h1 className="logo">
//           <span className="glow">Safe</span>Ride
//         </h1>
//       </div>

//       <ul className="nav-links">
//         {!userRole && (
//           <>
//             <li><Link to="/" className="nav-item">Home</Link></li>
//             <li><Link to="/admin-login" className="nav-item admin-btn">Admin</Link></li>
//             <li><Link to="/login" className="nav-item">Login</Link></li>
//             <li><Link to="/register" className="nav-item">Register</Link></li>
//           </>
//         )}

//         {userRole === "passenger" && (
//           <>
//             <li><Link to="/passenger-home" className="nav-item">Join Ride</Link></li>
//             <li><Link to="/contact" className="nav-item">Contact</Link></li>
//             <li>
//               <button onClick={handleLogout} className="logout-btn">Logout</button>
//             </li>
//           </>
//         )}

//         {userRole === "driver" && (
//           <>
//             <li><Link to="/driver-home" className="nav-item">Add Ride</Link></li>
//             <li><Link to="/post-ride" className="nav-item">Post Ride</Link></li>
//             <li><Link to="/contact" className="nav-item">Contact</Link></li>
//             <li>
//               <button onClick={handleLogout} className="logout-btn">Logout</button>
//             </li>
//           </>
//         )}
//       </ul>

//       {/* ---------- CSS ---------- */}
//       <style>{`
//         * {
//           box-sizing: border-box;
//           font-family: 'Poppins', sans-serif;
//         }

//         .navbar {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 15px 40px;
//           background: rgba(0, 0, 0, 0.7);
//           backdrop-filter: blur(10px);
//           border-bottom: 1px solid rgba(0, 255, 255, 0.2);
//           box-shadow: 0 0 25px rgba(0, 255, 255, 0.2);
//           position: sticky;
//           top: 0;
//           z-index: 1000;
//           transition: all 0.3s ease;
//         }

//         .navbar:hover {
//           box-shadow: 0 0 35px rgba(0, 255, 255, 0.3);
//         }

//         .logo {
//           color: white;
//           font-size: 1.8rem;
//           letter-spacing: 1px;
//           text-transform: uppercase;
//           text-shadow: 0 0 10px #00ffff;
//           margin: 0;
//         }

//         .logo .glow {
//           color: #00ffff;
//           text-shadow: 0 0 20px #00e6ff;
//         }

//         .nav-links {
//           list-style: none;
//           display: flex;
//           align-items: center;
//           gap: 25px;
//           margin: 0;
//         }

//         .nav-item {
//           color: #a8e6ff;
//           text-decoration: none;
//           font-weight: 500;
//           position: relative;
//           transition: all 0.3s ease;
//           padding: 8px 12px;
//           border-radius: 6px;
//         }

//         .nav-item:hover {
//           color: #00ffff;
//           background: rgba(0, 255, 255, 0.1);
//           box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
//         }

//         .admin-btn {
//           background: linear-gradient(90deg, #00ffff, #008cff);
//           color: #000 !important;
//           font-weight: bold;
//           border-radius: 8px;
//           padding: 8px 14px;
//           transition: all 0.3s ease;
//         }

//         .admin-btn:hover {
//           transform: scale(1.05);
//           box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
//         }

//         .logout-btn {
//           background: transparent;
//           color: #ff4b4b;
//           font-weight: bold;
//           border: 1px solid #ff4b4b;
//           padding: 8px 14px;
//           border-radius: 8px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .logout-btn:hover {
//           background: #ff4b4b;
//           color: #fff;
//           box-shadow: 0 0 15px rgba(255, 75, 75, 0.5);
//         }

//         @media (max-width: 768px) {
//           .navbar {
//             flex-direction: column;
//             padding: 20px;
//           }

//           .nav-links {
//             flex-wrap: wrap;
//             justify-content: center;
//             gap: 15px;
//             margin-top: 10px;
//           }

//           .logo {
//             font-size: 1.5rem;
//           }
//         }
//       `}</style>
//     </nav>
//   );
// };

// export default Navbar;


import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Navbar = ({ userRole, setUserRole }) => {
  const handleLogout = () => setUserRole(null);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1 className="logo">
          <span className="glow">Safe</span>Ride
        </h1>
      </div>

      <ul className="nav-links">
        {!userRole && (
          <>
            <li><Link to="/" className="nav-item">Home</Link></li>
            <li><Link to="/admin-login" className="nav-btn">Admin</Link></li>
            <li><Link to="/login" className="nav-btn">Login</Link></li>
            <li><Link to="/register" className="nav-btn">Register</Link></li>
          </>
        )}

        {userRole === "passenger" && (
          <>
            <li><Link to="/passenger-home" className="nav-item">Join Ride</Link></li>
            <li><Link to="/contact" className="nav-item">Contact</Link></li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </>
        )}

        {userRole === "driver" && (
          <>
            <li><Link to="/driver-home" className="nav-item">Add Ride</Link></li>
            <li><Link to="/post-ride" className="nav-item">Post Ride</Link></li>
            <li><Link to="/contact" className="nav-item">Contact</Link></li>
            <li>
  <button onClick={handleLogout} className="logout-btn">
    Logout
  </button>
</li>

          </>
        )}
      </ul>

      {/* ---------- CSS ---------- */}
      <style>{`
        * {
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 40px;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 255, 255, 0.2);
          box-shadow: 0 0 25px rgba(0, 255, 255, 0.2);
          position: sticky;
          top: 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .navbar:hover {
          box-shadow: 0 0 35px rgba(0, 255, 255, 0.3);
        }

        .logo {
          color: white;
          font-size: 1.8rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          text-shadow: 0 0 10px #00ffff;
          margin: 0;
        }

        .logo .glow {
          color: #00ffff;
          text-shadow: 0 0 20px #00e6ff;
        }

        .nav-links {
          list-style: none;
          display: flex;
          align-items: center;
          gap: 25px;
          margin: 0;
        }

        .nav-item {
          color: #a8e6ff;
          text-decoration: none;
          font-weight: 500;
          position: relative;
          transition: all 0.3s ease;
          padding: 8px 12px;
          border-radius: 6px;
        }

        .nav-item:hover {
          color: #00ffff;
          background: rgba(0, 255, 255, 0.1);
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
        }

        /* 🔹 Buttons (Admin, Login, Register) */
        .nav-btn {
          background: linear-gradient(90deg, #00ffff, #008cff);
          color: #000;
          font-weight: bold;
          border-radius: 8px;
          padding: 8px 16px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
        }

        .nav-btn:hover {
          transform: translateY(-2px);
          background: linear-gradient(90deg, #0099ff, #00e6ff);
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
        }

        .logout-btn {
          background: transparent;
          color: #ff4b4b;
          font-weight: bold;
          border: 1px solid #ff4b4b;
          padding: 8px 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background: #ff4b4b;
          color: #fff;
          box-shadow: 0 0 15px rgba(255, 75, 75, 0.5);
        }

        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            padding: 20px;
          }

          .nav-links {
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
            margin-top: 10px;
          }

          .logo {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
