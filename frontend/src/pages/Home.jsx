import React from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel.jsx";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Department from "../components/Department";
import Footer from "../components/Footer";

import slides from "../data/home-carousel.json";

const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div style={{ overflowX: "hidden" }} className="pt-15 gap-0">
        <Carousel slides={slides} />
        <Hero
          title={
            "Welcome to ZeeCare Medical Institute | Your Trusted Health Partner"
          }
          imageUrl={"/hero.png"}
        />
        <Biography imageUrl={"/about.png"} />
        <Department />

        <Footer />
      </div>
    </>
  );
};

export default Home;
