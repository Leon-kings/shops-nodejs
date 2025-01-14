import express from 'express';
import { createSubscription, deleteSubscription, getSubscription, getSubscriptionById, updateSubscription } from '../controller/subscriptionController.js';
const router = express.Router();

router.get('/', getSubscription);
router.get('/:id', getSubscriptionById);
router.post('/', createSubscription);
router.delete('/:id', deleteSubscription);
router.put("/:id", updateSubscription);
export default router;