import express from 'express';
import {
  createUser,
  updateUser,
  deleteUser,
  updateProfile,
  authenticateUser,
  approveTalent
} from '../Controller/adminController.js';
import {
  createTalentUser,
  getTalentUser,
  updateTalentUser,
  deleteTalentUser
} from '../Controller/adminController.js';
import { getUser } from '../Controller/adminController.js';


const router = express.Router();

// Routes pour la gestion des utilisateurs
router.post('/createUser', createUser);
router.get('/getUser/:id', getUser);

router.put('/updateUser/:id', updateUser);

router.delete('/deleteUser/:id', deleteUser);

// Route pour la mise à jour du profil de l'administrateur
router.put('/profile/:id', authenticateUser, updateProfile);

// Route pour l'approbation des talents
router.post('/approve-talent/:talentId', authenticateUser, approveTalent);

// Créer un utilisateur talent
router.post('/createTalentUser', createTalentUser);

// Récupérer un utilisateur talent par son identifiant
router.get('/getTalentUser/:id', getTalentUser);

// Mettre à jour un utilisateur talent
router.put('/updateTalentUser/:id', updateTalentUser);

// Supprimer un utilisateur talent
router.delete('/talent/:id', deleteTalentUser);



export default router;
