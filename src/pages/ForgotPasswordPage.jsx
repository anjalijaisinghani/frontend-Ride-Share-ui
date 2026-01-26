import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    setOtpSent(true);
    alert("OTP has been sent to your email (frontend only demo).");
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    alert("OTP verified successfully! Redirecting to reset password page...");
    navigate("/reset-password", { state: { email } });
  };

  return (
    <div className="forgot-bg">
      <div className="forgot-container">
        <h2 className="forgot-title">Forgot Password</h2>
        <p className="forgot-subtitle">
          Enter your email to receive a verification code.
        </p>

        <form
          onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
          className="forgot-form"
        >
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={otpSent}
              className="input-field"
            />
          </div>

          {otpSent && (
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter OTP"
                required
                className="input-field"
              />
            </div>
          )}

          <button type="submit" className="submit-btn">
            {otpSent ? "Verify OTP" : "Send OTP"}
          </button>
        </form>

        <p className="forgot-footer">
          Remember your password?{" "}
          <span className="link" onClick={() => navigate("/")}>
            Back to Login
          </span>
        </p>
      </div>

      {/* ✅ Pure CSS styling */}
      <style>{`
        .forgot-bg {
          background: url('/images/bg.jpg') no-repeat center center/cover;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Poppins', sans-serif;
        }

        .forgot-container {
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid #00ffff;
          border-radius: 15px;
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
          padding: 40px;
          width: 420px;
          text-align: center;
          backdrop-filter: blur(8px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .forgot-container:hover {
          transform: scale(1.02);
          box-shadow: 0 0 45px rgba(0, 255, 255, 0.7);
        }

        .forgot-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #00bfff;
          text-shadow: 0 0 10px #00bfff, 0 0 20px #00bfff;
        }

        .forgot-subtitle {
          color: #b8e9ff;
          margin-top: 10px;
          font-size: 0.95rem;
          font-style: italic;
        }

        .forgot-form {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group {
          position: relative;
        }

        .input-icon {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #7deaff;
          font-size: 1.1rem;
        }

        .input-field {
          width: 100%;
          height: 48px;
          border-radius: 8px;
          background: transparent;
          border: 1px solid #00ffff;
          padding: 0 2.5rem 0 0.85rem;
          color: #fff;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .input-field::placeholder {
          color: #7deaff;
        }

        .input-field:hover,
        .input-field:focus {
          border-color: #00bfff;
          box-shadow: 0 0 12px rgba(0, 255, 255, 0.7);
        }

        .submit-btn {
          height: 48px;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          color: #000;
          background: linear-gradient(135deg, #00ffff, #00bfff);
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }

        .submit-btn:hover {
          background: linear-gradient(135deg, #00bfff, #00ffff);
          color: #fff;
          box-shadow: 0 0 25px rgba(0, 255, 255, 0.8);
          transform: scale(1.05);
        }

        .forgot-footer {
          color: #7deaff;
          margin-top: 25px;
          font-size: 0.95rem;
        }

        .link {
          color: #00ffff;
          cursor: pointer;
          font-weight: bold;
        }

        .link:hover {
          text-decoration: underline;
          color: #fff;
        }
      `}</style>
    </div>
  );
}
