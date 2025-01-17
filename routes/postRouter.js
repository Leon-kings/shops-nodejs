// import express from "express";
// import { createPost, getPosts } from "../controller/postController.js";
// import upload from "../helpers/multer.js";
// import Authorization from "../middlewares/authorization.js";

// const router = express.Router();

// // Define routes
// router.post("/", upload.single("image"), Authorization, createPost);
// router.get("/", getPosts);

// export default router;
import express from "express";
import { upload } from "../helpers/cloud.js";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controller/postController.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", upload.single("image"), createPost); // Upload a single image
router.put("/:id", upload.single("image"), updatePost); // Update with new image if provided
router.delete("/:id", deletePost);

export default router;
