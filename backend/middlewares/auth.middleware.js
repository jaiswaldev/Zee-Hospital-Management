import jwt from "jsonwebtoken";
import { ApiError } from "../api/ApiError.js";


export const isAuthenticated = (req, res, next) => {
  const token = req.cookies?.adminToken || req.cookies?.patientToken;

  if (!token) {
    return next(new ApiError("Not authenticated", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 👈 { id, role }
    next();
  } catch (err) {
    return next(new ApiError("Invalid/Expired token", 401));
  }
};
