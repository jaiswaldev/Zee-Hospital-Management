import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import SimpleBar from "simplebar-react";

import { Toaster } from "sonner";
import "./Utils/Css.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/blog";
import DoctorDashboard from "./pages/Doctor/Home";
import PatientDashboard from "./pages/Patient/Home";

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

// import DoctorViewProfile from "./page/Doctor/Doctor'sview/DoctorViewProfile";
// import DoctorWrapper from "./page/Doctor/Doctor'sview/DoctorWrapper";

/*============================Chakra UI============================*/
import DoctorViewProfile from "./page/Doctor/Doctor'sview/DoctorViewProfile";
import DoctorWrapper from "./page/Doctor/Doctor'sview/DoctorWrapper";

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
/*======================================*/

/*============================Material UI============================*/
// export const myTheme = createTheme({
//   palette: {
//     primary: {
//       main: "#e91e63",
//     },
//     secondary: {
//       main: "#f48fb1",
//     },
//     alternate: {
//       main: "#fff",
//     },
//     text: {
//       secondary: "#212121",
//     },
//   },
//   typography: {
//     fontFamily: "Quicksand",
//     fontWeightLight: 400,
//     fontWeightRegular: 500,
//     fontWeightMedium: 600,
//     fontWeightBold: 700,
//   },
// });
/*======================================*/

const App = () => {
  const location = useLocation();

  const getAuthState = () => {
    if (location.pathname === "/doctor/dashboard") {
      return {
        isLoggedIn: true,
        userRole: "doctor",
        userName: "Dr. Sarah Johnson",
        userAvatar: undefined,
      };
    } else if (location.pathname === "/patient/dashboard") {
      return {
        isLoggedIn: true,
        userRole: "patient",
        userName: "John Doe",
        userAvatar: undefined,
      };
    }
    return {
      isLoggedIn: false,
      userRole: undefined,
      userName: undefined,
      userAvatar: undefined,
    };
  };

  const authState = getAuthState();

  return (
    <>
      <Toaster richColors position="top-center" />
      <ThemeProvider theme={myTheme}>
        <CssBaseline />
        {/* <SimpleBar style={{ maxHeight: "100vh" }}> */}
        <ChakraProvider theme={theme}>
          <Navbar {...authState} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            {/* <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} /> */}

            {/* <Route path="/doctors" element={<Doctors />} />
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <SimpleBar style={{ maxHeight: "100vh" }}>
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
        </ChakraProvider>
        {/* </SimpleBar> */}
      </ThemeProvider>
    </>
  );
};

export default App;
