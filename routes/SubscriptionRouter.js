import express from 'express';
import { createSubscription, deleteSubscription, getSubscription } from '../controller/subscriptionController.js';
const router = express.Router();

router.get('/', getSubscription);
router.post('/', createSubscription);
router.delete('/:id', deleteSubscription);

export default router;