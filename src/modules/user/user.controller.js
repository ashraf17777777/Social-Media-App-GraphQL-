
import { User } from '../../DB/models/user.model.js';
import CryptoJS from "crypto-js";
import cloudinary from './../../utils/cloud.config.js';



export const profile = async (req, res) => {
    try {
        const { user } = req
        user.phoneNumber = CryptoJS.AES.decrypt(user.phoneNumber, "123").toString(CryptoJS.enc.Utf8)
        // return user
        return res.status(200).json({ message: "user found", user })
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack })
    }
}


export const profilePic = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        console.log(req.file.path)
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `user/${user._id}` })
        user.profilePic = { secure_url, public_id }
        await user.save()
        res.json({ message: "profile pic updated", status: 200, user })
    } catch (err) {
        next(new Error(err.message, { cause: 500 }))
    }
}


export const coverPicture = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return next(new Error("user not found"))
        }
        user.coverPic = req.files.map((file) => file.path)
        await user.save()
        res.json({ message: "cover pic updated", status: 200, file: req.files })
    } catch (err) {
        next(new Error(err.message, { cause: 500 }))
    }
}

