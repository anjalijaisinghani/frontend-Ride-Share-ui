import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../api";

export default function VerificationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const email = location.state?.email || "";

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!code) {
      alert("⚠️ Please enter the verification code.");
      return;
    }
    try {
      setIsVerifying(true);
      const response = await axios.post(`${API_BASE_URL}/verify`, { email, code });
      if (response.data.success) {
        alert("✅ User verified successfully!");
        navigate("/");
      } else {
        alert("❌ " + response.data.message);
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert("⚠️ Something went wrong. Try again later.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      alert("⚠️ No email found.");
      return;
    }
    try {
      setIsResending(true);
      const response = await axios.post(`${API_BASE_URL}/resend-code`, { email });
      if (response.data.success) {
        alert("✅ A new verification code has been sent to your email!");
      } else {
        alert("❌ " + response.data.message);
      }
    } catch (error) {
      console.error("Resend error:", error);
      alert("⚠️ Failed to resend verification code.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h2>Email Verification</h2>
        <p className="instruction">Enter the verification code sent to:</p>
        <p className="user-email">{email}</p>

        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="input-box"
            required
          />

          <button type="submit" disabled={isVerifying} className="btn primary">
            {isVerifying ? "Verifying..." : "Verify"}
          </button>

          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="btn secondary"
          >
            {isResending ? "Resending..." : "Resend Code"}
          </button>
        </form>
      </div>

      {/* Inline CSS for simplicity */}
      <style>{`
        body {
          margin: 0;
          font-family: "Poppins", sans-serif;
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          color: #fff;
          height: 100vh;
          overflow: hidden;
        }

        .verify-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-image: url('/images/bg.jpg');
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .verify-container::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(6px);
        }

        .verify-card {
          position: relative;
          z-index: 2;
          background: rgba(255, 255, 255, 0.1);
          padding: 40px 35px;
          border-radius: 15px;
          box-shadow: 0 0 25px rgba(0, 255, 255, 0.4);
          text-align: center;
          width: 400px;
          animation: fadeIn 1s ease-in-out;
        }

        h2 {
          margin-bottom: 10px;
          color: #00e6ff;
          text-shadow: 0 0 10px #00ffff80;
        }

        .instruction {
          font-size: 15px;
          color: #bdefff;
          margin-bottom: 4px;
        }

        .user-email {
          font-size: 14px;
          color: #80f8ff;
          margin-bottom: 25px;
        }

        .input-box {
          width: 100%;
          height: 45px;
          border: 1px solid #00e6ff;
          background: transparent;
          border-radius: 8px;
          padding: 0 12px;
          font-size: 16px;
          color: white;
          outline: none;
          letter-spacing: 2px;
          text-align: center;
          margin-bottom: 20px;
          transition: all 0.3s;
        }

        .input-box:focus {
          border-color: #00ffff;
          box-shadow: 0 0 10px #00ffff80;
        }

        .btn {
          width: 100%;
          height: 45px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 12px;
        }

        .btn.primary {
          background: #00ffff;
          color: #000;
        }

        .btn.primary:hover {
          background: #03e9f4;
          box-shadow: 0 0 15px #00ffff90;
        }

        .btn.secondary {
          background: transparent;
          color: #00ffff;
          border: 1px solid #00ffff;
        }

        .btn.secondary:hover {
          background: #00ffff;
          color: #000;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .verify-card {
            width: 90%;
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  );
}
