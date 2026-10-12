import joi from "joi";
import { genders } from "../../DB/models/user.model.js";

export const registerSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{3,30}$/)).required(),
    age: joi.number().min(18).max(100).required(),
    confirmedPassword: joi.ref("password"),
    userName: joi.string().min(3).max(20).required(),
    phoneNumber: joi.string().required(),
    gender: joi.string().valid(...Object.values(genders)).required(),
    otp: joi.string().required()        
}).required();


export const sendOtpSchema = joi.object({
    email: joi.string().email().required()
}).required();

export const forgetPasswordSchema = joi.object({
    email: joi.string().email().required()
}).required();

export const passwordForgetSchema = joi.object({
    email: joi.string().email().required(),
    otp: joi.string().required(),
    password: joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{3,30}$/)).required(),
    confirmedPassword: joi.ref("password")
}).required();