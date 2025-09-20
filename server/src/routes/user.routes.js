import { Router } from "express";
import { login, logout, refreshToken, register } from "../controllers/user.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(register)
userRouter.route("/login").post(login)
userRouter.route("/refresh").post(jwtVerify, refreshToken)
userRouter.route("/logout").post(jwtVerify, logout)

export { userRouter };