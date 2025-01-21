import mongoose from 'mongoose';

// const postSchema = new mongoose.Schema({
//     image: { type: String, required: true },
//     description: { type: String, required: true },
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     price: { type: Number, required: true },
//     createdAt: { type: Date, default: Date.now },
//   });
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});
const Product = mongoose.model("Product", ProductSchema);

export default Product;
