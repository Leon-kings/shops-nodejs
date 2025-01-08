import express from 'express';
import multer from 'multer';
import { createPost } from '../controller/postController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temporary storage

// Route for creating a post
router.post('/', upload.single('image'), createPost);

export default router;
