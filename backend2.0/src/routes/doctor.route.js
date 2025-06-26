import { Router } from "express";
import {  Registerdoctor,logindoctor, logoutdoctor} from "../controllers/doctor.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyUserJWT } from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/register").post(Registerdoctor);
router.route("/login").post(logindoctor);
// router.route("/refresh-token").get(refreshAccessToken);
router.route("/logout").post(verifyUserJWT, logoutdoctor);



export default router;
