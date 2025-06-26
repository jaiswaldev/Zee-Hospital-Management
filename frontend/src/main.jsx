import React, { createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "simplebar/dist/simplebar.min.css";
import axiosInstance from "./Utils/AxiosInstance";  // make sure you have your secured axios instance

export const Context = createContext();

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");

  // useEffect(() => {
  //   const role = localStorage.getItem("role");
  //   const storedUserId = localStorage.getItem("userId");

  //   // console.log("Initial auth state:", { role, storedUserId });

  //   // Try calling a protected API to check if token from cookie is valid
  //   const checkAuth = async () => {
  //     try {
  //       const res = await axiosInstance.get("/auth/verify");  // Create this simple endpoint on backend
  //       if (res.status === 200) {
  //         setIsAuthenticated(true);
  //         setUser({ role, _id: storedUserId });
  //         setUserId(storedUserId);
  //       }
  //     } catch (error) {
  //       console.log("User not authenticated", error);
  //       setIsAuthenticated(false);
  //       setUser(null);
  //       setUserId("");
  //     }
  //   };

  //   if (role && storedUserId) {
  //     checkAuth();
  //   }
  // }, []);

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        userId,
        setUserId,
      }}
    >
      <App />
      <ToastContainer position="top-center" style={{ zIndex: "99999" }} />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <AppWrapper />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
