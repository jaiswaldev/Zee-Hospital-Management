import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import { toast } from "react-toastify";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://hospital-management-r7hc.onrender.com/api/v1/user/patient/logout",
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setIsAuthenticated(false);
      setUser({});
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  const gotoLogin = () => {
    navigate("/login");
  };

  const goToProfile = (value) => {
    if (value === "Profile") navigate("/user/profile");
  };

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: "#4164e3",
      padding: "1rem",
      zIndex: 1220,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "white"
    }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: "1.5rem", fontWeight: "bold" }}>
          ZeeCare
        </Link>
      </div>

      <div style={{
        display: show ? "flex" : "none",
        gap: "2rem",
        alignItems: "center"
      }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>HOME</Link>
        {isAuthenticated ? (
          <Link to="/appointment" style={{ color: "white", textDecoration: "none" }}>APPOINTMENT</Link>
        ) : (
          <Link to="/register" style={{ color: "white", textDecoration: "none" }}>REGISTER</Link>
        )}
        <select
          onChange={(e) => goToProfile(e.target.value)}
          style={{
            backgroundColor: "transparent",
            color: "white",
            border: "1px solid white",
            padding: "0.5rem",
            borderRadius: "4px"
          }}
        >
          <option value="Services">SERVICES</option>
          {user ? (
            <option value="Profile">Profile</option>
          ) : (
            <option value="Emergency">Emergency</option>
          )}
          <option value="Normal">Normal</option>
        </select>
        <Link to="/doctors" style={{ color: "white", textDecoration: "none" }}>DOCTORS</Link>
        <Link to="/about" style={{ color: "white", textDecoration: "none" }}>ABOUT US</Link>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "black",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            LOGOUT
          </button>
        ) : (
          <button
            onClick={gotoLogin}
            style={{
              backgroundColor: "black",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            LOGIN
          </button>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        {show ? (
          <GiHamburgerMenu
            style={{ color: "white", fontSize: "24px", cursor: "pointer" }}
            onClick={() => setShow(!show)}
          />
        ) : (
          <RxCross2
            style={{ color: "white", fontSize: "24px", cursor: "pointer" }}
            onClick={() => setShow(!show)}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
