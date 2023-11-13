import express from 'express';
import { checkUserRole } from '../Middlewares.js/Rolemiddleware.js';
import * as userController from '../Controller/userController.js';
import { resetPassword } from '../Controller/userController.js';

const router = express.Router();

router.get('/users/:id', userController.getUser);

router.put('/users/:id', checkUserRole('user'), userController.updateUser);

router.delete('/users/:id', checkUserRole('user'), userController.deleteUser); 

router.patch('/users/:id', checkUserRole('user'), userController.updateProfile);

router.post('/reset-password', resetPassword);

export default router;

