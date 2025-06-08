import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import SideBar from "./SideBar";

const API_URL = "http://localhost:3000/api/v1";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(Context);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      console.log("Fetching doctors...");
      const { data } = await axios.get(
        `${API_URL}/user/doctors`,
        { 
          withCredentials: true,
          headers: {
            'Accept': 'application/json'
          }
        }
      );
      console.log("Doctors data received:", data);
      if (data && data.doctors) {
        setDoctors(data.doctors);
      } else {
        console.error("Invalid data format received:", data);
        toast.error("Invalid data format received from server");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error(error.response?.data?.message || "Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Doctor component mounted");
    fetchDoctors();
  }, []);

  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to={"/login"} />;
  }

  console.log("Rendering doctors list. Loading:", loading, "Doctors count:", doctors.length);

  return (
    <>
      <SideBar />
      <section
        className="page doctors"
        style={{ backgroundColor: " #0e8797 " }}
      >
        <h1 style={{ color: "white" }}>DOCTORS</h1>
        <div className="banner">
          {loading ? (
            <h2>Loading doctors...</h2>
          ) : doctors && doctors.length > 0 ? (
            doctors.map((element) => {
              console.log("Rendering doctor:", element);
              return (
                <div className="card" key={element._id}>
                  <img
                    src={element.docAvatar?.url || "default-avatar.png"}
                    alt={`${element.firstName} ${element.lastName}`}
                    onError={(e) => {
                      console.error("Error loading image for doctor:", element._id);
                      e.target.src = "default-avatar.png";
                    }}
                  />
                  <h4>{`${element.firstName} ${element.lastName}`}</h4>
                  <div className="details">
                    <p>
                      Email: <span>{element.email}</span>
                    </p>
                    <p>
                      Phone: <span>{element.phone}</span>
                    </p>
                    <p>
                      DOB: <span>{element.dob?.substring(0, 10) || "N/A"}</span>
                    </p>
                    <p>
                      Department: <span>{element.doctorDepartment}</span>
                    </p>
                    <p>
                      Adhar No: <span>{element.Adhar}</span>
                    </p>
                    <p>
                      Gender: <span>{element.gender}</span>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>No Registered Doctors Found!</h1>
          )}
        </div>
      </section>
    </>
  );
};

export default Doctors;
