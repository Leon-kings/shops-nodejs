import express from "express";
import multer from "multer";
import { createPost, getPosts } from "../controller/postController.js";
import { authUser } from "../controller/userController.js";

const router = express.Router();

// Multer storage configuration
const storage = multer.memoryStorage(); // Stores file in memory (use diskStorage for local files)
const upload = multer({ storage });

router.post("/", authUser , upload.single("image"), createPost);
router.get('/', getPosts);

export default router;
