import { Router } from "express";
import { authMiddleWare } from "../../middleware/auth.middleware.js";
import isAuthorized from "../../middleware/authorization.middelware.js";
import { role } from "../../DB/models/user.model.js";
import { uploadCloud } from "../../utils/multerCloud.js";
import { validate } from "../../middleware/validation.middelware.js";
import * as postController from "./post.controller.js"
import * as postSchema from "./post.schema.js"
import commentRouter from "../comments/comment.routes.js";

const postRouter = Router()
//post/postId/comment
postRouter.use("/:postId/comment",commentRouter)

postRouter.post("/addpost", authMiddleWare, isAuthorized(role.user), uploadCloud().array("images"), validate(postSchema.createPost), postController.createPost)

postRouter.patch("/updatepost/:id", authMiddleWare, isAuthorized(role.user), uploadCloud().array("images"), validate(postSchema.updatePost), postController.updatePost)

postRouter.patch("/freezePost/:id", authMiddleWare, isAuthorized(role.user, role.admin), postController.freezePost)

postRouter.patch("/unfreezePost/:id", authMiddleWare, isAuthorized(role.user, role.admin), postController.unfreezePost)

postRouter.get("/posts",authMiddleWare,isAuthorized(role.user,role.admin),postController.getPosts)

postRouter.patch("/:id/like_unlike",authMiddleWare,isAuthorized(role.user),postController.like_unlike)

export default postRouter