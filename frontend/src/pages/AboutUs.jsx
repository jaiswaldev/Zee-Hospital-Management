import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
//import '../Css.css'

const AboutUs = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="pt-15">
        <Hero
          title={"Learn More About Us | ZeeCare Medical Institute"}
          imageUrl={"/about.png"}
        />
        <Biography imageUrl={"/whoweare.png"} />

        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
