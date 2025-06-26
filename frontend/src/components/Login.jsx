// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import axios from "axios";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { Eye, EyeOff } from "lucide-react";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";
// import axiosInstance, { setAccessToken } from '../Utils/AxiosInstance';

// const Login = ({ onSwitchToRegister }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const Backend_API = import.meta.env.VITE_BACKEND_URL;
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password || !role) {
//       toast.error("Please fill all fields.");
//       return;
//     }

//     const endpoint =
//       role === "patient"
//         ? `${Backend_API}/patient/login`
//         : `${Backend_API}/doctor/login`;
//     // setLoading(true);
//     try {
//       const res = await axios.post(
//         endpoint,
//         { email, password, role },
//         { withCredentials: true }
//       );

//       const data = res.data; // Axios automatically parses response JSON

//       // toast.success("Login successful!");
//       console.log("Login successful!", data);

//       setAccessToken(data.data.AccessToken);
//       // localStorage.setItem("role", data.data.role);
//       // localStorage.setItem("userId", data.data.user._id);

//       if (data.data.role === "doctor") {
//         navigate("/doctor/dashboard");
//       } else if (data.data.role === "patient") {
//         navigate("/patient/dashboard");
//       }
//     } catch (err) {
//       const errorMsg = err.response?.data?.message || "Login failed";
//       toast.error(errorMsg);
//     }
//   };

//   return (
//     <div className="h-100 overflow-y-auto min-w-xl">
//       <Card>
//         <CardHeader className="text-center space-y-2">
//           <CardTitle className="text-3xl font-bold text-gray-800">
//             ZeeCare Login
//           </CardTitle>
//           <p className="text-gray-600">Access your account</p>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email Field */}
//             <div className="space-y-2">
//               <Label
//                 htmlFor="email"
//                 className="text-sm font-medium text-gray-700"
//               >
//                 Email Address
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 autoComplete="email"
//                 placeholder="Enter your email"
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 outline mt-1"
//               />
//             </div>

//             {/* Password Field */}
//             <div className="space-y-2">
//               <Label
//                 htmlFor="password"
//                 className="text-sm font-medium text-gray-700"
//               >
//                 Password
//               </Label>
//               <div className="relative">
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   autoComplete="current-password"
//                   placeholder="Enter your password"
//                   required
//                   className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 outline mt-1"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//             </div>

//             {/* Role Selection */}
//             <div className="space-y-2">
//               <Label
//                 htmlFor="role"
//                 className="text-sm font-medium text-gray-700"
//               >
//                 Login as *
//               </Label>
//               <div className="mt-1 border-cyan-400 outline rounded-md shadow-sm h-10">
//                 <Select value={role} onValueChange={(v) => setRole(v)} required>
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select your role" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-white">
//                     <SelectItem value="doctor" className="hover:bg-amber-50">
//                       Doctor
//                     </SelectItem>
//                     <SelectItem value="patient" className="hover:bg-amber-50">
//                       Patient
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div
//               className={`w-full h-10 flex items-center justify-center rounded-xl text-lg font-semibold transition-all duration-200 ${
//                 role === "doctor"
//                   ? "bg-blue-600 hover:bg-blue-700"
//                   : "bg-green-600 hover:bg-green-700"
//               }`}
//             >
//               <Button type="submit" disabled={!email || !password || !role}>
//                 Login
//               </Button>
//             </div>

//             {/* Additional Links */}
//             <div className="text-center space-y-2 flex flex-col items-center">
//               <div className="text-blue-600 hover:text-blue-800  cursor-pointer w-40">
//                 <Button>Forgot Password?</Button>
//               </div>

//               <div className="mt-4 text-center text-sm text-gray-600 flex items-center">
//                 Don't have an account?
//                 <div className="text-blue-600 hover:text-blue-800 font-medium ml-1">
//                   <button type="button" onClick={onSwitchToRegister}>
//                     Register here
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Stethoscope, Heart, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axiosInstance, { setAccessToken } from "../Utils/AxiosInstance";

const Login = ({ onSwitchToRegister, onLogin }) => {
  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorPassword, setDoctorPassword] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPassword, setPatientPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const Backend_API = import.meta.env.VITE_BACKEND_URL; // update as per your backend

  const handleSubmit = async (role, email, password) => {
    if (!email || !password || !role) {
      toast.error("Please fill all fields.");
      return;
    }

    const endpoint =
      role === "patient"
        ? `${Backend_API}/patient/login`
        : `${Backend_API}/doctor/login`;

    try {
      const res = await axios.post(
        endpoint,
        { email, password, role },
        { withCredentials: true }
      );

      const data = res.data;
      console.log("Login successful!", data);
      setAccessToken(data.data.AccessToken);

      if (data.data.role === "doctor") {
        navigate("/doctor/dashboard");
      } else if (data.data.role === "patient") {
        navigate("/patient/dashboard");
      }
    } catch (err) {
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
    <div className="h-100 overflow-y-auto min-w-xl">
      <Card>
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold text-gray-800">
            ZeeCare Login
          </CardTitle>
          <p className="text-gray-600">Access your account</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="patient" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-200 mb-3">
              <TabsTrigger
                value="patient"
                className="flex items-center space-x-2 "
              >
                <Heart className="h-4 w-4" />
                <span>Patient</span>
              </TabsTrigger>
              <TabsTrigger
                value="doctor"
                className="flex items-center space-x-2"
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
                    // required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 outline mt-1"
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
                      // required
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 outline mt-1"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div className="w-full h-10 flex items-center justify-center rounded-xl text-lg font-semibold transition-all duration-200 bg-green-600 hover:bg-green-700">
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </div>

                {/* Additional Links */}
                <div className="text-center flex flex-col items-center">
                  <div className="text-blue-600 hover:text-blue-800  cursor-pointer w-40">
                    <Button>Forgot Password?</Button>
                  </div>

                  <div className="text-center text-sm text-gray-600 flex items-center">
                    Don't have an account?
                    <div className="text-blue-600 hover:text-blue-800 font-medium ml-1">
                      <button type="button" onClick={onSwitchToRegister}>
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
                    // required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 outline mt-1"
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
                      // required
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 outline mt-1"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div className="w-full h-10 flex items-center justify-center rounded-xl text-lg font-semibold transition-all duration-200  bg-blue-600 hover:bg-blue-700">
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </div>

                {/* Additional Links */}
                <div className="text-center flex flex-col items-center">
                  <div className="text-blue-600 hover:text-blue-800  cursor-pointer w-40">
                    <Button>Forgot Password?</Button>
                  </div>

                  <div className="text-center text-sm text-gray-600 flex items-center">
                    Don't have an account?
                    <div className="text-blue-600 hover:text-blue-800 font-medium ml-1">
                      <button type="button" onClick={onSwitchToRegister}>
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
