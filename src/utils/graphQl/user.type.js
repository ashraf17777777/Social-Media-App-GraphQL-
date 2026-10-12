import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import { imagesType } from "./imges.type.js";

export const userType = new GraphQLObjectType({
    name: "User",
    fields: {
        _id: { type: GraphQLID },
        userName: { type: GraphQLString },
        email: { type: GraphQLString },
        images: { type:  GraphQLString}
    }
});