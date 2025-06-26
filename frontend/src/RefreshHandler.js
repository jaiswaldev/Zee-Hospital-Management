import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

function RefreshHandler() {
  const { setAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const token = getCookie("accessToken");

    if (token) {
      const role = location.pathname.includes("/doctor") ? "doctor" : "patient";
      setAuth({
        isAuthenticated: true,
        userRole: role,
        userName: role === "doctor" ? "Dr. Sarah Johnson" : "John Doe",
      });
    }
  }, [location]);

  return null;
}

export default RefreshHandler;
