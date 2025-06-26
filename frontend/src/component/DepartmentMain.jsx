import React from "react";
import Navbar from "../components/Navbar";
import DepartmentPage from "./DepartmentComp";
import Footer from "../components/Footer";

const DepartmentMain = () => {
  return (
    <>
      <Navbar />
      <div style={{ overflowX: "hidden" }} className="content">
        <DepartmentPage />

        <Footer />
      </div>
    </>
  );
};

export default DepartmentMain;
