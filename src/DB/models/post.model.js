import { model, Schema } from "mongoose";

const PostSchema = new Schema({
    text: {
        type: String,
        minLength: 1,
        required: function () {
            return this.images.length ? false : true
        }
    },
    images: [
        {
            secure_url: String,
            public_id: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    isDeleted: {
        type: Boolean,
        default: false
    },
    DeletedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})
 PostSchema.query.paginate = async function (page) {
    page = page ? page : 1;
    let limit = 2;

    let skip = (page - 1) * limit;
    // ===> qury
    const data = await this.skip(skip).limit(limit);
    console.log(this)
    const items = await this.model.countDocuments();
    console.log(this.model)

    return{
        data,
        currentPage:page,
        totalItems:items,
        itemsPerPage:data.length,
    }
}


export const Post = model("Post", PostSchema);