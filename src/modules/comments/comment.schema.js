
import  joi  from 'joi';

export const addCommentSchema = joi.object({
    postId: joi.string().required(),
    text: joi.string().min(2).max(1000),
    file: joi.object({
        fieldname: joi.string().valid("image"),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().required()
    })
}).or("file", "text")


export const updateCommentSchema = joi.object({
    commentId: joi.string().required(),
    text: joi.string().min(2).max(1000),
    file: joi.object({
        fieldname: joi.string().valid("image"),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().required()
    })
}).or("file", "text")