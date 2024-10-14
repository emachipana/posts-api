import Like from "../models/Like.js";
import Post from "../models/Post.js";

export const isPostLiked = async (req, res) => {
  const { postId } = req.params;
  const { user } = req;

  try {
    const liked = await Like.findOne({ postId, userId: user._id });

    res.json({ isLiked: !!liked, id: liked?._id });
  }catch(error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

export const create = async (req, res) => {
  const { postId } = req.body;
  const { user } = req;

  try {
    const post = await Post.findById(postId);
    if(!post) return res.status(404).json({ message: "La publicacion no existe" });

    const newLike = new Like({ postId, userId: user._id });
    const likeSaved = await newLike.save();
    await post.updateOne({ likes: post.likes + 1 });

    res.status(201).json(likeSaved);
  }catch(error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

export const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const like = await Like.findById(id);
    const post = await Post.findById(like.postId);
    await like.deleteOne();
    await post.updateOne({ likes: post.likes - 1 });

    res.status(204).json();
  }catch(error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
