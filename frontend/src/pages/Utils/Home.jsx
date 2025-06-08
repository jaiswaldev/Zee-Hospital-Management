import React from "react";
import Hero from "../../component/Hero";
import Biography from "../../component/Biography";
import Department from "../../component/Department";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import ServiceDetails from "../../component/ServiceDetails";
import CrousalCom from "../../component/CrousalCom";
//import "../Css.css";

const Home = () => {
  return (
    <div style={{ paddingTop: "80px" }}>
      <Navbar />
      <div style={{ overflowX: "hidden" }}>
        <CrousalCom />
        <Hero
          title="Welcome to ZeeCare Medical Institute | Your Trusted Health Partner"
          imageUrl="/images/hero.png"
        />
        <Biography imageUrl="/images/about.png" />
        <Department />
        <ServiceDetails />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
