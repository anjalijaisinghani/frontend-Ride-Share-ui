// import React from "react";
// import { Link } from "react-router-dom";
// import "../App.css";

// const Home = () => {
//   return (
//     <div className="home-container">
//       {/* Left Info Section */}
//       <div className="left-info">
//         <h1>Welcome to SafeRide</h1>
//         <p>
//           SafeRide is a secure ride-sharing platform where drivers and
//           passengers can connect for safe, reliable, and affordable travel.
//         </p>
//         <p>Join the community today and make your rides smarter!</p>
//       </div>

//       {/* Right Login Section */}
//       <div className="right-login">
//         <div className="login-card">
//           <h2>Login</h2>
//           <p>Please login to continue</p>
//           <Link to="/login">
//             <button className="btn-primary">Go to Login</button>
//           </Link>
//           <div className="register-link">
//             Don’t have an account? <Link to="/register">Register</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Home = () => {
  return (
    <div className="home-page">
      <div className="overlay"></div>

      {/* 🔹 Welcome Section */}
      <div className="home-content">
        <div className="text-section">
          <h1 className="home-title">Welcome to <span>SafeRide</span></h1>
          <p className="home-desc">
            SafeRide is your trusted ride-sharing platform connecting drivers
            and passengers for secure, reliable, and affordable journeys.
          </p>
          <p className="home-desc">Join the community today and make your rides smarter!</p>
        </div>

        {/* 🔹 Login Section */}
        <div className="login-card-home">
          <h2>Login</h2>
          <p className="subtext">Please login to continue</p>
          <Link to="/login">
            <button className="home-btn">Go to Login</button>
          </Link>
          <div className="register-text">
            Don’t have an account?{" "}
            <Link to="/register" className="register-link">Register</Link>
          </div>
        </div>
      </div>

      {/* ---------- CSS ---------- */}
      <style>{`
        * {
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        .home-page {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: url('/images/bg.jpg') center/cover no-repeat;
          color: white;
          overflow: hidden;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(5px);
          z-index: 0;
        }

        .home-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 90%;
          max-width: 1200px;
          flex-wrap: wrap;
        }

        .text-section {
          flex: 1;
          min-width: 300px;
          margin-right: 30px;
        }

        .home-title {
          font-size: 3rem;
          color: #00ffff;
          text-shadow: 0 0 15px #00e6ff;
          margin-bottom: 15px;
        }

        .home-title span {
          color: #00e6ff;
        }

        .home-desc {
          color: #c2f7ff;
          font-size: 1.1rem;
          line-height: 1.7;
          max-width: 500px;
          margin-bottom: 10px;
        }

        .login-card-home {
          background: rgba(0, 0, 0, 0.75);
          padding: 40px 45px;
          border-radius: 15px;
          width: 350px;
          box-shadow: 0 0 25px rgba(0, 255, 255, 0.3);
          backdrop-filter: blur(10px);
          text-align: center;
          transition: all 0.3s ease;
        }

        .login-card-home:hover {
          transform: scale(1.03);
          box-shadow: 0 0 40px rgba(0, 255, 255, 0.5);
        }

        .login-card-home h2 {
          color: #00ffff;
          margin-bottom: 10px;
          text-shadow: 0 0 15px #00ffff;
        }

        .subtext {
          color: #a8e6ff;
          margin-bottom: 25px;
        }

        .home-btn {
          background: #00ffff;
          color: #000;
          font-weight: bold;
          border: none;
          border-radius: 8px;
          padding: 12px 25px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .home-btn:hover {
          background: #008cff;
          color: #fff;
          box-shadow: 0 0 15px rgba(0, 140, 255, 0.6);
        }

        .register-text {
          margin-top: 20px;
          font-size: 0.95rem;
          color: #a8e6ff;
        }

        .register-link {
          color: #00ffff;
          font-weight: bold;
          transition: color 0.3s ease;
        }

        .register-link:hover {
          color: #00e6ff;
          text-decoration: underline;
        }

        @media (max-width: 900px) {
          .home-content {
            flex-direction: column;
            text-align: center;
          }
          .text-section {
            margin: 0 0 30px 0;
          }
        }

        @media (max-width: 480px) {
          .home-title {
            font-size: 2.2rem;
          }
          .login-card-home {
            width: 90%;
            padding: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
