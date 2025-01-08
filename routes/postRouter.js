import express from 'express';
import { createPost, getPosts } from '../controller/postController.js';
import upload from '../helpers/multer.js';
import Authorization from '../middlewares/authorization.js';

const router = express.Router();

// Define routes
router.post('/post', upload.single('image'), Authorization, createPost);
router.get('/posts', getPosts);

export default router;
