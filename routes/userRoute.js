import express from 'express';
import { getUser, updateUser, deleteUser, updateProfile, resetPassword } from '../Controller/userController.js';

const router = express.Router();

// Route pour obtenir les informations d'un utilisateur
router.get('/getUser/:id', getUser);

// Route pour mettre à jour un utilisateur
router.put('/updateUser/:id', updateUser);

// Route pour supprimer un utilisateur
router.delete('/deleteUser/:id', deleteUser);

// Route pour mettre à jour le profil d'un utilisateur
router.put('/updateProfile/:id/profile', updateProfile);

// Route pour réinitialiser le mot de passe d'un utilisateur
router.post('/reset-password', resetPassword);

export default router;

