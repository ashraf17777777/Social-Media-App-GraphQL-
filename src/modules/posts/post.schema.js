
import joi from 'joi';




export const createPost = joi.object({
    text: joi.string().min(2),
    file: joi.array().items(
        joi.object({
            fieldname: joi.string().valid("images"),
            originalname: joi.string().required(),
            encoding: joi.string().required(),
            mimetype: joi.string().required(),
            destination: joi.string().required(),
            filename: joi.string().required(),
            path: joi.string().required(),
            size: joi.number().required()
        })
    ),
}).or("file", "text")



export const updatePost = joi.object({
    id: joi.string().required(),
    text: joi.string().min(2).max(1000),
    file: joi.array().items(
        joi.object({
            fieldname: joi.string().valid("images"),
            originalname: joi.string().required(),
            encoding: joi.string().required(),
            mimetype: joi.string().required(),
            destination: joi.string().required(),
            filename: joi.string().required(),
            path: joi.string().required(),
            size: joi.number().required()
        })
    ),
}).or("file", "text");