// all query fiedls with posts

import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from "graphql";
import { allPosts, getOnePost } from "./post.graphql.service.js";
import { onePostRequest } from "./types/post.types.request.js";
import { allPostsResponse, OneTypePostRespone } from "./types/Post.types.response.js";
import { isAuthonticated } from "../../../graphql/authentecation.js";

export const postQuery = {
    // onePost
    onePost: {
        type: new GraphQLObjectType({
            name: "OnePostResponse",
            fields: {
                succes: { type: GraphQLBoolean },
                status: { type: GraphQLInt },
                result: { type: OneTypePostRespone },
            }// return
        }),
        args: onePostRequest, //input 
        resolve: isAuthonticated(["admin"])(getOnePost)
    },
    getAllPosts: {
        type:new GraphQLObjectType({
            name: "getAllResponse",
            fields: {
                succes: { type: GraphQLBoolean },
                status: { type: GraphQLInt },
                result: { type: allPostsResponse },
            }
        }),//{ succes: true, result: posts, status: 200 }
        resolve: isAuthonticated(["admin"])(allPosts)
    }
}