import express from "express";
import { createPost, getPosts } from "../controller/postController.js";
import upload from "../helpers/multer.js";
import Authorization from "../middlewares/authorization.js";

const router = express.Router();

// Define routes
router.post("/", upload.single("image"), Authorization, createPost);
router.get("/", getPosts);

export default router;
