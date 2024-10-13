import Post from "../models/Post.js";

export const getAll = async (_req, res) => {
  try {
    let posts = await Post.find();
    posts = posts.sort((a, b) => b.createdAt - a.createdAt);

    res.json(posts);
  }catch(error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

export const getAllByLoggedUser = async (req, res) => {
  const { user } = req;

  try {
    let posts = await Post.find();
    posts = posts.filter(post => post.userId.equals(user._id));
    posts = posts.sort((a, b) => b.createdAt - a.createdAt);

    res.json(posts);
  }catch(error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

export const create = async (req, res) => {
  const { content } = req.body;
  const { user } = req;

  try {
    const post = new Post({ content, userId: user._id, user: user.toJSON() });
    const savedPost = await post.save();

    res.status(201).json(savedPost);
  }catch(error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

export const destroy = async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if(!post) return res.status(404).json({ message: "La publicación no existe" });
    if(!post.userId.equals(user._id)) return res.status(401).json({ message: "Debes ser el propietario de la publicación" });

    await post.deleteOne();

    return res.status(204).json();
  }catch(error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
