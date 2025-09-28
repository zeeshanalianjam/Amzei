import { Router } from "express";
import { fetchAllUsers, forgotPassword, forgotPasswordOTPVerification, login, logout, refreshToken, register, resetPassword, updateStatus } from "../controllers/user.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(register)
userRouter.route("/login").post(login)
userRouter.route("/refresh").post(jwtVerify, refreshToken)
userRouter.route("/logout").post(jwtVerify, logout)
userRouter.route("/fetch-all-users").get(fetchAllUsers)
userRouter.route("/status/:userId").put(jwtVerify, updateStatus)

// Forgot password routes 
userRouter.route("/forgot-password").put(forgotPassword)
userRouter.route("/forgot-password-verify-otp").put(forgotPasswordOTPVerification)
userRouter.route("/forgot-password-reset-password").put(resetPassword)

export { userRouter };