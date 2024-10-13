import { model, Schema } from "mongoose";
import User from "./User.js";

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
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

postSchema.methods.toJSON = async function() {
  const { _id, ...post } = this.toObject();
  const user = await User.findById(post.userId);

  return { id: _id, user, ...post };
}

const Post = model("Post", postSchema);

export default Post;
