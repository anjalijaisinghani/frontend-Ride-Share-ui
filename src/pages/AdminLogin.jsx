// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./PageStyles.css";

// const AdminLogin = () => {
//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // ✅ Updated credentials
//     if (
//       credentials.email === "admin@rideshare.com" &&
//       credentials.password === "admin@123"
//     ) {
//       alert("Admin login successful!");
//       // ✅ Redirect to your existing admin panel (replace port if needed)
//       window.location.href = "http://localhost:5174";
//     } else {
//       alert("Invalid admin credentials ❌");
//     }
//   };

//   return (
//     <div className="page-container">
//       <div className="login-card">
//         <h2>Admin Login</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Admin Email"
//             value={credentials.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={credentials.password}
//             onChange={handleChange}
//             required
//           />
//           <button type="submit" className="btn">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./AdminLogin.css"; // ✅ External CSS file

// const AdminLogin = () => {
//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (
//       credentials.email === "admin@rideshare.com" &&
//       credentials.password === "admin@123"
//     ) {
//       alert("Admin login successful!");
//       window.location.href = "http://localhost:3000"; // ✅ redirect to admin panel
//     } else {
//       alert("Invalid admin credentials ❌");
//     }
//   };

//   return (
//     <div className="admin-login-container">
//       <div className="admin-card">
//         <h2 className="admin-title">🚗 Admin Login</h2>
//         <p className="admin-subtitle">Access the control panel</p>
//         <form onSubmit={handleSubmit} className="admin-form">
//           <div className="input-box">
//             <input
//               type="email"
//               name="email"
//               placeholder="Admin Email"
//               value={credentials.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-box">
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={credentials.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit" className="admin-btn">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2
import "./AdminLogin.css"; // ✅ External CSS file

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      credentials.email === "admin@rideshare.com" &&
      credentials.password === "admin@123"
    ) {
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Redirecting to Admin Panel...",
        showConfirmButton: false,
        timer: 1500,
        background: "#f0f9ff",
        color: "#007bff",
      });

      setTimeout(() => {
        window.location.href = "http://localhost:3000"; // ✅ Redirect to admin panel
      }, 1500);
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Credentials ❌",
        text: "Please check your email or password and try again.",
        confirmButtonColor: "#007bff",
        background: "#fff1f2",
        color: "#b91c1c",
      });
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-card">
        <h2 className="admin-title">🚗 Admin Login</h2>
        <p className="admin-subtitle">Access the control panel</p>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="admin-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
