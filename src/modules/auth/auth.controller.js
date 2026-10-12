import { genders, User } from "../../DB/models/user.model.js";
import CryptoJS from "crypto-js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import { eamilEmitter } from "../../utils/email.events.js";
import joi from "joi";
import OTP from "../../DB/models/otp.model.js";
import Randomstring from "randomstring"
import { OAuth2Client } from "google-auth-library";
import { hash } from "../../utils/hash.js";
import { createToken, verifyToken } from "../../utils/token.js";
export const register = async (req, res) => {
    try {
        const { otp } = req.body;

        eamilEmitter.emit("sendEmail", req.body.email, otp)
        const otpExist = await OTP.findOne({ email: req.body.email, otp: req.body.otp })
        const user = await User.create({ ...req.body, phoneNumber: CryptoJS.AES.encrypt(req.body.phoneNumber, "123").toString(), isActivated: true })

        res.json({ message: "user created", status: 200, user })
    } catch (error) {
        res.json({ message: error.message, status: 500, stact: error.stack })
    }
}




export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return next(new Error("user not found"))
        }
    
        let match = bcrypt.compareSync(password,user.password);
        if (!match) {
            return next(new Error("wrong password"))
        }
        const access_token = jwt.sign({ id: user._id, email }, "123", { expiresIn: "30m" });
        const refreshToken = jwt.sign({ id: user._id, email }, "258", { expiresIn: "7d" });
        res.json({ message: "user logged in", status: 200, access_token, refreshToken })
    } catch (error) {
        res.json({ message: error.message, status: 500, stact: error.stack })
    }
}

export const activate = async (req, res) => {
    try {
        const { token } = req.params
        const { email } = jwt.verify(token, "258")
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ message: "user not found", status: 404 })
        }
        user.isActivated = true
        await user.save()
        res.json({ message: "user activated", status: 200 })
    } catch (error) {
        res.json({ message: error.message, status: 500, stact: error.stack })
    }
}



export const forgetPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return next(new Error("user not found"))
        }
        const otp = Randomstring.generate({ length: 6, charset: "alphanumeric" })
        await OTP.create({ email: req.body.email, otp })
        eamilEmitter.emit("sendEmail", req.body.email, otp)
        res.json({ message: "otp sent for reset password", status: 200 })
    } catch (error) {
        res.json({ message: error.message, status: 500, stact: error.stack })
    }
}



export const resetPassword = async (req, res, next) => {
    try {
        const { email, otp, password, confirmedPassword } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return next(new Error("user not found"))
        }
        const otpExist = await OTP.findOne({ email })
        if (!otpExist) {
            return next(new Error("otp not found"))
        }
        if (otpExist.otp !== otp) {
            return next(new Error("wrong otp"))
        }
        if (password !== confirmedPassword) {
            return next(new Error("password not match"))
        }
        user.password = hash({ plantext: password, salt: 8 })
        user.save()
        res.json({ message: "password reset", status: 200 })
    } catch (error) {
        res.json({ message: error.message, status: 500, stact: error.stack })
    }
}

export const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        const payload = verifyToken(refreshToken, "258");
        const user = await User.findById(payload.id)
        if (!user) {
            return next(new Error("user not found"))
        }
        const access_token = createToken({ id: user.id }, "123", { expiresIn: "30m" });
        res.json({ message: "token refreshed", status: 200, access_token })
    } catch (error) {
        res.json({ message: error.message, status: 500, stact: error.stack })
    }
}

export const verify = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            return next(new Error("user already exist"))
        }
        const otp = Randomstring.generate({ length: 6, charset: "alphanumeric" })
        await OTP.create({ email, otp })
        eamilEmitter.emit("sendEmail", email, otp)
        res.json({ message: "otp sent", status: 200 })
    } catch (error) {
        res.json({ message: error.message, status: 500, stact: error.stack })
    }
}

export const loginGmail = async (req, res, next) => {
    const { idToken } = req.body
    const client = new OAuth2Client()
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: "719561412180-8gg58vrtsjavbqskst1n5erratifk5ja.apps.googleusercontent.com",  // Specify the WEB_CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[WEB_CLIENT_ID_1, WEB_CLIENT_ID_2, WEB_CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        return payload;
    }

    const userData = verify()
    const { email_verified, email, name, picture } = userData;
    if (!email_verified) {
        return res.json({ message: "user not found", status: 404 })
    }

    const user = await User.create({ email, userName: name, isActivated: true, provider: providers.google })
    const accessToken = jwt.sign({ id: user._id, email }, { expiresIn: "1d" }, "123")
    res.json({ message: "success", status: 200, accessToken })

}