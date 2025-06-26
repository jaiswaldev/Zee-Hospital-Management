import { asynchandler } from "../utils/AsyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { Patient } from "../models/patient.model.js";
import { Doctor } from "../models/doctor.model.js";
// import { Admin } from "../models/admin.models.js";

const verifyToken = async (token, model) => {
    try {
        const decodedinfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        // Check token expiration
        if (decodedinfo.exp && Date.now() >= decodedinfo.exp * 1000) {
            throw new ApiError(401, "Token has expired");
        }

        const user = await model.findById(decodedinfo?._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            throw new ApiError(401, "Invalid AccessToken");
        }

        return user;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new ApiError(401, "Token has expired");
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw new ApiError(401, "Invalid token");
        }
        throw error;
    }
};

export const verifyPatientJWT = asynchandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            throw new ApiError(401, "Unauthorized Request");
        }

        const patient = await verifyToken(token, Patient);
        req.patient = patient;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Authentication failed");
    }
});

export const verifyDoctorJWT = asynchandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            throw new ApiError(401, "Unauthorized Request");
        }

        const doctor = await verifyToken(token, Doctor);
        req.doctor = doctor;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Authentication failed");
    }
});

// Optional: Add a combined middleware for routes that can be accessed by both doctors and patients
export const verifyUserJWT = asynchandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            throw new ApiError(401, "Unauthorized Request");
        }

        // Try to verify as patient first
        try {
            const patient = await verifyToken(token, Patient);
            req.user = patient;
            req.userType = 'patient';
            return next();
        } catch (error) {
            // If not a patient, try as doctor
            const doctor = await verifyToken(token, Doctor);
            req.user = doctor;
            req.userType = 'doctor';
            return next();
        }
    } catch (error) {
        throw new ApiError(401, error?.message || "Authentication failed");
    }
});