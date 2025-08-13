import { asynchandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { isValidEmail, validatePassword } from "../utils/Validations.js";
import { Doctor } from "../models/doctor.model.js";
import { Token, hashToken } from "../models/token.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (doctorId) => {
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) throw new ApiError(404, "Doctor not found");

    const AccessToken = await doctor.generateAccessToken();
    const RefreshToken = await doctor.generateRefreshToken();

    await Token.create({
      userId: doctor._id,
      userType: "doctor",
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

const Registerdoctor = asynchandler(async (req, res) => {
  const {
    phone,
    address,
    qualification,
    hospitalAffiliation,
    experience,
    specialization,
    licenseNumber,
    firstName,
    lastName,
    email,
    dateOfBirth,
    gender,
    password,
  } = req.body;

  if (!firstName || !lastName || !email || !gender || !phone) {
    throw new ApiError(400, "Required fields are missing");
  }

  if (!isValidEmail(email)) {
    throw new ApiError(400, "Please enter a valid email");
  }

  validatePassword(password);

  const doctorExisted = await Doctor.findOne({ email });
  if (doctorExisted) {
    throw new ApiError(409, "Email already exists");
  }

  const doctor = await Doctor.create({
    firstName,
    lastName,
    email,
    phone,
    dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
    gender,
    address,
    qualification,
    hospitalAffiliation,
    experience,
    specialization,
    licenseNumber,
    password,
  });

  const createdDoctor = await Doctor.findById(doctor._id).select("-password");
  if (!createdDoctor) {
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
        createdDoctor,
        "Doctor registered successfully, you can login now!!"
      )
    );
});

const logindoctor = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  if (!isValidEmail(email)) {
    throw new ApiError(400, "Please enter a valid email");
  }

  const doctor = await Doctor.findOne({ email });
  if (!doctor) {
    throw new ApiError(404, "Doctor not found, please register first!!");
  }

  const isPasswordValid = await doctor.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Incorrect password");
  }

  const { AccessToken, RefreshToken } = await generateAccessAndRefreshTokens(
    doctor._id
  );

  const loggedInDoctor = await Doctor.findById(doctor._id).select("-password");

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
          user: loggedInDoctor,
          role: "doctor",
        },
        "Doctor logged in successfully!!"
      )
    );
});

const logoutdoctor = asynchandler(async (req, res) => {
  await Token.deleteMany({ userId: req.user._id, userType: "doctor" });

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
    .json(new ApiResponse(200, {}, "Successfully logged out!!"));
});

export { Registerdoctor, logindoctor, logoutdoctor};
