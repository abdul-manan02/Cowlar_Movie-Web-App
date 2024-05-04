import express from 'express';
const router = express.Router();
import authMiddleware from '../utils/authMiddleware.js';

import{
    createUsertTable, dropUsertTable, signUp, signIn
} from '../services/user.service.js';

router.post('/createTable', createUsertTable);
router.delete('/dropTable', dropUsertTable);
router.post('/signup', signUp);
router.post('/signin', signIn);

export default router