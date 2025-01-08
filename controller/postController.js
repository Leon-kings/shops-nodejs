import cloudinary from 'cloudinary';
import Post from '../models/post.js';

cloudinary.v2.config({
  cloud_name: 'your_cloud_name',
  api_key: 'your_api_key',
  api_secret: 'your_api_secret',
});

export const createPost = async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path);

    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      imageUrl: result.secure_url,
      author: req.body.author,
      category: req.body.category,
    });

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating post' });
  }
};
