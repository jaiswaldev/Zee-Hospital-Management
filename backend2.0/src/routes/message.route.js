import { Router } from "express";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";
import {
  getAllPatients, getAllDoctors,
} from "../controllers/message.controller.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
// shown on doctor dashboard
router.route("/patients").get(verifyUserJWT, getAllPatients);
router.route("/patient/:id").get(verifyUserJWT, getMessages);
router.route("/patient/send/:id").post(
  verifyUserJWT,
  upload.fields([
    {
      name: "image",
      maxCount: 5,
    }
  ]),
  sendMessage
);

// shown on patient dashboard
router.route("/doctors").get(verifyUserJWT, getAllDoctors);
router.route("/doctor/:id").get(verifyUserJWT, getMessages);
router.route("/doctor/send/:id").post(
  verifyUserJWT,
  upload.fields([
    {
      name: "image",
      maxCount: 5,
    }
  ]),
  sendMessage
);

export default router;
