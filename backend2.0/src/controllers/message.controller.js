import { asynchandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Patient } from "../models/patient.model.js";
import { Doctor } from "../models/doctor.model.js";
import { Message } from "../models/message.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { getReceiverSocketId, io } from "../utils/socket.js";

const getAllPatients = asynchandler(async (req, res) => {
  try {
    const patients = await Patient.find().select("-password");
    // console.log("patients", patients);
    if (!patients || patients.length === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, "No patients found....."));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, patients, "Patients fetched successfully!!"));
  } catch (error) {
    throw new ApiError(500, "Error fetching patients: " + error.message);
  }
});

const getMessages = asynchandler(async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });
    return res
      .status(200)
      .json(new ApiResponse(200, messages, "Messages fetched successfully!!"));
  } catch (error) {
    throw new ApiError(500, "Error fetching messages: " + error.message);
  }
});

const sendMessage = asynchandler(async (req, res) => {
  try {
    const { text } = req.body;
    let image = req.body.image;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    // Handle image upload (if exists)
    let imageLocalPath;
    if (
      req.files &&
      Array.isArray(req.files.image) &&
      req.files.image.length > 0
    ) {
      imageLocalPath = req.files.image[0].path;
    }

    if (imageLocalPath) {
      const cloudinaryUpload = await uploadOnCloudinary(imageLocalPath);
      image = cloudinaryUpload?.url;
    }

    // Create and save the message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: image || null,
    });

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    // console.log(`📨 Emitting message to receiverId ${receiverId}, socketId: ${receiverSocketId}`);
  
    return res
      .status(201)
      .json(new ApiResponse(201, newMessage, "Message sent successfully!!"));
  } catch (error) {
    throw new ApiError(500, "Error sending message: " + error.message);
  }
});

const getAllDoctors = asynchandler(async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password");
    // console.log("patients", patients);
    if (!doctors || doctors.length === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, "No Doctors found....."));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, doctors, "Doctors fetched successfully!!"));
  } catch (error) {
    throw new ApiError(500, "Error fetching patients: " + error.message);
  }
});

export { getAllPatients, getMessages, sendMessage, getAllDoctors };
