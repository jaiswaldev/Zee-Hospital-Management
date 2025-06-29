import { asynchandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { isValidEmail, validatePassword } from "../utils/validations.js";
import { Patient } from "../models/patient.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefereshTokens = async (patientId) => {
  try {
    // console.log(userId)
    const patient = await Patient.findById(patientId);
    // console.log(user)
    const AccessToken = await patient.generateAccessToken();
    // console.log(AccessToken)
    const RefreshToken = await patient.generateRefreshToken();
    // console.log(RefreshToken)
    patient.refreshToken = RefreshToken;
    // console.log(user)
    await patient.save({ validateBeforeSave: false });

    return { AccessToken, RefreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "semething went wrong, while generating Tokens!!please try Again Later."
    );
  }
};

const Registerpatient = asynchandler(async (req, res) => {
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
  const { phone, address, emergencyContactNumber, medicalHistory, allergies } =
    req.body;
  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    gender,
    bloodGroup,
    password,
  } = req.body;

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
  if (!emergencyContactNumber) {
    throw new ApiError(400, "Emergency Contact Number is Required!!");
  }
  validatePassword(password);

  //step3. check Patient is already exist or not.
  const patientExisted = await Patient.findOne({ email });

  if (patientExisted) {
    throw new ApiError(
      409,
      "Email Already Exist, try another Email or login with this Email!!"
    );
  }

  //step4. create patient object and add it in DataBase.

  const patient = await Patient.create({
    firstName,
    lastName,
    email,
    phone: phone ? phone : undefined,
    dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
    gender,
    address: address ? address : undefined,
    emergencyContactNumber,
    medicalHistory: medicalHistory ? medicalHistory : undefined,
    allergies: allergies ? allergies : undefined,
    bloodGroup: bloodGroup ? bloodGroup : undefined,
    password,
  });

  //step6. remove password and refresh tokens from object.
  const createdPatient = await Patient.findById(patient._id).select(
    "-password -refreshToken"
  );

  //step7. check patient is created or not.
  if (!createdPatient) {
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
        createdPatient,
        "Patient Registered Successfully, You can Login Now!!"
      )
    );
});

const loginpatient = asynchandler(async (req, res) => {
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
  if (role === "patient") {
    const existed = await Patient.findOne({ email });
    if (!existed) {
      throw new ApiError(
        404,
        "Patient does not Exist, Please Register first!!"
      );
    }

    const ispasswordValid = await existed.isPasswordCorrect(password);
    if (!ispasswordValid) {
      throw new ApiError(401, "Incorrect password!!");
    }
    const { AccessToken, RefreshToken } = await generateAccessAndRefereshTokens(
      existed._id
    );
    const loggedInPatient = await Patient.findById(existed._id).select(
      "-password -refreshToken "
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
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
            role:role,
            // Do NOT return AccessToken or RefreshToken in response body in production
          },
          "Patient Logged In Successfully!!"
        )
      );
  }
//   else{
//     //if not patient then it is doctor.

//   }
   throw new ApiError(400, "Invalid Role Selected!!");
  
});

const logoutpatient = asynchandler(async(req,res)=>{
   //delete refereshtoken from database.
   //delete cookies from user.
   await Patient.findByIdAndUpdate(
      req.user._id,
      {
         $unset : {
            refreshToken: ""
         }
      },
      {
         new: true
      }
   )
   const options= {
      httpOnly:true,
      secure:true,
      sameSite: "Strict"
   }
   return res.status(200).clearCookie("accessToken",options)
   .clearCookie("refreshToken",options)
   .json(new ApiResponse(200,{},"Successfully LoggedOut!!"))
})


export { Registerpatient , loginpatient, logoutpatient};
