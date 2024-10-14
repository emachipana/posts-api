import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const getAllByPostId = async (req, res) => {
  const { postId } = req.params;

  try {
    let comments = await Comment.find();
    comments = comments.filter(comment => comment.postId.equals(postId));
    comments = comments.sort((a, b) => b.createdAt - a.createdAt);

    return res.json(comments);
  }catch(error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

export const create = async (req, res) => {
  const { postId, content } = req.body;
  const { user } = req;

  try {
    const post = await Post.findById(postId);
    if(!post) return res.status(404).json({ message: "La publicacion no existe" });

    const newComment = new Comment({ content, postId, userId: user._id, user: user.toJSON() });
    const commentSaved = await newComment.save();
    await post.updateOne({ comments: post.comments + 1 });

    res.status(201).json(commentSaved);
  }catch(error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
