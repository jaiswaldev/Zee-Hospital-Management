import React, { useContext, useState } from "react";
import { Context } from "../main";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// import "./../App";

const API_URL = "http://localhost:3000/api/v1";

const SideBar = () => {
  const [show, setShow] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent multiple clicks
    
    setIsLoggingOut(true);
    try {
      console.log("Attempting to logout...");
      const response = await axios.get(
        `${API_URL}/user/admin/logout`,
        {
          withCredentials: true,
          headers: {
            'Accept': 'application/json'
          },
          timeout: 10000 // 10 second timeout
        }
      );
      
      console.log("Logout response:", response.data);
      toast.success(response.data.message || "Logged out successfully");
      setIsAuthenticated(false);
      navigate("/login"); // Navigate to login page after successful logout
    } catch (error) {
      console.error("Logout error:", error);
      if (!error.response) {
        toast.error("Network error. Please check your internet connection.");
      } else {
        const errorMessage = error.response?.data?.message || "Failed to logout. Please try again.";
        toast.error(errorMessage);
      }
    } finally {
      setIsLoggingOut(false);
    }
  };

  const gotoHomePage = () => {
    navigate("/");
    setShow(false);
  };

  const gotoDoctorsPage = () => {
    navigate("/admin/doctor");
    setShow(false);
  };

  const gotoMessagesPage = () => {
    navigate("/admin/message");
    setShow(false);
  };

  const gotoAddNewDoctor = () => {
    navigate("/admin/addNewDoctor");
    setShow(false);
  };

  const gotoAddNewAdmin = () => {
    navigate("/admin/addNewAdmin");
    setShow(false);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <nav className={show ? "show sidebar" : "sidebar"}>
        <div className="links">
          <TiHome onClick={gotoHomePage} title="Home" />
          <FaUserDoctor onClick={gotoDoctorsPage} title="Doctors" />
          <IoPersonAddSharp onClick={gotoAddNewDoctor} title="Add New Doctor" />
          <MdAddModerator onClick={gotoAddNewAdmin} title="Add New Admin" />
          <AiFillMessage onClick={gotoMessagesPage} title="Messages" />
          <RiLogoutBoxFill 
            onClick={handleLogout} 
            title="Logout"
            style={{ cursor: isLoggingOut ? 'not-allowed' : 'pointer' }}
          />
        </div>
      </nav>
      <div className="wrapper">
        {show ? (
          <RxCross2
            style={{ strokeWidth: "1", fontSize: "80px" }}
            className="hamburger"
            onClick={() => setShow(false)}
            title="Close Menu"
          />
        ) : (
          <GiHamburgerMenu
            className="hamburger"
            onClick={() => setShow(true)}
            title="Open Menu"
          />
        )}
      </div>
    </>
  );
};

export default SideBar;
