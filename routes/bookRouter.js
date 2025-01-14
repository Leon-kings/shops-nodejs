import express from 'express';
import { createOrder, deleteOder, getOderById, getOrder, updateOder} from '../controller/messageController.js';
const router = express.Router();

router.get('/', getOrder);
router.post('/', createOrder);
router.get('/:id', getOderById);
router.put('/:id', updateOder);
router.delete('/:id', deleteOder);

export default router;