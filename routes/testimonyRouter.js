import express from 'express';
import { createTestimony, getTestimony} from '../controllers/testmonyController.js';
const router = express.Router();

router.get('/', getTestimony);
router.post('/', createTestimony);


export default router;