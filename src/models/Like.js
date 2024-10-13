import { model, Schema } from "mongoose";

const likeSchema = new Schema(
  {
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

likeSchema.methods.toJSON = function() {
  const { _id, ...like } = this.toObject();

  return { id: _id, ...like };
}

const Like = model("Like", likeSchema);

export default Like;
