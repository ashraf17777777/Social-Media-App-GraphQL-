import multer, { diskStorage } from "multer";
import { nanoid } from "nanoid";

import * as path from "path"

export function uploadFile() {

    const storage = diskStorage({
        destination: (req,file,cb)=>{
            const folderName = `${req.user._id}/${req.user.userName}`;
            cb(null,folderName)
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname)// extention 
            const name = path.basename(file.originalname, ext);
            const newName = `${name}__${nanoid()}${ext}`
            console.log(newName)
            cb(null, newName)
        }
    })
    const fileFilter = (req, file, cb) => {
        if (file.mimetype !== "image/jpeg" || file.mimetype !== "image/png") return cb(new Error("invalid file type"), false)
        return cb(null, true)
    }
    const uploadMulter = multer({ storage,fileFilter })
    return uploadMulter
}