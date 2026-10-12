import { Router } from "express";
import * as authController from "./auth.controller.js"
import { validate } from "../../middleware/validation.middelware.js";
import { forgetPasswordSchema, passwordForgetSchema, registerSchema, sendOtpSchema } from "./auth.schema.js";

const authRouter = Router()

authRouter.post("/register",validate(registerSchema),authController.register)


authRouter.post("/login",authController.login)

authRouter.get("/activate/:token",authController.activate)


authRouter.post("/verify",validate(sendOtpSchema),authController.verify)



authRouter.post("/forget-password",validate(forgetPasswordSchema),authController.forgetPassword)

authRouter.post("/reset-password",validate(passwordForgetSchema),authController.resetPassword)

authRouter.post("/refresh-token",authController.refreshToken)

// authRouter.post("/login-gmail",authController.loginGmail)

export default authRouter