import { asynchandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { Patient } from "../models/patient.model.js";
import { Doctor } from "../models/doctor.model.js";

const verifyToken = async (token, model) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await model.findById(decoded._id).select("-password");
    if (!user) {
      throw new ApiError(401, "User not found or unauthorized");
    }

    return { user, role: decoded.userType };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new ApiError(401, "Access token expired");
    }
    throw new ApiError(401, "Invalid access token");
  }
};

export const verifyUserJWT = asynchandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Access token missing");
  }

  // Try verifying token as patient
  try {
    const { user, role } = await verifyToken(token, Patient);
    req.user = user;
    req.userType = role || "patient";
    return next();
  } catch (_) {
    // If patient verification fails, try doctor
    try {
      const { user, role } = await verifyToken(token, Doctor);
      req.user = user;
      req.userType = role || "doctor";
      return next();
    } catch (err) {
      throw new ApiError(401, "Invalid or expired access token");
    }
  }
});
