import React, { useState, useContext, useEffect } from "react";
import {Cloudinary} from "@cloudinary/url-gen";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import { ChakraProvider } from "@chakra-ui/react";
// import { extendTheme } from "@chakra-ui/react";
// import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
// import { createTheme } from "@mui/material/styles";
import SimpleBar from "simplebar-react";

import { Toaster } from "sonner";
import "./Utils/Css.css";
import { useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/blog";
import Store from "./pages/Store";
import DoctorDashboard from "./pages/Doctor/Home";
import PatientDashboard from "./pages/Patient/Home";
import Cart from './pages/Store/Cart';
import Add_product from './pages/Store/Add_product';
import DoctorMessageApp from "./pages/Doctor/MessageApp";
import PatientMessageApp from "./pages/Patient/MessageApp";
import Doctors from "./pages/Patient/Doctors";

import Appointment from "./Utils/Appointment";

// import "react-toastify/dist/ReactToastify.css";

// import { Context } from "./main";
import axios from "axios";
import Contact from "./page/contact/Contact";

import UserProfile from "./component/userprofile/UserProfile";

// import ProtectedRoute from "./component/ProtectedRoute";

import DoctorProfile from "./page/Doctor/DoctorProfile";
import DepartmentPage from "./component/DepartmentComp";
import DepartmentMain from "./component/DepartmentMain";

// import DoctorViewProfile from "./page/Doctor/Doctor'sview/DoctorViewProfile";
// import DoctorWrapper from "./page/Doctor/Doctor'sview/DoctorWrapper";

/*============================Chakra UI============================*/
import DoctorViewProfile from "./page/Doctor/Doctor'sview/DoctorViewProfile";
import DoctorWrapper from "./page/Doctor/Doctor'sview/DoctorWrapper";


const App = () => {
  const { auth, setAuth } = useAuth();


  const cld = new Cloudinary({
    cloud: {
      cloudName: 'duhnmjhli'
    }
  });

  return (
    <>
      <Toaster richColors position="top-center" duration={1000} />
      <Navbar
        isLoggedIn={auth.isAuthenticated}
        setIsAuthenticated={(val) => setAuth({ ...auth, isAuthenticated: val })}
        userRole={auth.userRole}
        userName={auth.userName}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/admin/store" element={<Add_product/>}/>

        {/* doctor */}
        <Route
          path="/doctor/chat"
          element={
            <PrivateRoute allowedRoles={["doctor"]}>
              <DoctorMessageApp />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor"
          element={
            <PrivateRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </PrivateRoute>
          }
        />
        {/* patient */}
        <Route
          path="/patient/chat"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <PatientMessageApp />
            </PrivateRoute>
          }
        />
        <Route
          path="/patient"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <PatientDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/patient/find-doctors"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <Doctors />
            </PrivateRoute>
          }
        />

        {/* store */}
        <Route
          path="/store/cart"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/store:ProductId"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <Store />
            </PrivateRoute>
          }
        />
        <Route
          path="/store"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <Store />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Home />} />
        {/* <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} /> */}

        {/* <Route path="/doctors" element={<Doctors />} />
    
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctorView" element={<DoctorWrapper />} />
            <Route path="/dept" element={<DepartmentMain />} />
            <Route path="/appointment" element={<Appointment />} />
            
            
            <Route path="/contact" element={<Contact />} />
            <Route path="/user" element={<ProtectedRoute />}>
              <Route path="profile" element={<UserProfile />} />
            </Route>
            <Route path="/doctorProfile" element={<DoctorProfile />} />
            <Route path="/*" element={<Login />}></Route> */}
      </Routes>
    </>
  );
};

export default App;
