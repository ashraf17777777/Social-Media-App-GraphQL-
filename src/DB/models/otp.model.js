import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    }
}, { timestamps: true });

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 120 })



const OTP = mongoose.model("OTP", otpSchema);
export default OTP