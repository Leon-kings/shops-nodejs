import express from "express";
import multer from "multer";
import { createPost, getPosts } from "../controller/postController.js";

const router = express.Router();

// Multer storage configuration
const storage = multer.memoryStorage(); // Stores file in memory (use diskStorage for local files)
const upload = multer({ storage });

router.post("/create", upload.single("image"), createPost);
router.get('/', getPosts);

export default router;
