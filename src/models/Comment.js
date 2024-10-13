import { model, Schema } from "mongoose";
import User from "./User.js";
import Post from "./Post.js";

const commentSchema = new Schema(
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
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

commentSchema.methods.toJSON = async function() {
  const { _id, ...comment } = this.toObject();
  const user = await User.findById(comment.userId);
  const post = await Post.findById(comment.postId);

  return { id: _id, user, post, ...comment };
}

const Comment = model("Comment", commentSchema);

export default Comment;
