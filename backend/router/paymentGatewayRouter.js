import express from "express";
import { createRazorPayOrder, verifyPayment } from '../controller/razorpayController.js';


const router = express.Router();

router.post("/create", createRazorPayOrder);
router.post("/verify", verifyPayment);

export default router;