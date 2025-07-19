import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";


const app = express();


  

// CORS configuration
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Set-Cookie'],
  maxAge: 86400 // 24 hours
}));

// File upload middleware
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
  abortOnLimit: true,
  responseOnLimit: "File size limit has been reached",
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Health check endpoint
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

//routes
import messageRouter from "./router/messageRouter.js";
app.use("/api/v1/message", messageRouter);

import userRouter from "./router/userRouter.js";
app.use("/api/v1/user", userRouter);

import appointmentRouter from "./router/appointmentRouter.js";
app.use("/api/v1/appointment", appointmentRouter);

import adminProductRouter from "./router/adminProducts.js";
app.use("/api/v1/admin/products", adminProductRouter);

export { app };
