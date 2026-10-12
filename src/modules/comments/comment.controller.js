import { Comment } from "../../DB/models/comments.model.js";
import { Post } from "../../DB/models/post.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import cloudinary from "../../utils/cloud.config.js";


export const createComment = asyncHandler(async (req, res, next) => {
    const { text } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post) return next(new Error("post not found"));
    let image;
    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.CLOUD_FOLDER_NAME}/posts/${post.id}/${post.cloudFolder}/comments` });
        image = { secure_url, public_id }
    }
    const result = await Comment.create({ text, image, user: req.user._id, post: post._id });
    res.json({ message: "comment created", status: 200, result })
})



export const updateComment = asyncHandler(async (req, res, next) => {
    const { text } = req.body;
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return next(new Error("comment not found"));
    const post = await Post.findOne({ _id: comment.post, isDeleted: false });
    if (!post) return next(new Error("post not found"))
    if (comment.user.toString() !== req.user._id.toString()) {
        return next(new Error("comment not found"))
    }
    let image;
    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.CLOUD_FOLDER_NAME}/posts/${post.id}/${post.cloudFolder}/comments` });
        image = { secure_url, public_id }
    }
    comment.text = text ? text : comment.text;
    comment.image = image ? image : comment.image;
    const result = await comment.save();
    res.json({ message: "comment updated", status: 200, result })
})