import React from "react";
import Carousel from "../components/Carousel";
import medicineSlides from "../data/meds-carousel.json";

const MedicinesPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold my-6 text-center">Our Medicine Services</h1>
      <Carousel slides={medicineSlides} />
    </div>
  );
};

export default MedicinesPage;
