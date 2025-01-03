import express from 'express';
import { createOrder, getOrder} from '../controller/messageController.js';
const router = express.Router();

router.get('/', getOrder);
router.post('/', createOrder);


export default router;