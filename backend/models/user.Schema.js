import mongoose from "mongoose";
import validator from "validator";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name Is Required!"],
    minLength: [3, "First Name Must Contain At Least 3 Characters!"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name Is Required!"],
    minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Email Is Required!"],
    validate: [validator.isEmail, "Provide A Valid Email!"],
  },
  phone: {
    type: String,
    required: [true, "Phone Is Required!"],
    minLength: [10, "Phone Number Must Contains 10 Digits!"],
    maxLength: [10, "Phone Number Must Contains 10 Digits!"],
  },
  Aadhaar: {
    type: String,
    required: [true, "NIC Is Required!"],
    minLength: [12, "Adhar Must Contain 12 Digits!"],
    maxLength: [12, "Adhar Must Contain 12 Digits!"],
  },
  dob: {
    type: Date,
    required: [true, "DOB Is Required!"],
  },
  gender: {
    type: String,
    required: [true, "Gender Is Required!"],
    enum: ["Male", "Female", "Transgender"],
  },
  password: {
    type: String,
    required: [true, "Password Is Required!"],
    minLength: [8, "Password Must Contain At Least 8 Characters!"]
  },
  role: {
    type: String,
    required: [true, "User Role Required!"],
    enum: ["Patient", "Doctor", "Admin"],
  },
  doctorDepartment: {
    type: String,
  },
  docAvatar: {
    public_id: String,
    url: String,
  },
  address: {
    type: String,
  },
  refreshToken:{
    type: String,
  }
  
},{
    timestamps:true
});


// Remove password hashing, store as plain text
userSchema.pre("save", async function (next) {
  next();
});


// Remove password comparison, use plain text comparison
userSchema.methods.comparePassword = async function (enteredPassword) {
  return enteredPassword === this.password;
};

userSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
        {
            _id:this._id,
            email : this.email,
            firstName: this.firstName,
            lastName: this.lastName
        },
       process.env.ACCESS_TOKEN_SECRET,
       {
         expiresIn:  process.env.ACCESS_TOKEN_EXPIRY
       }

    )
}

userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign(
        { 
            _id:this._id,
        },
       process.env.REFRESH_TOKEN_SECRET,
       {
         expiresIn:  process.env.REFRESH_TOKEN_EXPIRY
       }

    )
}

export const User = mongoose.model("User", userSchema);
