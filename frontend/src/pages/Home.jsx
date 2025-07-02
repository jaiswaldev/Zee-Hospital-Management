import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Tagline from "../components/Tagline";
import Features from "../components/Features";
import Department from "../components/Department";
import Footer from "../components/Footer";
import Popup from "./Popup";
import Register from "../components/Register";
import Login from "../components/Login";
import slides from "../data/home-carousel.json";

const Home = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const handleGetStarted = (role) => {
    setSelectedRole(role);
    setShowLogin(false);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedRole(null);
    setShowLogin(false);
  };

  const handleSwitchToLogin = () => {
    setShowLogin(true);
  };

  const handleSwitchToRegister = () => {
    setShowLogin(false);
  };

  return (
    <>
      {/* <Navbar /> */}
      <div style={{ overflowX: "hidden" }} className="pt-15 gap-0">
        <Carousel slides={slides} />
        <Tagline onGetStarted={handleGetStarted} />
        <Features />
        <Department />
        <Footer />
      </div>
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
        {showLogin ? (
          <Login
            onSwitchToRegister={handleSwitchToRegister}
            onLoginSuccess={handleClosePopup}
          />
        ) : (
          <Register
            selectedRole={selectedRole}
            onSwitchToLogin={handleSwitchToLogin}
            onBackToRoleSelector={handleClosePopup}
          />
        )}
      </Popup>
    </>
  );
};

export default Home;
