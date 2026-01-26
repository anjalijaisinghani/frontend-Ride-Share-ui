import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCar, FaHashtag, FaIdCard, FaImage } from "react-icons/fa";
import axios from "axios";
import API_BASE_URL from "../api";

export default function DriverDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [licenseNumber, setLicenseNumber] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehicleImage, setVehicleImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "vehicleImage") {
      const file = files[0];
      setVehicleImage(file);
      if (file) setPreviewUrl(URL.createObjectURL(file));
    } else if (name === "licenseNumber") setLicenseNumber(value);
    else if (name === "vehicleNumber") setVehicleNumber(value);
    else if (name === "vehicleType") setVehicleType(value);
    else if (name === "vehicleColor") setVehicleColor(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!vehicleImage) {
      alert("Please upload a vehicle image.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("licenseNumber", licenseNumber);
    formData.append("vehicleNumber", vehicleNumber);
    formData.append("vehicleType", vehicleType);
    formData.append("vehicleColor", vehicleColor);
    formData.append("vehicleImage", vehicleImage);

    try {
      setIsLoading(true);
      const response = await axios.post(`${API_BASE_URL}/driver-details`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        alert(response.data.message);
        navigate("/verify", { state: { email } });
      } else {
        alert("❌ " + response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Failed to save driver details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="driver-container">
      <div className="driver-card">
        <div className="header">
          <h2>Driver Details</h2>
          <p>Please enter your vehicle information to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <FaCar className="input-icon" />
            <input
              type="text"
              name="vehicleType"
              placeholder="Vehicle Type"
              value={vehicleType}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container">
            <FaHashtag className="input-icon" />
            <input
              type="text"
              name="vehicleNumber"
              placeholder="Vehicle Number"
              value={vehicleNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container">
            <FaIdCard className="input-icon" />
            <input
              type="text"
              name="licenseNumber"
              placeholder="Driver License Number"
              value={licenseNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container">
            <FaImage className="input-icon" />
            <label className="upload-label">
              <input
                type="file"
                name="vehicleImage"
                accept="image/*"
                onChange={handleChange}
                required
              />
              {vehicleImage ? vehicleImage.name : "Upload Vehicle Image"}
            </label>
          </div>

          {previewUrl && (
            <div className="preview-container">
              <img src={previewUrl} alt="Vehicle Preview" className="vehicle-preview" />
            </div>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>

        <p className="back-text">
          Want to go back?{" "}
          <span onClick={() => navigate("/register")}>Register Page</span>
        </p>
      </div>

      {/* CSS Styling */}
      <style>{`
        .driver-container {
          min-height: 100vh;
          background: linear-gradient(to bottom right, #001f3f, #004466, #007799);
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Poppins', sans-serif;
          overflow: hidden;
        }

        .driver-card {
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid #00ffff;
          border-radius: 15px;
          padding: 2.5rem;
          width: 400px;
          box-shadow: 0 0 25px #00ffff55;
          backdrop-filter: blur(12px);
          animation: fadeIn 1s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .header h2 {
          color: #00ffff;
          text-align: center;
          font-size: 2rem;
          margin-bottom: 0.5rem;
          text-shadow: 0 0 15px #00ffff88;
        }

        .header p {
          color: #c0f6ff;
          text-align: center;
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .input-container {
          position: relative;
        }

        .input-container input {
          width: 100%;
          padding: 12px 40px 12px 12px;
          border-radius: 8px;
          border: 1px solid #00ffff88;
          background: rgba(0, 0, 0, 0.3);
          color: white;
          outline: none;
          transition: 0.3s;
        }

        .input-container input:focus {
          border-color: #00ffff;
          box-shadow: 0 0 10px #00ffff55;
        }

        .input-icon {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #00ffff;
          pointer-events: none;
        }

        .upload-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #00ffff88;
          background: rgba(0, 0, 0, 0.3);
          color: #c0f6ff;
          cursor: pointer;
          transition: 0.3s;
        }

        .upload-label:hover {
          border-color: #00ffff;
          color: white;
          box-shadow: 0 0 10px #00ffff55;
        }

        .upload-label input {
          display: none;
        }

        .preview-container {
          text-align: center;
        }

        .vehicle-preview {
          width: 120px;
          height: 80px;
          object-fit: cover;
          border-radius: 10px;
          border: 2px solid #00ffff66;
          box-shadow: 0 0 15px #00ffff55;
          animation: fadeIn 0.6s ease;
        }

        button {
          background: #00ffff;
          color: black;
          font-weight: bold;
          border: none;
          border-radius: 8px;
          padding: 12px;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 0 15px #00ffff55;
        }

        button:hover {
          background: white;
          transform: translateY(-2px);
        }

        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .back-text {
          text-align: center;
          margin-top: 1.5rem;
          color: #c0f6ff;
        }

        .back-text span {
          color: #00ffff;
          cursor: pointer;
          text-decoration: underline;
        }

        .back-text span:hover {
          color: white;
        }
      `}</style>
    </div>
  );
}
