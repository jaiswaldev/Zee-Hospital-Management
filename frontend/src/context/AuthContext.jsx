import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

// Create the context
export const AuthContext = createContext();

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [auth, setAuth] = useState({
    isAuthenticated: false,
    userRole: "",
    userName: "",
    userId: "",
    onlineUsers: [],
    socket: null,
    status: ""
  });

  const Backend_API = import.meta.env.VITE_BACKEND_URL;

  // Check JWT and refresh if needed
  const checkAuthStatus = async () => {
    try {
      const res = await axios.post(
        `${Backend_API}/auth/refresh-token`,
        {},
        { withCredentials: true }
      );
      // console.log("Auth check response:", res.data.data.user);
      const user = res.data.data.user;
      if (!user) {
        setAuth({
          isAuthenticated: false,
          userRole: "",
          userName: "",
          userId: "",
          onlineUsers: [],
          socket: null,
          status: ""
        });
        return;
      }
      // console.log("User data:", user);
      setAuth((prev) => ({
        ...prev,
        isAuthenticated: true,
        userRole: user.role,
        userName: user.firstName,
        userId: user._id,
        status: user.status,
      }));
    } catch (err) {
      setAuth({
        isAuthenticated: false,
        userRole: "",
        userName: "",
        userId: "",
        onlineUsers: [],
        socket: null,
        status: ""
      });
    } finally {
      setLoading(false);
    }
  };

  // Initialize auth + socket.io
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Socket connection
  useEffect(() => {
    if (!auth.isAuthenticated || !auth.userId) return;

    const socket = io("http://localhost:4000", {
      withCredentials: true,
      query: {
        userId: auth.userId, 
      },
    });

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("getOnlineUsers", (onlineList) => {
      setAuth((prev) => ({
        ...prev,
        onlineUsers: onlineList,
      }));
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    // Save socket
    setAuth((prev) => ({
      ...prev,
      socket,
    }));

    return () => {
      socket.disconnect();
    };
  }, [auth.isAuthenticated, auth.userId]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
