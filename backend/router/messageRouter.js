import express from "express";
import {
  getAllMessages,
  sendMessage,
} from "../controller/messageController.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/messages", isAuthenticated, getAllMessages);

export default router;
