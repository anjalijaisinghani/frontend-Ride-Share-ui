import React, { useState } from "react";

export default function VerificationModal({ onVerified }) {
  const [code, setCode] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();
    if (code === "123456") {
      onVerified();
    } else {
      alert("❌ Invalid code. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* ✨ Header */}
        <div className="modal-header">
          <h3>Verification Code</h3>
          <p>Please enter the 6-digit code sent to your email</p>
        </div>

        {/* 🧾 Input Form */}
        <form onSubmit={handleVerify}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            placeholder="••••••"
            className="code-input"
          />

          <button type="submit" className="verify-btn">
            Verify
          </button>
        </form>

        {/* ❎ Close Button */}
        <button
          onClick={() => onVerified(false)}
          className="close-btn"
          title="Close"
        >
          ✕
        </button>
      </div>

      {/* 🎨 Embedded CSS */}
      <style>{`
        /* Overlay background */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(5px);
          z-index: 1000;
          animation: fadeIn 0.3s ease-in-out;
        }

        /* Modal box */
        .modal-container {
          position: relative;
          background: linear-gradient(180deg, #00111f, #002233);
          border: 1px solid #00ffff;
          border-radius: 16px;
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
          padding: 40px 30px;
          width: 90%;
          max-width: 360px;
          color: white;
          text-align: center;
          animation: slideUp 0.4s ease;
        }

        /* Header */
        .modal-header h3 {
          font-size: 1.8rem;
          color: #00eaff;
          text-shadow: 0 0 12px #00ffff;
          margin-bottom: 10px;
        }

        .modal-header p {
          color: #7deaff;
          font-size: 0.9rem;
          font-style: italic;
          margin-bottom: 25px;
        }

        /* Input */
        .code-input {
          width: 100%;
          padding: 12px;
          font-size: 1.3rem;
          letter-spacing: 8px;
          text-align: center;
          border-radius: 10px;
          border: 1px solid #00ffff;
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          outline: none;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }

        .code-input::placeholder {
          color: #00bcd4;
        }

        .code-input:focus {
          box-shadow: 0 0 10px #00ffff;
          border-color: #00ffff;
        }

        /* Button */
        .verify-btn {
          width: 100%;
          background: #00eaff;
          color: #00111f;
          font-weight: bold;
          font-size: 1rem;
          padding: 12px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
        }

        .verify-btn:hover {
          background: #00ffff;
          box-shadow: 0 0 25px #00ffff;
          transform: scale(1.05);
        }

        /* Close Button */
        .close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: transparent;
          color: #00eaff;
          border: none;
          font-size: 1.3rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          color: white;
          transform: rotate(90deg);
        }

        /* ✨ Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
