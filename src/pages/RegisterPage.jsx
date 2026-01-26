// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUser, FaEnvelope, FaLock, FaPhoneAlt } from "react-icons/fa";
// import VerificationModal from "../components/VerificationModal";
// import axios from "axios";
// import API_BASE_URL from "../api";

// export default function RegisterPage() {
//   const [showVerification, setShowVerification] = useState(false);
//   const [role, setRole] = useState("");
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [mobile, setMobile] = useState("");

//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (!role) {
//       alert("⚠️ Please select a role before proceeding.");
//       return;
//     }

//     try {
//       const userData = {
//         fullName: name,
//         email,
//         password,
//         mobile,
//         role,
//       };

//       const response = await axios.post(`${API_BASE_URL}/register`, userData);

//       if (response.data.success) {
//         alert("✅ Registration successful!");

//         if (role === "driver") {
//           navigate("/driver-details", { state: { email } });
//         } else {
//           navigate("/verify", { state: { email } });
//         }
//       } else {
//         alert("⚠️ " + (response.data.message || "Something went wrong."));
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//       alert("⚠️ Failed to register. Please check your backend server and try again.");
//     }
//   };

//   return (
//     <div className="register-page">
//       <div className="register-box">
//         {/* 🔹 Header Section */}
//         <div className="header">
//           <h2 className="title">Create Account</h2>
//           <p className="subtitle">
//             Join SafeRide and start your journey with us today!
//           </p>
//         </div>

//         {/* 🔹 Form Section */}
//         <form onSubmit={handleRegister} className="register-form">
//           <div className="input-group">
//             <FaUser className="icon" />
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <FaEnvelope className="icon" />
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <FaLock className="icon" />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <FaPhoneAlt className="icon" />
//             <input
//               type="tel"
//               placeholder="Mobile Number"
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <select
//               required
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//             >
//               <option value="" disabled hidden>
//                 Select Role
//               </option>
//               <option value="passenger">Passenger</option>
//               <option value="driver">Driver</option>
//             </select>
//           </div>

//           <button type="submit" className="register-btn">
//             Register
//           </button>
//         </form>

//         <p className="extra-text">
//           Already have an account?{" "}
//           <span onClick={() => navigate("/")}>Login</span>
//         </p>

//         {showVerification && (
//           <VerificationModal onVerified={() => navigate("/")} />
//         )}
//       </div>

//       {/* ---------- CSS ---------- */}
//       <style>{`
//         * {
//           box-sizing: border-box;
//           font-family: 'Poppins', sans-serif;
//         }

//         body {
//           margin: 0;
//           padding: 0;
//         }

//         .register-page {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           min-height: 100vh;
//           background: url('/images/bg.jpg') center/cover no-repeat;
//           background-attachment: fixed;
//         }

//         .register-box {
//           background: rgba(0, 0, 0, 0.65);
//           padding: 45px 50px;
//           border-radius: 15px;
//           box-shadow: 0 0 35px rgba(0, 255, 255, 0.3);
//           width: 420px;
//           text-align: center;
//           color: white;
//           backdrop-filter: blur(8px);
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//         }

//         .register-box:hover {
//           transform: scale(1.02);
//           box-shadow: 0 0 45px rgba(0, 255, 255, 0.4);
//         }

//         .title {
//           font-size: 2rem;
//           color: #00e6ff;
//           margin-bottom: 8px;
//           text-shadow: 0 0 15px #00ffff;
//         }

//         .subtitle {
//           color: #a8e6ff;
//           font-size: 0.95rem;
//           margin-bottom: 25px;
//         }

//         .register-form {
//           display: flex;
//           flex-direction: column;
//           gap: 18px;
//         }

//         .input-group {
//           position: relative;
//         }

//         .input-group input,
//         .input-group select {
//           width: 100%;
//           padding: 12px 40px 12px 12px;
//           border: 1px solid #00e6ff;
//           border-radius: 8px;
//           background: rgba(255, 255, 255, 0.05);
//           color: white;
//           font-size: 0.95rem;
//           outline: none;
//           transition: all 0.3s ease;
//         }

//         .input-group input::placeholder {
//           color: #a8e6ff;
//         }

//         .input-group input:focus,
//         .input-group select:focus {
//           border-color: #00ffff;
//           box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
//         }

//         .input-group select {
//           color: #a8e6ff;
//           appearance: none;
//         }

//         .input-group select:valid {
//           color: white;
//         }

//         .icon {
//           position: absolute;
//           right: 12px;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #00e6ff;
//         }

//         .register-btn {
//           width: 100%;
//           background: #00ffff;
//           color: #000;
//           font-weight: bold;
//           font-size: 1rem;
//           border: none;
//           border-radius: 8px;
//           padding: 12px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .register-btn:hover {
//           background: #008cff;
//           color: white;
//           box-shadow: 0 0 15px rgba(0, 140, 255, 0.5);
//         }

//         .extra-text {
//           margin-top: 20px;
//           font-size: 0.9rem;
//           color: #a8e6ff;
//         }

//         .extra-text span {
//           color: #00ffff;
//           cursor: pointer;
//           font-weight: bold;
//           transition: color 0.3s;
//         }

//         .extra-text span:hover {
//           text-decoration: underline;
//           color: #00e6ff;
//         }

//         @media (max-width: 480px) {
//           .register-box {
//             width: 90%;
//             padding: 35px 25px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }








import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt } from "react-icons/fa";
import VerificationModal from "../components/VerificationModal";
import axios from "axios";
import API_BASE_URL from "../api";

export default function RegisterPage() {
  const [showVerification, setShowVerification] = useState(false);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!role) {
      alert("⚠️ Please select a role before proceeding.");
      return;
    }

    try {
      const userData = { fullName: name, email, password, mobile, role };
      const response = await axios.post(`${API_BASE_URL}/register`, userData);

      if (response.data.success) {
        alert("✅ Registration successful!");
        if (role === "driver") {
          navigate("/driver-details", { state: { email } });
        } else {
          navigate("/verify", { state: { email } });
        }
      } else {
        alert("⚠️ " + (response.data.message || "Something went wrong."));
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("⚠️ Failed to register. Please check your backend server and try again.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="title">Create Account</h2>
        <p className="subtitle">Join SafeRide and start your journey today!</p>

        <form onSubmit={handleRegister} className="register-form">
          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaPhoneAlt className="icon" />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <select
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Role
              </option>
              <option value="passenger">Passenger</option>
              <option value="driver">Driver</option>
            </select>
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <p className="extra-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Login</span>
        </p>

        {showVerification && <VerificationModal onVerified={() => navigate("/")} />}
      </div>

      <style>{`
        * {
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        body, html {
          margin: 0;
          padding: 0;
        }

        .register-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #00111f, #001f33, #002b40);
          background-size: 400% 400%;
          animation: gradientMove 10s ease infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .register-card {
          background: rgba(0, 0, 0, 0.7);
          padding: 50px 45px;
          border-radius: 18px;
          width: 400px;
          text-align: center;
          color: white;
          box-shadow: 0 0 35px rgba(0, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
          animation: fadeInUp 0.7s ease;
        }

        .register-card:hover {
          transform: scale(1.02);
          box-shadow: 0 0 45px rgba(0, 255, 255, 0.4);
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .title {
          font-size: 2rem;
          color: #00e6ff;
          margin-bottom: 10px;
          text-shadow: 0 0 12px #00ffff;
        }

        .subtitle {
          color: #a8e6ff;
          font-size: 0.95rem;
          margin-bottom: 25px;
        }

        .register-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .input-group {
          position: relative;
        }

        .input-group input,
        .input-group select {
          width: 100%;
          padding: 12px 40px 12px 12px;
          border: 1px solid #00e6ff;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.08);
          color: white;
          font-size: 0.95rem;
          outline: none;
          transition: 0.3s ease;
        }

        .input-group input::placeholder {
          color: #a8e6ff;
        }

        .input-group input:focus,
        .input-group select:focus {
          border-color: #00ffff;
          box-shadow: 0 0 12px rgba(0, 255, 255, 0.4);
        }

        .input-group select {
          color: #a8e6ff;
          appearance: none;
        }

        .input-group select:valid {
          color: white;
        }

        .icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #00e6ff;
          font-size: 1rem;
        }

        .register-btn {
          width: 100%;
          background: linear-gradient(90deg, #00ffff, #008cff);
          color: #000;
          font-weight: bold;
          font-size: 1rem;
          border: none;
          border-radius: 10px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .register-btn:hover {
          background: linear-gradient(90deg, #008cff, #00ffff);
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
          transform: translateY(-2px);
        }

        .extra-text {
          margin-top: 20px;
          font-size: 0.9rem;
          color: #a8e6ff;
        }

        .extra-text span {
          color: #00ffff;
          cursor: pointer;
          font-weight: bold;
          transition: color 0.3s ease;
        }

        .extra-text span:hover {
          color: #00e6ff;
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .register-card {
            width: 90%;
            padding: 35px 25px;
          }
        }
      `}</style>
    </div>
  );
}
