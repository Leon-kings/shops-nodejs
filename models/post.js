import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    image: { type: String, required: true },
    description: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  });
const Post = mongoose.model('Post', postSchema);

export default Post;
