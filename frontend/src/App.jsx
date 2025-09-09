import React, { useState, useContext, useEffect, lazy, Suspense } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Toaster } from "sonner";
import "./Utils/Css.css";
import { useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/blog";
import Store from "./pages/Store";

const DoctorDashboard = lazy(() => import("./pages/Doctor/Home"));
const PatientDashboard = lazy(() => import("./pages/Patient/Home"));
const DoctorMessageApp = lazy(() => import("./pages/Doctor/MessageApp"));
const PatientMessageApp = lazy(() => import("./pages/Patient/MessageApp"));
const Cart = lazy(()=> import("./pages/Store/Cart"));

import Add_product from "./pages/Store/Add_product";

import Doctors from "./pages/Patient/Doctors";

const App = () => {
  const { auth, setAuth } = useAuth();

  const cld = new Cloudinary({
    cloud: {
      cloudName: "duhnmjhli",
    },
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
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/admin/store" element={<Add_product />} />

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
            path="/patient/:find-doctors"
            element={
              <PrivateRoute allowedRoles={["patient"]}>
                <Doctors />
              </PrivateRoute>
            }
          />
          <Route
            path="/patient/find-doctors/:speciality"
            element={
              <PrivateRoute allowedRoles={["patient"]}>
                <Doctors />
              </PrivateRoute>
            }
          />

          {/* store */}
          <Route path="/store/cart" element={<Cart />} />
          <Route path="/store:ProductId" element={<Store />} />
          <Route path="/store" element={<Store />} />
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
      </Suspense>
    </>
  );
};

export default App;
