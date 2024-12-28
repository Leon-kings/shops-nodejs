import express from 'express';
import { createTestimony, getTestimony} from '../controller/testmonyController.js';
const router = express.Router();

router.get('/', getTestimony);
router.post('/', createTestimony);


export default router;