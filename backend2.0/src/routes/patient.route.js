import { Router } from "express";
import { Registerpatient,loginpatient, logoutpatient} from "../controllers/patient.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyUserJWT } from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/register").post(Registerpatient);
router.route("/login").post(loginpatient);
router.route("/logout").post(verifyUserJWT,logoutpatient);


export default router;
