import React, { useContext, useState, useEffect } from "react";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import SideBar from "./SideBar";

const API_URL = "http://localhost:3000/api/v1";

const AddNewAdmin = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [serverStatus, setServerStatus] = useState("checking");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [Adhar, setAdhar] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

  const validateForm = () => {
    // First Name validation
    if (!firstName || firstName.length < 3) {
      toast.error("First name must contain at least 3 characters");
      return false;
    }

    // Last Name validation
    if (!lastName || lastName.length < 3) {
      toast.error("Last name must contain at least 3 characters");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Phone validation
    if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be exactly 10 digits");
      return false;
    }

    // Aadhar validation
    if (!Adhar || Adhar.length !== 12 || !/^\d{12}$/.test(Adhar)) {
      toast.error("Aadhar number must be exactly 12 digits");
      return false;
    }

    // DOB validation
    if (!dob) {
      toast.error("Date of birth is required");
      return false;
    }

    // Gender validation
    if (!gender || !["Male", "Female", "Transgender"].includes(gender)) {
      toast.error("Please select a valid gender");
      return false;
    }

    // Password validation
    if (!password || password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }

    return true;
  };

  const handleAddNewAdmin = async (e) => {
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
      console.log("Submitting admin data:", {
        firstName,
        lastName,
        email,
        phone,
        Adhar,
        dob,
        gender,
        role: "Admin"
      });

      const response = await axios.post(
        `${API_URL}/user/admin/addnew`,
        {
          firstName,
          lastName,
          email,
          phone,
          Adhar,
          dob,
          gender,
          password,
          role: "Admin"
        },
        {
          withCredentials: true,
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          timeout: 30000 // 30 seconds timeout
        }
      );

      console.log("Admin registration response:", response.data);
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
      
      // Navigate to dashboard
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      if (error.code === 'ECONNABORTED') {
        toast.error("Request timed out. Please try again.");
      } else if (!error.response) {
        toast.error("Network error. Please check your internet connection and try again.");
        setServerStatus("error");
      } else {
        const errorMessage = error.response?.data?.message || "Failed to register admin. Please try again.";
        console.error("Server error:", errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return navigate("/login");
  }

  return (
    <>
      <SideBar />
      <section className="page" style={{ backgroundColor: " #0e8797 " }}>
        <section className="container form-component add-admin-form">
          <img src="/logo.png" alt="logo" className="logo" />
          <h1 className="form-title">ADD NEW ADMIN</h1>
          <form onSubmit={handleAddNewAdmin}>
            <div>
              <input
                type="text"
                placeholder="First Name (min 3 characters)"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                minLength="3"
                required
              />
              <input
                type="text"
                placeholder="Last Name (min 3 characters)"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                minLength="3"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Mobile Number (10 digits)"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                pattern="[0-9]{10}"
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Aadhar Number (12 digits)"
                value={Adhar}
                onChange={(e) => setAdhar(e.target.value.replace(/\D/g, '').slice(0, 12))}
                pattern="[0-9]{12}"
                required
              />
              <input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>
            <div>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
              </select>
              <input
                type="password"
                placeholder="Password (min 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="8"
                required
              />
            </div>
            <div style={{ justifyContent: "center", alignItems: "center" }}>
              <button type="submit" disabled={loading}>
                {loading ? "Adding Admin..." : "ADD NEW ADMIN"}
              </button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default AddNewAdmin;
