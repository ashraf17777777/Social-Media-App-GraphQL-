// types of the return of resolver
import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { imagesType } from './../../../../utils/graphQl/imges.type.js';
import { userType } from './../../../../utils/graphQl/user.type.js';


export const OneTypePostRespone = new GraphQLObjectType({
    name: "post",
    fields: {
        text: {
            type: GraphQLString,
         
        },
        images: {
            type: new GraphQLList(imagesType)
        },
        // user: {
        //     type: GraphQLID
        // },
        user: {
            type: userType  ///id 
        },
       
        likes: {
            type: new GraphQLList(GraphQLID),
        },
        isDeleted: {
            type: GraphQLBoolean
        },
        DeletedBy: {
            type: GraphQLID
        },
        _id: {
            type: GraphQLID
        },
        createdAt: {
            type: GraphQLString
        },
        updatedAt: {
            type: GraphQLString
        }
    }
})


export const allPostsResponse = new GraphQLList(OneTypePostRespone)