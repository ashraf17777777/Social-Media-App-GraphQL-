import { Router } from "express";
import { authMiddleWare } from "../../middleware/auth.middleware.js";
import isAuthorized from "../../middleware/authorization.middelware.js";
import { role } from "../../DB/models/user.model.js";
import { uploadCloud } from "../../utils/multerCloud.js";
import { validate } from "../../middleware/validation.middelware.js";
import * as commentSchema from "./comment.schema.js";
import * as commentController from "./comment.controller.js"


const commentRouter = Router({ mergeParams: true })



commentRouter.post("/", authMiddleWare, isAuthorized(role.user), uploadCloud().single("image"), validate(commentSchema.addCommentSchema),commentController.createComment)

commentRouter.patch("/:commentId", authMiddleWare, isAuthorized(role.user), uploadCloud().single("image"), validate(commentSchema.updateCommentSchema),commentController.updateComment)









export default commentRouter