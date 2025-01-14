import express from 'express';
import { createTestimony, deleteTestimony, getTestimony, getTestimonyById, updateTestimony} from '../controller/testmonyController.js';
const router = express.Router();

router.get('/', getTestimony);
router.post('/', createTestimony);
router.get('/:id', getTestimonyById);
router.put('/:id', updateTestimony);
router.delete('/:id', deleteTestimony);

export default router;