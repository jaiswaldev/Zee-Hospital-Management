import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const doctorSchema = new Schema({ 
  firstName: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  address: {
    type: String,
    trim: true,
  },
  licenseNumber: {
    type: String,
    // required: true,
   
    trim: true,
  },
  specialization: {
    type: String,
    // required: true,
    trim: true,
  },
  experience: {
    type: Number,
    // required: true,
  },
  qualifications: {
    type: String,
    // required: true,
    trim: true,
  },
  hospitalAffiliation: {
    type: String,
    // required: true,
    trim: true,
  },
  refreshToken: {
    type: String,
  }
}, {
  timestamps: true,
});

// Hash password before saving
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Validate password
doctorSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

doctorSchema.methods.generateAccessToken = async function(){
  return jwt.sign(
    { 
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  )
};

doctorSchema.methods.generateRefreshToken = async function(){
  return jwt.sign(
    { 
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  )
};

export const Doctor = mongoose.model("Doctor", doctorSchema);
