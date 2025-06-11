import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AppointementForm from "../component/AppointementForm";
import Footer from "../components/Footer";
//import "../Css.css";

const Appointment = () => {
  return (
    <>
      <Navbar />
      <div className="content">
        <Hero
          title={"Schedule Your Appointment | ZeeCare Medical Institute"}
          imageUrl={"signin.png"}
        />
        <AppointementForm />
        <Footer />
      </div>
    </>
  );
};

export default Appointment;
