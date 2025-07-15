import mongoose from "mongoose";
import crypto from "crypto";

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userType: {
      type: String,
      enum: ["doctor", "patient"],
      required: true,
    },
    tokenHash: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");



export const Token = mongoose.model("Token", TokenSchema);

