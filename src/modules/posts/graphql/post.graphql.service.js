// values of resolve key ===> business logic
import { Post } from './../../../DB/models/post.model.js';
export const allPosts = async (_, args, context) => {
    console.log(context)
    const posts = await Post.find()
    return { succes: true, result: posts, status: 200 }
}


export const getOnePost = async (_, args) => {
    const { id } = args;
    const post = await Post.findById(id).populate({ path: "user", select: "userName email images"})
    return { succes: true, result: post, status: 200 }
}