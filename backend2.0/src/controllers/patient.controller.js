// patient.controller.js

import { asynchandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { isValidEmail, validatePassword } from "../utils/Validations.js";
import { Patient } from "../models/patient.model.js";
import { Doctor } from "../models/doctor.model.js";
import { Token, hashToken } from "../models/token.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (patientId) => {
  try {
    const patient = await Patient.findById(patientId);
    if (!patient) throw new ApiError(404, "Patient not found");

    const AccessToken = await patient.generateAccessToken();
    const RefreshToken = await patient.generateRefreshToken();

    await Token.create({
      userId: patient._id,
      userType: "patient",
      tokenHash: hashToken(RefreshToken),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return { AccessToken, RefreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "semething went wrong, while generating Tokens!!please try Again Later."
    );
  }
};

const Registerpatient = asynchandler(async (req, res) => {
  const {
    phone,
    address,
    emergencyContactNumber,
    medicalHistory,
    allergies,
    firstName,
    lastName,
    email,
    dateOfBirth,
    gender,
    bloodGroup,
    password,
  } = req.body;

  if (!firstName || !lastName || !email || !gender || !emergencyContactNumber) {
    throw new ApiError(400, "Required fields are missing");
  }

  if (!isValidEmail(email)) {
    throw new ApiError(400, "Please enter a valid email");
  }

  validatePassword(password);

  const patientExisted = await Patient.findOne({ email });
  if (patientExisted) {
    throw new ApiError(409, "Email already exists");
  }

  const patient = await Patient.create({
    firstName,
    lastName,
    email,
    phone,
    dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
    gender,
    address,
    emergencyContactNumber,
    medicalHistory,
    allergies,
    bloodGroup,
    password,
  });

  const createdPatient = await Patient.findById(patient._id).select(
    "-password"
  );
  if (!createdPatient) {
    throw new ApiError(
      500,
      "Something Went Wrong While Registering,Please Try Again Later!!"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        createdPatient,
        "Patient registered successfully, you can login now!!"
      )
    );
});

const loginpatient = asynchandler(async (req, res) => {
  const { email, password} = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  if (!isValidEmail(email)) {
    throw new ApiError(400, "Please enter a valid email");
  }



  const patient = await Patient.findOne({ email });
  if (!patient) {
    throw new ApiError(404, "Patient not found, please register first!!");
  }

  const isPasswordValid = await patient.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Incorrect password");
  }

  const { AccessToken, RefreshToken } = await generateAccessAndRefreshTokens(
    patient._id
  );

  const loggedInPatient = await Patient.findById(patient._id).select(
    "-password"
  );

  const isProduction = process.env.NODE_ENV === "production";
  const options = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "None",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };

  return res
    .status(200)
    .cookie("accessToken", AccessToken, options)
    .cookie("refreshToken", RefreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInPatient,
          role: "patient",
        },
        "Patient logged in successfully!!"
      )
    );
});

const logoutpatient = asynchandler(async (req, res) => {
  await Token.deleteMany({ userId: req.user._id, userType: "patient" });

  const isProduction = process.env.NODE_ENV === "production";
  const options = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "None",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Successfully logged out"));
});

const getVerifiedDoctors = asynchandler(async (req, res) => {
  try {
    const doctors = await Doctor.find({status: "Unverified"}).select("-password");
    if (!doctors || doctors.length === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, [], "No verified doctors found"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, doctors, "Doctors fetched successfully!!"));
  } catch (error) {
    console.error("Error fetching verified doctors:", error);
    throw new ApiError(500, "Error fetching verified doctors: " + error.message);
  }
});

export {
  Registerpatient, loginpatient, logoutpatient, getVerifiedDoctors
};