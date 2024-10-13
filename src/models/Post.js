import { model, Schema } from "mongoose";

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    },
    user: {}
  },
  {
    timestamps: true,
    versionKey: false
  }
);

postSchema.methods.toJSON = function() {
  const { _id, ...post } = this.toObject();

  return { id: _id, ...post };
}

const Post = model("Post", postSchema);

export default Post;
