import express from 'express';
const router = express.Router();
import authMiddleware from '../utils/authMiddleware.js';

import{
    createUserTable, dropUserTable, signUp, signIn
} from '../services/user.service.js';

router.post('/createTable', createUserTable);
router.delete('/dropTable', dropUserTable);
router.post('/signup', signUp);
router.post('/signin', signIn);

export default router