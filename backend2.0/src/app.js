import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import { errorHandler } from "./middlewares/ErrorHandler.js"
import { apiLimiter } from "./middlewares/rateLimiter.js"

const app = express()

// Security middleware
app.use(helmet())
app.use(apiLimiter)

// CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Body parsing middleware
app.use(express.urlencoded({extended: true, limit: "20kb"}))
app.use(express.json({ limit: "20kb" }))
app.use(express.static("public"))
app.use(cookieParser())

//routes
import patientRouter from "./routes/patient.route.js"
app.use("/api/v1/patient/auth", patientRouter)

import doctorRouter from "./routes/doctor.route.js"
app.use("/api/v1/doctor/auth", doctorRouter)

// Error handling
app.use(errorHandler);

export { app }