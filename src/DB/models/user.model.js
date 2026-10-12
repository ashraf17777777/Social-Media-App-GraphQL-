import mongoose from "mongoose"
import { hash } from "../../utils/hash.js"

export const genders = {
    male: "male",
    female: "female"
}
export const role = {
    user: "user",
    admin: "admin"
}

// export const providers = {
//     system: "system",
//     google: "google"
// }

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    gender: {
        type: String,
        enum: Object.values(genders),
        required: true
    },
    role: {
        type: String,
        enum: Object.values(role),
        default: role.user
    },
    profilePic:{
        secure_url:String,
        public_id:String
    },
    coverPic:[String]
}, { timestamps: true })

userSchema.pre("save",function(next) {
    this.password = hash({ plantext: this.password, salt: 8 })
    next()  
})

export const User = mongoose.model("User", userSchema)