import express from "express";
import {
  deleteAppointment,
  getAllAppointment,
  postAppointment,
  getUserAppointment,
  updateAppointmentStatus,
  getUserAppointmentById,
  updateDocument,
} from "../controller/appointementController.js";
import {
  isAuthenticated,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/post", isAuthenticated, postAppointment);
router.get("/getAppointment", isAuthenticated, getAllAppointment);
router.get(
  "/getOneAppointment/:id",
  isAuthenticated,
  getUserAppointment
);
router.get(
  "/getOneAppointmentAdmin/:id",
  isAuthenticated,
  getUserAppointmentById
);

router.put("/update/:id", isAuthenticated, updateAppointmentStatus);

router.put("/updateDocument/:id", isAuthenticated, updateDocument);

router.delete("/delete/:id", isAuthenticated, deleteAppointment);

export default router;
