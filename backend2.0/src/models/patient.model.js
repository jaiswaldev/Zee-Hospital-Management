import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"


const patientSchema = new Schema({
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
  emergencyContactNumber: {
    type: String,
    required: true,
    trim: true,
  },
  medicalHistory: {
    type: String,
    trim: true,
  },
  allergies: {
    type: String,
    trim: true,
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    trim: true,
  },
  status: {
    type: String,
    enum: ["Verified", "Unverified", "Under-verification"],
    default: "Unverified",
    required: true,
  }

}, {
  timestamps: true,
});


patientSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10)
    next()
})

patientSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password);
}

patientSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
        {
            _id:this._id,
            email : this.email,
            userType: "patient",
        },
       process.env.ACCESS_TOKEN_SECRET,
       {
         expiresIn:  process.env.ACCESS_TOKEN_EXPIRY
       }

    )
}

patientSchema.methods.generateRefreshToken = async function(){
    return jwt.sign(
        { 
            _id:this._id,
            userType: "patient",
        },
       process.env.REFRESH_TOKEN_SECRET,
       {
         expiresIn:  process.env.REFRESH_TOKEN_EXPIRY
       }

    )
}

export const Patient= mongoose.model("Patient", patientSchema);
