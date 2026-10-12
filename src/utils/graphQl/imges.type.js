import { GraphQLObjectType, GraphQLString } from "graphql";

export const imagesType = new GraphQLObjectType({
    name: "images",
    fields: () => ({
        secure_url: { type: GraphQLString },
        public_id: { type: GraphQLString }
    })
})