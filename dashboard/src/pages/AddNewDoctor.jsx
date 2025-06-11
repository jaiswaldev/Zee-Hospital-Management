import React, { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";
import SideBar from "./SideBar";

const API_URL = "http://localhost:3000/api/v1";

const AddNewDoctor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [serverStatus, setServerStatus] = useState("checking");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [Adhar, setAdhar] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();

  // Check server status on component mount
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await axios.get(`${API_URL}/health`, {
          timeout: 5000,
          headers: {
            'Accept': 'application/json'
          }
        });
        if (response.data.status === "success") {
          setServerStatus("online");
        } else {
          setServerStatus("error");
        }
      } catch (error) {
        console.error("Server status check failed:", error);
        setServerStatus("error");
      }
    };

    checkServerStatus();
  }, []);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setDocAvatarPreview(reader.result);
        setDocAvatar(file);
      };
    }
  };

  const validateForm = () => {
    if (!firstName || !lastName || !email || !phone || !Adhar || !dob || !gender || !password || !doctorDepartment) {
      toast.error("All fields are required");
      return false;
    }
    if (phone.length !== 10) {
      toast.error("Phone number must be 10 digits");
      return false;
    }
    if (Adhar.length !== 12) {
      toast.error("Aadhar number must be 12 digits");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (!docAvatar) {
      toast.error("Please upload a profile picture");
      return false;
    }
    return true;
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (serverStatus !== "online") {
      toast.error("Server is currently unavailable. Please try again later.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("Adhar", Adhar);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);
      formData.append("role", "Doctor");

      const response = await axios.post(
        `${API_URL}/user/doctor/addnew`,
        formData,
        {
          withCredentials: true,
          headers: { 
            "Content-Type": "multipart/form-data",
            "Accept": "application/json"
          },
          timeout: 30000 // 30 seconds timeout
        }
      );

      toast.success(response.data.message);
      setIsAuthenticated(true);
      
      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAdhar("");
      setDob("");
      setGender("");
      setPassword("");
      setDoctorDepartment("");
      setDocAvatar("");
      setDocAvatarPreview("");
      
      // Navigate to doctors list with correct path
      navigateTo("/admin/doctor");
    } catch (error) {
      console.error("Registration error:", error);
      if (error.code === 'ECONNABORTED') {
        toast.error("Request timed out. Please try again.");
      } else if (!error.response) {
        toast.error("Network error. Please check your internet connection and try again.");
        setServerStatus("error");
      } else {
        toast.error(error.response?.data?.message || "Failed to register doctor. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <SideBar />
      <section className="page" style={{ backgroundColor: " #0e8797 " }}>
        <section className="container add-doctor-form">
          <img src="/logo.png" alt="logo" className="logo" />
          <h1 className="form-title">REGISTER A NEW DOCTOR</h1>
          {serverStatus === "checking" && (
            <div className="server-status checking">
              Checking server connection...
            </div>
          )}
          {serverStatus === "error" && (
            <div className="server-status error">
              Server is currently unavailable. Please try again later.
            </div>
          )}
          <form onSubmit={handleAddNewDoctor}>
            <div className="first-wrapper">
              <div>
                <img
                  src={docAvatarPreview || "/docHolder.jpg"}
                  alt="Doctor Avatar"
                />
                <input 
                  type="file" 
                  onChange={handleAvatar}
                  accept="image/*"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={serverStatus !== "online"}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={serverStatus !== "online"}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={serverStatus !== "online"}
                />
                <input
                  type="number"
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  minLength={10}
                  maxLength={10}
                  disabled={serverStatus !== "online"}
                />
                <input
                  type="number"
                  placeholder="Aadhar Number"
                  value={Adhar}
                  onChange={(e) => setAdhar(e.target.value)}
                  required
                  minLength={12}
                  maxLength={12}
                  disabled={serverStatus !== "online"}
                />
                <input
                  type="date"
                  placeholder="Date of Birth"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  disabled={serverStatus !== "online"}
                />
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  disabled={serverStatus !== "online"}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={serverStatus !== "online"}
                />
                <select
                  value={doctorDepartment}
                  onChange={(e) => setDoctorDepartment(e.target.value)}
                  required
                  disabled={serverStatus !== "online"}
                >
                  <option value="">Select Department</option>
                  {departmentsArray.map((depart, index) => (
                    <option value={depart} key={index}>
                      {depart}
                    </option>
                  ))}
                </select>
                <button 
                  type="submit" 
                  disabled={loading || serverStatus !== "online"}
                >
                  {loading ? "Registering..." : "Register New Doctor"}
                </button>
              </div>
            </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default AddNewDoctor;
