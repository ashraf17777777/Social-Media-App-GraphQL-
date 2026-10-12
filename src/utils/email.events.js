import { EventEmitter } from "events";
import jwt from "jsonwebtoken";
import { sendEmail } from "./sendEmail.js";
import { generateTemplate } from "./templateHtml.js";

export const eamilEmitter = new EventEmitter()


eamilEmitter.on("sendEmail",async(email,otp)=>{
        // const token = jwt.sign({ email }, "258");
        // const link = `http://localhost:3000/auth/activate/${token}`
        const userEmail = await sendEmail(email,"welcome to saraha application",generateTemplate(otp))
})