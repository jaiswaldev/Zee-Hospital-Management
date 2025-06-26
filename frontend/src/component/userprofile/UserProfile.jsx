import React from "react";
import "./User.css";
import Cover from "./Cover";
import MainArea from "./MainArea";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const UserProfile = () => {
  return (
    <>
      <Navbar />
      <div className="content">
        <Cover />
        <MainArea />
        <Footer />
      </div>
    </>
  );
};

export default UserProfile;
