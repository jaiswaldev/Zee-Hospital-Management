import jwt from "jsonwebtoken";
import { asynchandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Doctor } from "../models/doctor.model.js";
import { Patient } from "../models/patient.model.js";
import { Token, hashToken } from "../models/token.model.js";

export const refreshAccessToken = asynchandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;
  // console.log("Incoming refresh token:", incomingRefreshToken);
  if (!incomingRefreshToken) {
    // throw new ApiError(401, "Refresh token missing");
    return res.json(
      new ApiResponse(200,{},"Refreshed"));
  }

  // Verify refresh token
  let decoded;
  try {
    decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const hashedToken = hashToken(incomingRefreshToken);

  // Check existing token in DB
  const existingToken = await Token.findOne({
    userId: decoded._id,
    userType: decoded.userType,
    tokenHash: hashedToken,
  });

  if (!existingToken) {
    throw new ApiError(401, "Refresh token not found or revoked");
  }

  // Get user
  let user;
  if (decoded.userType === "doctor") {
    user = await Doctor.findById(decoded._id);
  } else if (decoded.userType === "patient") {
    user = await Patient.findById(decoded._id);
  }

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Rotate tokens
  const newAccessToken = await user.generateAccessToken();
  const newRefreshToken = await user.generateRefreshToken();
  const newTokenHash = hashToken(newRefreshToken);
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  // Remove old token
  await Token.deleteOne({ _id: existingToken._id });

  // Save new token with upsert (prevents E11000 duplicate key)
  await Token.findOneAndUpdate(
    {
      userId: user._id,
      userType: decoded.userType,
      tokenHash: newTokenHash,
    },
    {
      userId: user._id,
      userType: decoded.userType,
      tokenHash: newTokenHash,
      expiresAt: expires,
    },
    { upsert: true, new: true }
  );

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
    expires,
  };

  return res
    .status(200)
    .cookie("accessToken", newAccessToken, cookieOptions)
    .cookie("refreshToken", newRefreshToken, cookieOptions)
    .setHeader("Authorization", `Bearer ${newAccessToken}`)
    .json(
      new ApiResponse(
        200,
        {
          user: {
            _id: user._id,
            firstName: user.firstName,
            email: user.email,
            role: decoded.userType,
          },
        },
        "Token refreshed successfully!!"
      )
    );
});
