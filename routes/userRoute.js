import express from "express";
import { 
  createUser, 
  getAllUsers, 
  getUserById, 
  deleteUser, 
  updateUser, 
  authUser 
} from "../controller/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
router.post("/auth", authUser);

export default router;
