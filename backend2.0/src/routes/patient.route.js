import { Router } from "express";
import { Registerpatient,loginpatient, logoutpatient, getVerifiedDoctors} from "../controllers/patient.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyUserJWT } from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/register").post(Registerpatient);
router.route("/login").post(loginpatient);
router.route("/logout").post(verifyUserJWT, logoutpatient);


router.route("/verified-doctors").get(verifyUserJWT , getVerifiedDoctors);


export default router;
