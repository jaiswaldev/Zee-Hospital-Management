import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import api from "../utils/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const response = await api.post("/login", {
        email,
        password,
        confirmPassword,
        role: "Admin"
      });
      
      if (response.data) {
        toast.success(response.data.message || "Login successful");
        setIsAuthenticated(true);
        navigateTo("/");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      if (error.code === 'ECONNABORTED') {
        toast.error("Request timed out. Please try again.");
      } else if (!error.response) {
        toast.error("Cannot connect to server. Please check your internet connection.");
      } else if (error.response.status === 401) {
        toast.error("Invalid credentials. Please check your email and password.");
      } else if (error.response.status === 400) {
        const errorMessage = error.response.data?.message || "Invalid request. Please check your input.";
        toast.error(errorMessage);
      } else if (error.response.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error(error.response?.data?.message || "An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5"
    }}>
      <section style={{
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <img 
            src="/logo.png" 
            alt="logo" 
            style={{ 
              width: "120px", 
              height: "auto",
              marginBottom: "1rem"
            }} 
          />
          <h1 style={{ 
            color: "#4164e3",
            fontSize: "1.5rem",
            marginBottom: "0.5rem"
          }}>
            WELCOME TO ZEECARE
          </h1>
          <p style={{ color: "#666" }}>
            Only Admins Are Allowed To Access These Resources!
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem"
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem"
            }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            autoComplete="new-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem"
            }}
          />
          <button 
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#4164e3",
              color: "white",
              padding: "0.75rem",
              border: "none",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Login;
