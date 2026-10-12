import { User } from "../DB/models/user.model.js";
import jwt from 'jsonwebtoken';
export const authMiddleWare = async (req, res, next) => {
    // get token from headers
    const { auth } = req.headers; // headers => req.headers
    if (!auth || !auth.startsWith("Bearer")) {
        return res.status(401).json({ message: "token not found" })
    } /// Barer + token
    //extact token
    const token = auth.split(" ")[1]// ["Bearer","token"]
    // verify token
    const { id } = jwt.verify(token, "123")
    const user = await User.findById(id).select("-password")
    if (!user) {
        return res.status(404).json({ message: "token expired" })
    }
    req.user = user; 
    next()
}