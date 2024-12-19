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

router.get("/users", getAllUsers);
router.post("/users", createUser);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);
router.post("/users/login", authUser);

export default router;
