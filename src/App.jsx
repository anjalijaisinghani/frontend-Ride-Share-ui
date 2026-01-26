import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PassengerHome from "./pages/PassengerHome";
import DriverHome from "./pages/DriverHome";
import DriverDetailsPage from "./pages/DriverDetailsPage";

import AdminLogin from "./pages/AdminLogin";
import VerificationModal from "./components/VerificationModal";
import VerificationPage from "./pages/VerificationPage";
import ResetPasswordPage from "./pages/ResetPasswordPage"; 
import SearchRide from "./components/SearchRide";
import PostRide from "./components/PostRide";
import DriverDashboard from "./pages/DriverDashboard";
import PassengerDashboard from "./pages/PassengerDashboard";




import "./App.css";

const App = () => {
  const [userRole, setUserRole] = useState(null);

  return (
  
    <Router>
      <Navbar userRole={userRole} setUserRole={setUserRole} />
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/admin-login" element={<AdminLogin />} />
  <Route path="/login" element={<LoginPage setUserRole={setUserRole} />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/reset-password" element={<ResetPasswordPage />} /> 
  <Route path="/verify" element={<VerificationPage />} />
  <Route path="/driver-details" element={<DriverDetailsPage />} />
  <Route path="/verify" element={<VerificationPage />} />
  <Route path="/passenger-home" element={<PassengerHome />} />
  <Route path="/driver-home" element={<DriverHome />} />
  <Route path="/driver-dashboard" element={<DriverDashboard />} />
  <Route path="/passenger-dashboard" element={<PassengerDashboard />} />
          <Route path="/search" element={<SearchRide />} />
        <Route path="/post-ride" element={<PostRide />} />
</Routes>

    </Router>
  );
};

export default App;
