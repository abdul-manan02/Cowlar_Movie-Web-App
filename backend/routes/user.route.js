import express from 'express';
const router = express.Router();
import authMiddleware from '../utils/authMiddleware.js';

import{
    createUserTable,
    dropUserTable,
    getUsers,
    createUser,
    login,
    getUser,
    updateUser,
    deleteUser
} from '../controllers/user.controller.js';

router.post('/createTable', createUserTable);
router.delete('/dropTable', dropUserTable);

router.route('/').post(createUser);
router.route('/userId/:id').put(authMiddleware, updateUser)
router.route('/login').post(login)

router.route('/').get(getUsers)
router.route('/userId/:id')
    .get(authMiddleware, getUser)
    .delete(deleteUser);

export default router