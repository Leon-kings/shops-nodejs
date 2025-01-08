import Post from '../models/post.js';
import uploadFile from '../helpers/cloud.js';

export const createPost = async (req, res) => {
  const response = await uploadFile(req.file, res);
  try {
    const newPost = await Post.create({
      image: response.secure_url,
      body: req.body.body,
      author: req.user.name,
    });
    res.status(200).json({
      status: 'success',
      message: 'Your post was created successfully',
      newPost,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
