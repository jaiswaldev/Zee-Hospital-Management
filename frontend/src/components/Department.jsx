import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
// import "../Css.css";

const Department = () => {
  const navigate=useNavigate();
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/ortho.jpg",
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
    },
    {
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
    },
  ];
  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const handleClick=()=>{
    navigate("/dept");
  }
  return (
    <>
      <div
        style={{
          marginBottom: "30px",
          zindex:2,
        }}
        className="container department"
      >
        <h2>Departments</h2>
        <Carousel
          style={{
            boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
          responsive={responsive}
          removeArrowOnDeviceType={["medium", "small "]}
        >
          {departmentsArray.map((depart, index) => {
            return (
              <div onClick={handleClick} style={{ cursor: "pointer" }} className="card" key={index}>
                <div className="depart-name dep-hov">{depart.name}</div>
                <img src={depart.imageUrl} alt={depart.name} />
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Department;
