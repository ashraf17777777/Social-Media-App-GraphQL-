import { Router } from "express"
import * as userController from "./user.controller.js"
import { authMiddleWare } from "../../middleware/auth.middleware.js"
import isAuthorized from "../../middleware/authorization.middelware.js"
import { uploadFile } from "../../utils/multer.js"
import { uploadCloud } from "../../utils/multerCloud.js"
const userRouter = Router()




userRouter.get("/profile", authMiddleWare, isAuthorized("user"), userController.profile)

userRouter.post("/profilePic", authMiddleWare,uploadCloud().single("profilePic"), userController.profilePic)

// userRouter.post("/coverPic", authMiddleWare,uploadCloud().single("profilePic"),userController.coverPicture)


// userRouter.post("/testField",uploadFile().fields([{ name: "pets", maxCount: 3 }, { name: "Cars", maxCount: 5 }]), (req, res) => {
//     res.json({ message: "file uploaded", files: req.files })
// })

export default userRouter