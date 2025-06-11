import React from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Department from "../components/Department";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <div style={{ overflowX: "hidden"}} className="pt-20 gap-0">
        <Carousel />
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
