import mongoose from "mongoose";
import { User } from "./models/user.Schema.js";
import dotenv from "dotenv";

dotenv.config();

const createFirstAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@zeecare.com" });
    if (existingAdmin) {
      console.log("Admin account already exists");
      process.exit(0);
    }

    // Create admin account
    const admin = await User.create({
      firstName: "Admin",
      lastName: "User",
      email: "admin@zeecare.com",
      phone: "1234567890",
      Adhar: "123456789012",
      dob: "1990-01-01",
      gender: "Male",
      password: "Admin@123",
      role: "Admin"
    });

    console.log("Admin account created successfully:", admin);
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    process.exit(0);
  }
};

createFirstAdmin(); 