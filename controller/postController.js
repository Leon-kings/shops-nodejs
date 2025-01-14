import Post from '../models/post.js';
import uploadFile from '../helpers/cloud.js';

export const createPost = async (req, res) => {
   // Handle potential errors during file upload
   if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }
    console.log(req.file);
  const response = await uploadFile(req.file, res);
  try {
    const newPost = await Post.create({
      image: response.secure_url,
      description: req.body.description,
      name: req.body.name,
      email:req.body.email,
      price:req.body.price,
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
    res.status(200).json({
        status:'success',
        message:'fetched successfull',
        posts    
    }
       );
  } catch (err) {
    res.status(400).json({ 
        message: err.message });
        console.log(err)
  }
};
