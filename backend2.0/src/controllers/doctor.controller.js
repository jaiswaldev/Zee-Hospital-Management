import { asynchandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { isValidEmail, validatePassword } from "../utils/validations.js";
import { Doctor } from "../models/doctor.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefereshTokens = async (doctorId) => {
  try {
    // console.log(userId)
    const doctor = await Doctor.findById(doctorId);
    // console.log(user)
    const AccessToken = await doctor.generateAccessToken();
    // console.log(AccessToken)
    const RefreshToken = await doctor.generateRefreshToken();
    // console.log(RefreshToken)
    doctor.refreshToken = RefreshToken;
    // console.log(user)
    await doctor.save({ validateBeforeSave: false });

    return { AccessToken, RefreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "semething went wrong, while generating Tokens!!please try Again Later."
    );
  }
};

// const refreshAccessToken = asynchandler(async (req, res) => {
//   const incomingRefreshToken = req.cookies.refreshToken;

//   if (!incomingRefreshToken) {
//     throw new ApiError(401, "Refresh token missing.");
//   }

//   const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
//   const doctor = await Doctor.findById(decoded?._id);
  
//   if (!doctor || doctor.refreshToken !== incomingRefreshToken) {
//     throw new ApiError(401, "Invalid refresh token.");
//   }

//   const newAccessToken = await doctor.generateAccessToken();
//   return res.status(200).json(
//     new ApiResponse(200, { accessToken: newAccessToken }, "Access token refreshed.")
//   );
// });


const Registerdoctor = asynchandler(async (req, res) => {
  //get user details from request(frontend).
  //Vadilation - all fields those are required are present or not.
  //check user already exist or not.
  //upload all images/files on cloudinary.
  //           (not done yet waiting for testing)check these are uploaded or not.. correctly on cloudinary.
  //create a user object and add it to DB.
  //remove password and refreshtokens from object.
  //check user is created or not.
  //return response.

  //step1. receive Data from frontend.

  // console.log(req.body);
  // console.log(req.files);

  const {
    phone,
    address,
    qualification,
    hospitalAffiliation,
    experience,
    specialization,
    licenseNumber,
  } = req.body;
  const { firstName, lastName, email, dateOfBirth, gender, password } =
    req.body;

  //step2. Validations.
  if (firstName === "") {
    throw new ApiError(400, "FirstName is Required!");
  }

  if (lastName === "") {
    throw new ApiError(400, "LastName is Required!");
  }
  if (email === "") {
    throw new ApiError(400, "Email is Required!");
  }
  if (!isValidEmail(email)) {
    throw new ApiError(400, "Please Enter Valid Email!");
  }
  if (!gender) {
    throw new ApiError(400, "Gender is Required!!");
  }
  if (!phone) {
    throw new ApiError(400, "Contact Number is Required!!");
  }
  validatePassword(password);

  //step3. check Patient is already exist or not.
  const doctorExisted = await Doctor.findOne({ email });

  if (doctorExisted) {
    throw new ApiError(
      409,
      "Email Already Exist, try another Email or login with this Email!!"
    );
  }

  //step4. create patient object and add it in DataBase.

  const doctor = await Doctor.create({
    firstName,
    lastName,
    email,
    phone,
    dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
    gender,
    address: address ? address : undefined,
    qualification: qualification ? qualification : undefined,
    hospitalAffiliation: hospitalAffiliation ? hospitalAffiliation : undefined,
    experience: experience ? experience : undefined,
    specialization: specialization ? specialization : undefined,
    licenseNumber: licenseNumber ? licenseNumber : undefined,
    password,
  });

  //step6. remove password and refresh tokens from object.
  const createdDoctor = await Doctor.findById(doctor._id).select(
    "-password -refreshToken"
  );

  //step7. check patient is created or not.
  if (!createdDoctor) {
    throw new ApiError(
      500,
      "Something Went Wrong While Registering,Please Try Again Later!!"
    );
  }

  //step8. Return Response,patient successfully created.
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        createdDoctor,
        "Doctor Registered Successfully, You can Login Now!!"
      )
    );
});

const logindoctor = asynchandler(async (req, res) => {
  // get data from frontend.
  // check data with our database.
  // if data base present in our database then,
  //check password is correct or not
  // if correct then generate accesstoken and refreshtoken and send it to our data base.
  //send cookies to user
  //send response.

  //step1.
  // console.log(req.body)
  const { email, password } = req.body;
  let { role } = req.body;

  //step 2 validations.
  if (email === "") {
    throw new ApiError(400, "Email is Required!");
  }
  if (!isValidEmail(email)) {
    throw new ApiError(400, "Please Enter Valid Email!");
  }
  //   validatePassword(password);

  if (!role) {
    throw new ApiError(400, "Please Select Role!!");
  }

  //step3. check role and search in database accordingly.
  if (role === "doctor") {
    const existed = await Doctor.findOne({ email });
    if (!existed) {
      throw new ApiError(404, "Doctor does not Exist, Please Register first!!");
    }

    const ispasswordValid = await existed.isPasswordCorrect(password);
    if (!ispasswordValid) {
      throw new ApiError(401, "Incorrect password!!");
    }
    const { AccessToken, RefreshToken } = await generateAccessAndRefereshTokens(
      existed._id
    );
    const loggedInDoctor = await Doctor.findById(existed._id).select(
      "-password -refreshToken "
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,  //7 days.
    };

    return (
      res
        .status(200)
        // .cookie("accessToken", AccessToken, options)
        .cookie("refreshToken", RefreshToken, options)
        .json(
          new ApiResponse(
            200,
            {
              user: loggedInDoctor,
              role: role,
              AccessToken,
              RefreshToken,
            },
            "Doctor Logged In Successfully!!"
          )
        )
    );
  }
  //   else{
  //     //if not patient then it is doctor.

  //   }
  throw new ApiError(400, "Invalid Role Selected!!");
});

export { Registerdoctor, logindoctor };
