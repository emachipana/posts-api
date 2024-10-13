import { model, Schema } from "mongoose";

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
    },
    user: {}
  },
  {
    timestamps: true,
    versionKey: false
  }
);

commentSchema.methods.toJSON = function() {
  const { _id, ...comment } = this.toObject();
  
  return { id: _id, ...comment };
}

const Comment = model("Comment", commentSchema);

export default Comment;
