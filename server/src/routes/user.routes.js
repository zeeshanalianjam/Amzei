import { Router } from "express";
import { login, logout, register } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/register").post(register)
userRouter.route("/login").post(login)
userRouter.route("/logout").post(logout)

export { userRouter };