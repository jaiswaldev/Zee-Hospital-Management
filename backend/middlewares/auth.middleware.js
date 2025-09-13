import { User } from "../models/user.Schema.js";
import { Asynchandler } from "../utils/asynchandler.js";

import {ApiError, ErrorHandler} from "../api/ApiError.js";

import jwt from "jsonwebtoken";

export const isAdminAuthentication = Asynchandler(
  async (req, resp, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
      return next(new ApiError("Admin is not Authenticated", 400));
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = await User.findById(decoded._id);
    if (req.user.role !== "Admin") {
      return next(
        new ApiError(
          `${req.user.role} not authorized for this resources`,
          403
        )
      );
    }
    next();
  }
);

export const isPatientAuthentication = Asynchandler(
  async (req, resp, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
      return next(new ApiError("Patient is not Authenticated", 400));
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = await User.findById(decoded._id);
    if (req.user.role !== "Patient") {
      return next(
        new ApiError(
          `${req.user.role} not authorized for this resources`,
          403
        )
      );
    }
    next();
  }
);

export const isDoctor = Asynchandler(async (req, resp, next) => {
  const token = req.cookies.doctorToken;
  if (!token) {
    return next(new ApiError("Doctor is not Authenticated", 400));
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  req.user = await User.findById(decoded._id);
  if (req.user.role !== "Doctor") {
    return next(
      new ApiError(
        `${req.user.role} not authorized for this resources`,
        403
      )
    );
  }
  next();
});
