import { Asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../api/ApiError.js";
import { User } from "../models/user.Schema.js";
import { generateToken } from "../utils/jwtTokens.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


export const patientRegister = Asynchandler(async (req, resp, next) => {
  const { firstName, lastName, email, phone, Adhar, dob, gender, password } =
    req.body;
  // console.log(firstName, lastName, email, phone, Adhar, dob, gender, password);
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !Adhar ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ApiError("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ApiError("User already Registered!", 400));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    Adhar,
    dob,
    gender,
    password,
    role: "Patient",
  });
  await generateToken(user, "Patient registered successfully", 200, resp);
  //   resp.status(200).send({
  //     success: true,
  //     message: "Patient registered successfully",
  //     user,
  //   });
});

export const login = Asynchandler(async (req, resp, next) => {
  const { email, password, confirmPassword, role } = req.body;

  if (!email || !password || !confirmPassword || !role) {
    return next(new ApiError("Please Provide All Details", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new ApiError("Password and confirm password do not match", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ApiError("Invalid login credentials", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ApiError("Invalid Password Or Email", 400));
  }

  if (role !== user.role) {
    return next(new ApiError("User with this role is not found", 400));
  }
  await generateToken(user, "User logged in Successfully", 200, resp);
  //   resp.status(200).send({
  //     success: true,
  //     message: "User logged in Successfully",
  //   });
});

export const addNewAdmin = Asynchandler(async (req, resp, next) => {
  const { firstName, lastName, email, phone, Adhar, dob, gender, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !Adhar ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ApiError("Please Fill Full Form!", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ApiError("Admin with this email already exist", 400));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    Adhar,
    dob,
    gender,
    password,
    role: "Admin",
  });
  resp.status(200).send({
    success: true,
    message: "New Admin is added",
    user,
  });
});

export const getAllDoctors = Asynchandler(async (req, resp, next) => {
  const doctors = await User.find({ role: "Doctor" });
  resp.status(200).send({
    success: true,
    doctors,
  });
});

export const getUserDetails = Asynchandler(async (req, resp, next) => {
  const user = req.user;
  console.log(user);
  resp.status(200).send({
    success: true,
    user,
  });
});

export const logOutAdmin = Asynchandler(async (req, resp, next) => {
  resp
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: true,
      sameSite: "None",
    })
    .send({
      success: true,
      message: "User log Out successfully!!",
    });
});

export const logOutPatient = Asynchandler(async (req, resp, next) => {
  resp
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: true,
      sameSite: "None",
    })
    .send({
      success: true,
      message: "Patient log Out successfully!!",
    });
});

export const addNewDoctor = Asynchandler(async (req, resp, next) => {
  console.log("Files received:", req.files);
  console.log("Body received:", req.body);

  if (!req.files || Object.keys(req.files).length === 0) {
    console.log("No files uploaded");
    return next(new ApiError("Doctor Avatar Required!", 400));
  }

  const { docAvatar } = req.files;
  console.log("Avatar file:", docAvatar);

  const allowedFormats = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
  ];

  if (!allowedFormats.includes(docAvatar.mimetype)) {
    console.log("Invalid file format:", docAvatar.mimetype);
    return next(new ApiError("File format not supported. Please upload PNG, JPEG, JPG, or WebP", 400));
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    Adhar,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;

  console.log("Received doctor details:", {
    firstName,
    lastName,
    email,
    phone,
    Adhar,
    dob,
    gender,
    doctorDepartment,
  });

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !Adhar ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment
  ) {
    console.log("Missing required fields");
    return next(new ApiError("Please provide valid doctor details", 400));
  }

  try {
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      console.log("Email already registered:", email);
      return next(
        new ApiError(
          `${isRegistered.role} already registered with this email`,
          400
        )
      );
    }

    console.log("Uploading to Cloudinary...");
    const cloudinaryResponse = await uploadOnCloudinary(docAvatar.tempFilePath);
    console.log("Cloudinary response:", cloudinaryResponse);

    if (!cloudinaryResponse) {
      console.log("Cloudinary upload failed");
      return next(new ApiError("Failed to upload image to Cloudinary", 500));
    }

    console.log("Creating doctor in database...");
    const doctor = await User.create({
      firstName,
      lastName,
      email,
      phone,
      Adhar,
      dob,
      gender,
      password,
      doctorDepartment,
      role: "Doctor",
      docAvatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    console.log("Doctor created successfully:", doctor._id);
    resp.status(200).send({
      success: true,
      message: "New Doctor is registered",
      doctor,
    });
  } catch (error) {
    console.error("Error in addNewDoctor:", error);
    return next(new ApiError(error.message || "Failed to register doctor", 500));
  }
});

export const updateUser = Asynchandler(async (req, resp, next) => {
  const { id } = req.params;
  let user = await User.findById(id);
  if (!user) {
    return next(new ApiError("User is found", 400));
  }
  user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  resp.status(200).send({
    success: true,
    message: "Status Updated successfully",
    user,
  });
});

export const searchDoctor = async (req, resp) => {
  try {
    const { keyword } = req.params;
    if (!keyword) {
      const result = await User.find({
        role: "Doctor",
      });
      resp.status(200).send({
        success: true,
        result,
      });
    } else {
      const result = await User.find({
        role: "Doctor",
        $or: [
          { firstName: { $regex: keyword, $options: "i" } },
          { lastName: { $regex: keyword, $options: "i" } },
          { doctorDepartment: { $regex: keyword, $options: "i" } },
        ],
      });
      resp.status(200).send({
        success: true,
        result,
      });
    }
  } catch (error) {
    resp.status(400).send({
      success: false,
      message: "Error in Search API",
      error,
    });
  }
};
