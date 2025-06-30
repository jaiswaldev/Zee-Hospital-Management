// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
// import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [auth, setAuth] = useState({
    isAuthenticated: false,
    userRole: "",
    userName: "",
    userId: "",
  });
  const Backend_API = import.meta.env.VITE_BACKEND_URL;
  // let toastShown = false;
  // Call this on app load
  const checkAuthStatus = async () => {
    try {
      const res = await axios.post(
        `${Backend_API}/auth/refresh-token`,
        {},
        { withCredentials: true }
      );
      const message = res?.data?.message;
      const { user } = res.data.data;
      setAuth({
        isAuthenticated: true,
        userRole: user.role,
        userName: user.firstName,
        userId: user._id,
      });
      // if (!toastShown) {
      //   toast.success(message);
      //   toastShown = true;
      // }
    } catch (err) {
      // if (err?.response?.status !== 401) {
      //   console.error("Authentication check failed:", err);
      // }
      setAuth({
        isAuthenticated: false,
        userRole: "",
        userName: "",
        userId: "",
      });
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh on page load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
