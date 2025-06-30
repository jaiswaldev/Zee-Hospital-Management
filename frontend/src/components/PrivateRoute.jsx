// components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { auth,loading } = useAuth();
   if (loading) {
    return null; // or <Spinner /> if you want to show a loader
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(auth.userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
