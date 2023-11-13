import express from 'express';
import { createUser, getUser, updateUser, deleteUser, updateProfile } from '../Controller/adminController.js';

const router = express.Router();

// Créer un utilisateur
router.post('/users', createUser);

// Obtenir un utilisateur par son ID
router.get('/users/:id', getUser);

// Mettre à jour un utilisateur par son ID
router.put('/users/:id', updateUser);

// Supprimer un utilisateur par son ID
router.delete('/users/:id', deleteUser);

// Mettre à jour le profil de l'administrateur
router.put('/profile/:id', updateProfile);

export default router;

