// component/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { auth } = useAuth();

  const isAllowed =
    auth.isAuthenticated &&
    (allowedRoles.length === 0 || allowedRoles.includes(auth.userRole));

  return isAllowed ? children : <Navigate to="/" />;
};

export default PrivateRoute;
