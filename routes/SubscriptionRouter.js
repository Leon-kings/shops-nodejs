import express from "express";
import {
  createSubscription,
  deleteSubscription,
  getSubscription,
  getSubscriptionById,
  updateSubscription,
} from "../controller/subscriptionController.js";
import Authorization from "../middlewares/authorization.js";

const router = express.Router();

router.post("/", Authorization, createSubscription);
router.get("/:id", getSubscriptionById);
router.get("/", getSubscription);
router.delete("/:id", deleteSubscription);
router.put("/:id", updateSubscription);
export default router;
