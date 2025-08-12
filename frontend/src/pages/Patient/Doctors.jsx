import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Backend_API = import.meta.env.VITE_BACKEND_URL;

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${Backend_API}/patient/auth/verified-doctors`,
        { withCredentials: true }
      );

      const doctorsArray = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
        ? res.data.data
        : [];

      if (speciality) {
        setFilterDoc(
          doctorsArray.filter((doc) => doc.specialization === speciality)
        );
      } else {
        setFilterDoc(doctorsArray);
      }
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setFilterDoc([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [speciality]);

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  const getDoctorImage = (gender) => {
    if (gender === "Male") return "/doctors/male_doctor.png";
    if (gender === "Female") return "/doctors/female_doctor.png";
    return "/doctors/neutral_doctor.png";
  };

  return (
    <div className="pt-24 px-10 sm:px-30">
      <p className="text-gray-600 text-center sm:text-left">
        Browse through the doctors specialist.
      </p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Mobile Filter Toggle */}
        <button
          className={`py-1 px-4 border rounded text-sm transition-all lg:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>

        {/* Filter Menu */}
        <div
          className={`flex-col gap-4 text-sm text-gray-600 w-full sm:w-auto ${
            showFilter ? "flex" : "hidden lg:flex"
          }`}
        >
          {specialities.map((spec) => (
            <p
              key={spec}
              onClick={() =>
                speciality === spec
                  ? navigate("/patient/find-doctors")
                  : navigate(`/patient/find-doctors/${spec}`)
              }
              className={`pl-3 py-1.5 pr-4 border border-gray-300 rounded cursor-pointer text-center sm:text-left ${
                speciality === spec ? "bg-indigo-100 text-black" : ""
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctors List */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <p className="text-gray-500">Loading doctors...</p>
          ) : filterDoc.length > 0 ? (
            filterDoc.map((item, index) => (
              <div
                onClick={() => navigate(`/patient/appointment/${item._id}`)}
                className="min-w-[150px] border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300 flex flex-col"
                key={index}
              >
                <img
                  className="bg-blue-50 w-full h-48 sm:h-64 "
                  src={getDoctorImage(item.gender)}
                  alt={`${item.firstName} ${item.lastName}`}
                />
                <div className="p-4 flex flex-col flex-1">
                  <div
                    className={`flex items-center gap-2 text-sm ${
                      item.available ? "text-green-500" : "text-gray-500"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.available ? "bg-green-500" : "bg-gray-500"
                      }`}
                    ></span>
                    <p>{item.available ? "Available" : "Not Available"}</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium mt-1">
                    Dr. {item.firstName} {item.lastName}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {item.specialization || "General Physician"}
                  </p>
                  {/* <div className="mt-auto">
                    <button className="mt-4 bg-blue-500 text-white py-1 px-3 rounded-lg text-sm hover:bg-blue-600">
                      Book Appointment
                    </button>
                  </div> */}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No doctors found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
