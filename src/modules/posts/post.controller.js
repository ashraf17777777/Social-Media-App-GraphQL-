import { nanoid } from "nanoid";
import { Post } from "../../DB/models/post.model.js";
import cloudinary from "../../utils/cloud.config.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { set } from "mongoose";

export const createPost = async (req, res, next) => {
    try {
        const { text } = req.body;
        let images = [];
        let cloudFolder;
        if (req.files.length) {
            cloudFolder = nanoid()
            for (const file of req.files) {
                const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, { folder: `${process.env.CLOUD_FOLDER_NAME0}/user/${req.user._id}/${cloudFolder}` })
                images.push({ secure_url, public_id })
            }
        }
        const post = await Post.create({ text, images, user: req.user._id });
        res.json({ message: "post created", status: 200, post })
    } catch (err) {
        next(new Error(err.message, { cause: 500 }))
    }
}


export const updatePost = async (req, res, next) => {
    try {
        const { text } = req.body;
        const { id } = req.params;
        const post = await Post.findById({ _id: id, user: req.user._id });
        if (!post) {
            return next(new Error("post not found and doesn't belong to you"))
        }
        let images = [];
        let cloudFolder;
        if (req.files.length) {
            cloudFolder = nanoid()
            for (const file of req.files) {
                const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, { folder: `${process.env.CLOUD_FOLDER_NAME0}/user/${req.user._id}/${cloudFolder}` })
                images.push({ secure_url, public_id })
            }
            if (post.images.length) {
                for (const image of post.images) {
                    await cloudinary.uploader.destroy(image.public_id)
                }
            }
            post.images = images;
        }
        post.text = text ? text : post.text;
        await post.save();
        res.json({ message: "post updated", status: 200, post })
    } catch (err) {
        next(new Error(err.message, { cause: 500 }))
    }
}

export const freezePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findById({ _id: id, user: req.user._id });
        if (!post) {
            return next(new Error("post not found and doesn't belong to you"))
        }
        if (post.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return next(new Error("you can't freeze this post"))
        }
        post.isDeleted = true;
        post.DeletedBy = req.user._id
        await post.save();
        res.json({ message: "post frozen", status: 200, post })
    } catch (err) {
        next(new Error(err.message, { cause: 500 }))
    }
}
export const unfreezePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndUpdate({ _id: id }, { isDeleted: false }, { $unset: { DeletedBy: 0 } }, { new: true });
        if (post.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return next(new Error("you  unfreeze this post"))
        }
        res.json({ message: "post unfrozen", status: 200, post })
    } catch (err) {
        next(new Error(err.message, { cause: 500 }))
    }
}


export const getPosts = async (req, res, next) => {
    try {
        let { page } = req.query;
        const post = await Post.find().populate({ path: "user", select: "userName" }).paginate(page || 1);
        if (!post) return next(new Error("post not found"))
        //limit 
        //skip
        //page
        res.json({ message: "post found", status: 200, post })
    } catch (err) {
        next(new Error(err.message, { cause: 500 }))
    }
}

export const like_unlike = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user._id;
    const post = await Post.findOne({ _id: id, isDeleted: false });
    if (!post) return next(new Error("post not found or deleted"));
    console.log(post.likes)
    const isLikeExists = post.likes.find((user) => user.toString() === userId.toString());
    if (!isLikeExists) {
        post.likes.push(userId);
    } else {
        post.likes = post.likes.filter((user) => user.toString() !== userId.toString());
    }
    await post.save()
    res.json({ message: "post liked or unliked", status: 200, post })
})