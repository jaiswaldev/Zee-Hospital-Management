import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
=======
import Home from "./pages/Utils/Home";
import Appointment from "./pages/Utils/Appointment";
import Register from "./pages/Utils/Register";
import Login from "./pages/Utils/Login";
import AboutUs from "./pages/Utils/AboutUs";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Context } from "./main";
import axios from "axios";
import Contact from "./pages/contact/Contact";
>>>>>>> 53fda2c9b186f7632ce2c80ea7b45137813be5af
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import SimpleBar from "simplebar-react";


import "./Utils/Css.css";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/blog";
import Register from "./components/Register";
import Login from "./components/Login";



import Appointment from "./Utils/Appointment";



import "react-toastify/dist/ReactToastify.css";

import { Context } from "./main";
import axios from "axios";
import Contact from "./page/contact/Contact";

import UserProfile from "./component/userprofile/UserProfile";

import ProtectedRoute from "./component/ProtectedRoute";
import Doctors from "./page/Doctor/Doctors";
import DoctorProfile from "./page/Doctor/DoctorProfile";
import DepartmentPage from "./component/DepartmentComp";
import DepartmentMain from "./component/DepartmentMain";
<<<<<<< HEAD

import DoctorViewProfile from "./page/Doctor/Doctor'sview/DoctorViewProfile";
import DoctorWrapper from "./page/Doctor/Doctor'sview/DoctorWrapper";

/*============================Chakra UI============================*/
=======
import DoctorViewProfile from "./pages/Doctor/Doctor'sview/DoctorViewProfile";
import DoctorWrapper from "./pages/Doctor/Doctor'sview/DoctorWrapper";

// Material UI Theme
const myTheme = createTheme({
  palette: {
    primary: {
      main: "#e91e63",
    },
    secondary: {
      main: "#f48fb1",
    },
    alternate: {
      main: "#fff",
    },
    text: {
      secondary: "#212121",
    },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

// Chakra UI Theme
>>>>>>> 53fda2c9b186f7632ce2c80ea7b45137813be5af
export const theme = extendTheme({
  colors: {
    brand: {
      blue: "#4164e3",
      cadet: "#8998a8",
      dark: "#243156",
      gray: "#a0acb9",
      green: "#36c537",
      light: "#e9ebee",
      pure: "#fafafb",
      slate: "#77889a",
      white: "#fcfdfe",
      yellow: "#ed9b13",
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          p: "6",
          color: "white",
          bg: "brand.blue",
          _hover: { bg: "brand.blue" },
          _active: { bg: "brand.blue" },
          _focus: { boxShadow: "none" },
        },
        outline: {
          bg: "transparent",
          borderWidth: "1px",
          color: "brand.cadet",
          borderColor: "brand.light",
          _hover: { bg: "brand.white" },
          _active: { bg: "brand.light" },
          _focus: { boxShadow: "none" },
        },
        ghost: {
          color: "white",
          bg: "rgba(0, 0, 0, 0.25)",
          _hover: { bg: "rgba(0, 0, 0, 0.25)" },
          _active: { bg: "rgba(0, 0, 0, 0.35)" },
          _focus: { boxShadow: "none" },
        },
        link: {
          p: "0",
          height: "full",
          bg: "transparent",
          color: "gray.500",
          rounded: "none",
          _active: { bg: "brand.light" },
          _focus: { boxShadow: "none" },
        },
      },
    },
    Tabs: {
      baseStyle: {
        tab: {
          _focus: {
            boxShadow: "none",
          },
        },
      },
    },
  },
});
<<<<<<< HEAD
/*======================================*/

/*============================Material UI============================*/
export const myTheme = createTheme({
  palette: {
    primary: {
      main: "#e91e63",
    },
    secondary: {
      main: "#f48fb1",
    },
    alternate: {
      main: "#fff",
    },
    text: {
      secondary: "#212121",
    },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});
/*======================================*/
=======
>>>>>>> 53fda2c9b186f7632ce2c80ea7b45137813be5af

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://hospital-management-r7hc.onrender.com/api/v1/user/patient/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
<<<<<<< HEAD
    <>
      <ThemeProvider theme={myTheme}>
        <CssBaseline />
        {/* <SimpleBar style={{ maxHeight: "100vh" }}> */}
          <ChakraProvider theme={theme}>
            
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/blog" element={<Blog />} />
                {/* <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} /> */}

                
                {/* <Route path="/doctors" element={<Doctors />} />
=======
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <SimpleBar style={{ maxHeight: "100vh" }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
>>>>>>> 53fda2c9b186f7632ce2c80ea7b45137813be5af
            <Route path="/doctorView" element={<DoctorWrapper />} />
            <Route path="/dept" element={<DepartmentMain />} />
            <Route path="/appointment" element={<Appointment />} />
            
            
            <Route path="/contact" element={<Contact />} />
            <Route path="/user" element={<ProtectedRoute />}>
              <Route path="profile" element={<UserProfile />} />
            </Route>
            <Route path="/doctorProfile" element={<DoctorProfile />} />
<<<<<<< HEAD
            <Route path="/*" element={<Login />}></Route> */}
              </Routes>
           
          </ChakraProvider>
        {/* </SimpleBar> */}
      </ThemeProvider>
    </>
=======
            <Route path="/*" element={<Login />}></Route>
          </Routes>
        </Router>
      </SimpleBar>
    </ThemeProvider>
>>>>>>> 53fda2c9b186f7632ce2c80ea7b45137813be5af
  );
};

export default App;
