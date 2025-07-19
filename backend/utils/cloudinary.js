import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from 'dotenv';

// Ensure environment variables are loaded


// Debug logging for environment variables
// console.log("\n=== Environment Variables Debug ===");
// console.log("Current working directory:", process.cwd());
// console.log("Environment variables loaded:", Object.keys(process.env).filter(key => key.startsWith('CLOUDINARY_')));
// console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY ? "Set" : "Not Set");
// console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET ? "Set" : "Not Set");
// console.log("================================\n");

// Log Cloudinary configuration (without sensitive data)
// console.log("Cloudinary Config:", {
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "Set" : "Not Set",
//     api_key: process.env.CLOUDINARY_API_KEY ? "Set" : "Not Set",
//     api_secret: process.env.CLOUDINARY_API_SECRET ? "Set" : "Not Set"
// });

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log("No file path provided");
            return null;
        }

        // Check if file exists
        if (!fs.existsSync(localFilePath)) {
            console.log("File does not exist at path:", localFilePath);
            return null;
        }

        console.log("Attempting to upload file:", localFilePath);
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "hospital-management/doctors"
        });

        console.log("File uploaded successfully to Cloudinary:", response.url);
        
        // Clean up the temporary file
        try {
            fs.unlinkSync(localFilePath);
            console.log("Temporary file deleted successfully");
        } catch (unlinkError) {
            console.error("Error deleting temporary file:", unlinkError);
        }

        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        
        // Clean up the temporary file even if upload fails
        try {
            if (fs.existsSync(localFilePath)) {
                fs.unlinkSync(localFilePath);
                console.log("Temporary file deleted after failed upload");
            }
        } catch (unlinkError) {
            console.error("Error deleting temporary file after failed upload:", unlinkError);
        }

        return null;
    }
};

export { uploadOnCloudinary };