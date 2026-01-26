import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import API_BASE_URL from "../api";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("⚠️ Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/reset-password`, {
        email,
        newPassword,
      });

      if (response.data.success) {
        alert("✅ Password updated successfully!");
        navigate("/verify", { state: { email } });
      } else {
        alert("❌ " + response.data.message);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("⚠️ Something went wrong. Try again later.");
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-box">
        <h2 className="reset-title">Reset Password</h2>
        <p className="reset-subtitle">
          Enter your email and new password to continue.
        </p>

        <form onSubmit={handleSubmit} className="reset-form">
          {/* Email */}
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* New Password */}
          <div className="input-group">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Submit */}
          <button type="submit" className="reset-btn">
            Reset Password
          </button>
        </form>

        <p className="extra-text">
          Remembered your password?{" "}
          <span onClick={() => navigate("/")}>Back to Login</span>
        </p>
      </div>

      {/* ---------- CSS ---------- */}
      <style>{`
        * {
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        body {
          margin: 0;
          padding: 0;
        }

        .reset-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: url('/images/bg.jpg') center/cover no-repeat;
          background-attachment: fixed;
        }

        .reset-box {
          background: rgba(0, 0, 0, 0.65);
          padding: 45px 50px;
          border-radius: 15px;
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
          width: 420px;
          text-align: center;
          color: white;
          backdrop-filter: blur(8px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .reset-box:hover {
          transform: scale(1.02);
          box-shadow: 0 0 45px rgba(0, 255, 255, 0.4);
        }

        .reset-title {
          font-size: 2rem;
          color: #00e6ff;
          margin-bottom: 8px;
          text-shadow: 0 0 15px #00ffff;
        }

        .reset-subtitle {
          color: #a8e6ff;
          font-size: 0.95rem;
          margin-bottom: 25px;
        }

        .reset-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .input-group {
          position: relative;
        }

        .input-group input {
          width: 100%;
          padding: 12px 40px 12px 12px;
          border: 1px solid #00e6ff;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          color: white;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .input-group input::placeholder {
          color: #a8e6ff;
        }

        .input-group input:focus {
          border-color: #00ffff;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
        }

        .eye-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #00e6ff;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .eye-icon:hover {
          color: #00ffff;
        }

        .reset-btn {
          width: 100%;
          background: #00ffff;
          color: #000;
          font-weight: bold;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .reset-btn:hover {
          background: #008cff;
          color: white;
          box-shadow: 0 0 15px rgba(0, 140, 255, 0.5);
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
          transition: color 0.3s;
        }

        .extra-text span:hover {
          text-decoration: underline;
          color: #00e6ff;
        }

        @media (max-width: 480px) {
          .reset-box {
            width: 90%;
            padding: 35px 25px;
          }
        }
      `}</style>
    </div>
  );
}
