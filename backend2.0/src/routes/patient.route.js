import { Router } from "express";
import { Registerpatient,loginpatient } from "../controllers/patient.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyPatientJWT } from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/register").post(Registerpatient);
router.route("/login").post(loginpatient);


export default router;
