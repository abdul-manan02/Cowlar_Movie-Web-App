import express from 'express';
const router = express.Router();

import{
    createUserTable,
    dropUserTable,
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
} from '../controllers/user.controller.js';

router.post('/createTable', createUserTable);
router.delete('/dropTable', dropUserTable);

router.route('/').get(getUsers).post(createUser);

router.route('/userId/:userId')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

export default router