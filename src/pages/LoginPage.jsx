
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
// import axios from "axios";
// import Swal from "sweetalert2";
// import API_BASE_URL from "../api";

// export default function LoginPage() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   console.log(email, password);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(`${API_BASE_URL}/login`, {
//   email: email,
//   password: password,
//   role: role.toLowerCase(), // or match backend exactly
// });


//       if (response.data.status === "SUCCESS") {

//         localStorage.setItem("userRole", role);

//         localStorage.setItem("userId", response.data.userId);
//         localStorage.setItem("userDetails", JSON.stringify(response.data.user));


//         // ✅ Save driver email for PostRide

//         if (role === "driver") {
//   localStorage.setItem("driverEmail", email);
// }


//         if (response.data.firstLogin) {
//           Swal.fire({
//             title: "Set New Password",
//             input: "password",
//             inputLabel: "Enter your new password",
//             inputPlaceholder: "New password",
//             confirmButtonText: "Save Password",
//             confirmButtonColor: "#00bcd4",
//             showCancelButton: true,
//             preConfirm: async (newPassword) => {
//               if (!newPassword || newPassword.trim().length < 6) {
//                 Swal.showValidationMessage(
//                   "Password must be at least 6 characters long"
//                 );
//                 return false;
//               }
//               try {
//                 await axios.post(`${API_BASE_URL}/reset-password`, {
//                   email,
//                   newPassword,
//                 });
//                 return true;
//               } catch (error) {
//                 Swal.showValidationMessage(
//                   "Failed to update password. Try again."
//                 );
//                 return false;
//               }
//             },
//           }).then((result) => {
//             if (result.isConfirmed) {
//               Swal.fire({
//                 icon: "success",
//                 title: "Password Updated",
//                 text: "You can now continue to your dashboard!",
//                 confirmButtonColor: "#00bcd4",
//               }).then(() => {
//                if (role === "passenger") navigate("/passenger-dashboard");

//                 else if (role === "driver") navigate("/post-ride");
//                 else if (role === "admin")
//                   window.location.href = "http://localhost:3000/";
//                 else navigate("/dashboard");
//               });
//             }
//           });
//         } else {
//           Swal.fire({
//             icon: "success",
//             title: "Login Successful",
//             showConfirmButton: false,
//             timer: 1200,
//           });

//           setTimeout(() => {
//            if (role === "passenger") navigate("/passenger-dashboard");
//             else if (role === "driver") navigate("/driver-dashboard");

//             else if (role === "admin")
//               window.location.href = "http://localhost:3000/";
//             else navigate("/dashboard");
//           }, 1200);
//         }
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Login Failed",
//           text: response.data.message,
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Login Failed",
//         text: "Please check your credentials and try again.",
//       });
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-card">
//         <h2>Welcome Back</h2>
//         <p className="subtitle">Sign in to continue your journey</p>

//         <form onSubmit={handleLogin} className="login-form">
//           <div className="input-group">
//             <FaEnvelope className="icon" />
//             <input
//               type="email"
//               placeholder="Email Address"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div className="input-group">
//             <FaLock className="icon" />
//             <input
//               type="password"
//               placeholder="Password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
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
//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           <button type="submit" className="login-btn">
//             Sign In
//           </button>
//         </form>

//         <div className="bottom-links">
//           <p onClick={() => navigate("/reset-password")}>Forgot Password?</p>
//           <p>
//             Don’t have an account?{" "}
//             <span onClick={() => navigate("/register")}>Register</span>
//           </p>
//         </div>
//       </div>

//       {/* ---------- STYLING ---------- */}
//       <style>{`
//         * {
//           box-sizing: border-box;
//           font-family: 'Poppins', sans-serif;
//         }

//         .login-page {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           min-height: 100vh;
//           background: linear-gradient(135deg, #0a0f24, #001f3f);
//           background-image: url("/images/admin-bg.jpg");
//           background-size: cover;
//           background-position: center;
//         }

//         .login-card {
//           width: 400px;
//           padding: 40px 50px;
//           background: rgba(255, 255, 255, 0.08);
//           backdrop-filter: blur(12px);
//           border: 1px solid rgba(255, 255, 255, 0.15);
//           border-radius: 16px;
//           box-shadow: 0 0 30px rgba(0, 255, 255, 0.1);
//           text-align: center;
//           animation: slideUp 0.6s ease;
//         }

//         .login-card h2 {
//           color: #00e6ff;
//           font-size: 1.8rem;
//           margin-bottom: 5px;
//         }

//         .subtitle {
//           color: #b8eaff;
//           font-size: 0.95rem;
//           margin-bottom: 30px;
//         }

//         .login-form {
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
//           padding: 12px 40px 12px 14px;
//           border: 1px solid rgba(0, 255, 255, 0.4);
//           border-radius: 8px;
//           background: rgba(0, 0, 0, 0.3);
//           color: #fff;
//           font-size: 0.95rem;
//           outline: none;
//           transition: 0.3s;
//         }

//         .input-group input:focus,
//         .input-group select:focus {
//           border-color: #00ffff;
//           box-shadow: 0 0 12px rgba(0, 255, 255, 0.4);
//         }

//         .input-group select {
//           appearance: none;
//           color: #b8eaff;
//         }

//         .icon {
//           position: absolute;
//           right: 14px;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #00e6ff;
//           font-size: 1rem;
//         }

//         .login-btn {
//           margin-top: 8px;
//           width: 100%;
//           padding: 12px;
//           background: linear-gradient(90deg, #00e6ff, #007bff);
//           border: none;
//           border-radius: 8px;
//           color: white;
//           font-weight: bold;
//           cursor: pointer;
//           font-size: 1rem;
//           transition: 0.3s ease-in-out;
//         }

//         .login-btn:hover {
//           transform: scale(1.05);
//           box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
//         }

//         .bottom-links {
//           margin-top: 25px;
//           color: #b8eaff;
//           font-size: 0.9rem;
//         }

//         .bottom-links p {
//           margin: 5px 0;
//           cursor: pointer;
//           transition: 0.2s;
//         }

//         .bottom-links span {
//           color: #00ffff;
//           font-weight: bold;
//           cursor: pointer;
//         }

//         .bottom-links p:hover,
//         .bottom-links span:hover {
//           text-decoration: underline;
//           color: #00e6ff;
//         }

//         @keyframes slideUp {
//           from { transform: translateY(50px); opacity: 0; }
//           to { transform: translateY(0); opacity: 1; }
//         }
//       `}</style>
//     </div>
//   );
// }



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import API_BASE_URL from "../api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  console.log(email, password);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: email,
        password: password,
        role: role.toLowerCase(), // matches backend
      });

      // ✅ FIXED: check response.data.success instead of status
      if (response.data.success) {
        localStorage.setItem("userRole", role);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userDetails", JSON.stringify(response.data.user));

        if (role === "driver") {
          localStorage.setItem("driverEmail", email);
        }

        if (response.data.firstLogin) {
          Swal.fire({
            title: "Set New Password",
            input: "password",
            inputLabel: "Enter your new password",
            inputPlaceholder: "New password",
            confirmButtonText: "Save Password",
            confirmButtonColor: "#00bcd4",
            showCancelButton: true,
            preConfirm: async (newPassword) => {
              if (!newPassword || newPassword.trim().length < 6) {
                Swal.showValidationMessage(
                  "Password must be at least 6 characters long"
                );
                return false;
              }
              try {
                await axios.post(`${API_BASE_URL}/reset-password`, {
                  email,
                  newPassword,
                });
                return true;
              } catch (error) {
                Swal.showValidationMessage(
                  "Failed to update password. Try again."
                );
                return false;
              }
            },
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                icon: "success",
                title: "Password Updated",
                text: "You can now continue to your dashboard!",
                confirmButtonColor: "#00bcd4",
              }).then(() => {
                if (role === "passenger") navigate("/passenger-dashboard");
                else if (role === "driver") navigate("/post-ride");
                else if (role === "admin")
                  window.location.href = "http://localhost:3000/";
                else navigate("/dashboard");
              });
            }
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1200,
          });

          setTimeout(() => {
            if (role === "passenger") navigate("/passenger-dashboard");
            else if (role === "driver") navigate("/driver-dashboard");
            else if (role === "admin")
              window.location.href = "http://localhost:3000/";
            else navigate("/dashboard");
          }, 1200);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: response.data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Please check your credentials and try again.",
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to continue your journey</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <div className="bottom-links">
          <p onClick={() => navigate("/reset-password")}>Forgot Password?</p>
          <p>
            Don’t have an account?{" "}
            <span onClick={() => navigate("/register")}>Register</span>
          </p>
        </div>
      </div>

      {/* ---------- STYLING ---------- */}
      <style>{`
        * { box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        .login-page { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: linear-gradient(135deg, #0a0f24, #001f3f); background-size: cover; background-position: center; }
        .login-card { width: 400px; padding: 40px 50px; background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 16px; box-shadow: 0 0 30px rgba(0, 255, 255, 0.1); text-align: center; animation: slideUp 0.6s ease; }
        .login-card h2 { color: #00e6ff; font-size: 1.8rem; margin-bottom: 5px; }
        .subtitle { color: #b8eaff; font-size: 0.95rem; margin-bottom: 30px; }
        .login-form { display: flex; flex-direction: column; gap: 18px; }
        .input-group { position: relative; }
        .input-group input, .input-group select { width: 100%; padding: 12px 40px 12px 14px; border: 1px solid rgba(0, 255, 255, 0.4); border-radius: 8px; background: rgba(0, 0, 0, 0.3); color: #fff; font-size: 0.95rem; outline: none; transition: 0.3s; }
        .input-group input:focus, .input-group select:focus { border-color: #00ffff; box-shadow: 0 0 12px rgba(0, 255, 255, 0.4); }
        .input-group select { appearance: none; color: #b8eaff; }
        .icon { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: #00e6ff; font-size: 1rem; }
        .login-btn { margin-top: 8px; width: 100%; padding: 12px; background: linear-gradient(90deg, #00e6ff, #007bff); border: none; border-radius: 8px; color: white; font-weight: bold; cursor: pointer; font-size: 1rem; transition: 0.3s ease-in-out; }
        .login-btn:hover { transform: scale(1.05); box-shadow: 0 0 20px rgba(0, 255, 255, 0.4); }
        .bottom-links { margin-top: 25px; color: #b8eaff; font-size: 0.9rem; }
        .bottom-links p { margin: 5px 0; cursor: pointer; transition: 0.2s; }
        .bottom-links span { color: #00ffff; font-weight: bold; cursor: pointer; }
        .bottom-links p:hover, .bottom-links span:hover { text-decoration: underline; color: #00e6ff; }
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
}
