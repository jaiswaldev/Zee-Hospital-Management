import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Stethoscope, Heart, Eye, EyeOff } from "lucide-react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../Utils/AxiosInstance";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

const Login = ({ onSwitchToRegister, onLoginSuccess }) => {
  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorPassword, setDoctorPassword] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPassword, setPatientPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const Backend_API = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (role, email, password) => {
    if (!email || !password || !role) {
      toast.error("Please fill all fields.");
      return;
    }

    const endpoint =
      role === "patient"
        ? `${Backend_API}/patient/auth/login`
        : `${Backend_API}/doctor/auth/login`;

    try {
      const res = await axios.post(
        endpoint,
        { email, password },
        { withCredentials: true }
      );

      const data = res.data;

      setAuth({
        isAuthenticated: true,
        userRole: role, // e.g., "doctor" or "patient"
        userName: data.data.user.firstName, // e.g., "Dr. Smith"
        userId: data.data.user._id,
        status: data.data.user.status,
      });

      // console.log("Login successful!", data);
      const message = res?.data?.message || "Logged IN successfully.";
      const success = res?.data?.success;

      if (success) {
        toast.success(message);
        // localStorage.setItem("role", role);
        setTimeout(() => {
          if (role === "doctor") {
            navigate("/doctor");
          } else if (role === "patient") {
            navigate("/patient");
          }
          
        }, 300);
        onLoginSuccess();
      }
    } catch (err) {
      console.log("Login error:", err);
      const errorMsg = err.response?.data?.message || "Login failed";
      toast.error(errorMsg);
    }
  };

  const handlePatientLogin = (e) => {
    e.preventDefault();
    handleSubmit("patient", patientEmail, patientPassword);
  };

  const handleDoctorLogin = (e) => {
    e.preventDefault();
    handleSubmit("doctor", doctorEmail, doctorPassword);
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br  px-2 sm:px-4 md:px-6">
      <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl shadow-lg rounded-2xl bg-transparent">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800">
            ZeeCare Login
          </CardTitle>
          <p className="text-gray-600 text-sm sm:text-base">
            Access your account
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="patient" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-200 mb-3 ">
              <TabsTrigger
                value="patient"
                className="flex items-center space-x-2 cursor-pointer "
              >
                <Heart className="h-4 w-4" />
                <span>Patient</span>
              </TabsTrigger>
              <TabsTrigger
                value="doctor"
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Stethoscope className="h-4 w-4" />
                <span>Doctor</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="patient">
              <form onSubmit={handlePatientLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="patient-email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </Label>
                  <Input
                    id="patient-email"
                    type="email"
                    placeholder="patient@example.com"
                    autoComplete="email"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="patient-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={patientPassword}
                      autoComplete="current-password"
                      onChange={(e) => setPatientPassword(e.target.value)}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full h-10 flex items-center justify-center rounded-xl text-lg font-semibold transition-all duration-200 bg-green-600 hover:bg-green-700 cursor-pointer"
                >
                  Login
                </Button>
                <div className="text-center flex flex-col items-center">
                  <div className="text-blue-600 hover:text-blue-800 cursor-pointer w-40">
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto min-h-0 cursor-pointer"
                    >
                      Forgot Password?
                    </Button>
                  </div>
                  <div className="text-center text-sm text-gray-600 flex flex-col sm:flex-row items-center">
                    <span>Don't have an account?</span>
                    <div className="text-blue-600 hover:text-blue-800 font-medium ml-0 sm:ml-1 mt-1 sm:mt-0">
                      <button
                        type="button"
                        onClick={onSwitchToRegister}
                        className="cursor-pointer"
                      >
                        Register here
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="doctor">
              <form onSubmit={handleDoctorLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="doctor-email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </Label>
                  <Input
                    id="doctor-email"
                    type="email"
                    placeholder="doctor@example.com"
                    value={doctorEmail}
                    autoComplete="email"
                    onChange={(e) => setDoctorEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="doctor-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={doctorPassword}
                      autoComplete="current-password"
                      onChange={(e) => setDoctorPassword(e.target.value)}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full h-10 flex items-center justify-center rounded-xl text-lg font-semibold transition-all duration-200 bg-blue-600 hover:bg-blue-700 cursor-pointer"
                >
                  Login
                </Button>
                <div className="text-center flex flex-col items-center">
                  <div className="text-blue-600 hover:text-blue-800 cursor-pointer w-40">
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto min-h-0 cursor-pointer"
                    >
                      Forgot Password?
                    </Button>
                  </div>
                  <div className="text-center text-sm text-gray-600 flex flex-col sm:flex-row items-center">
                    <span>Don't have an account?</span>
                    <div className="text-blue-600 hover:text-blue-800 font-medium ml-0 sm:ml-1 mt-1 sm:mt-0">
                      <button
                        type="button"
                        onClick={onSwitchToRegister}
                        className="cursor-pointer"
                      >
                        Register here
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
