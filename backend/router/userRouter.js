import express from "express";
import {
  patientRegister,
  login,
  addNewAdmin,
  getAllDoctors,
  getUserDetails,
  logOutAdmin,
  logOutPatient,
  addNewDoctor,
  updateUser,
  searchDoctor,
} from "../controller/userController.js";
import {
  isAuthenticated,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/patientregister", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", isAuthenticated, addNewAdmin);
router.post("/admin/first", addNewAdmin);
router.get("/doctors", getAllDoctors);
router.get("/admin/me", isAuthenticated, getUserDetails);
router.get("/patient/me", isAuthenticated, getUserDetails);
router.get("/doctor/me",  getUserDetails);
router.get("/admin/logout", isAuthenticated, logOutAdmin);
router.get("/patient/logout", isAuthenticated, logOutPatient);
router.post("/doctor/addNew", isAuthenticated, addNewDoctor);
router.put("/update/:id", isAuthenticated, updateUser);
router.get("/search/:keyword", searchDoctor);
export default router;
