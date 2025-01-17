import Post from "../models/post.js";
import { cloudinary } from "../helpers/cloud.js";

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new post with an image uploaded to Cloudinary
export const createPost = async (req, res) => {
  try {
    const { description, name, email, price } = req.body;

    if (!req.file || !description || !name || !email || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPost = new Post({
      image: req.file.path, // Cloudinary URL
      description,
      name,
      email,
      price,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const { description, name, email, price } = req.body;
    let updatedData = { description, name, email, price };

    if (req.file) {
      updatedData.image = req.file.path; // New image URL from Cloudinary
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a post (also remove image from Cloudinary)
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Extract the public ID from the Cloudinary URL and delete the image
    const publicId = post.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`posts/${publicId}`);

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
