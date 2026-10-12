import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { postQuery } from "./modules/posts/graphql/post.query.js";

export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "MainQuery",
        fields: {
            ...postQuery
        }
    })
});