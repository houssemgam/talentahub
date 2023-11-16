import express from 'express';
import {
  getTalentProfile,
  updateTalentProfile,
  deleteTalentProfile
} from '../Controller/talentController.js';

const router = express.Router();

// Route pour afficher le profil du talent
router.get('/getTalentProfile/:id', getTalentProfile);

// Route pour mettre à jour le profil du talent
router.put('/updateTalentProfile/:id', updateTalentProfile);

// Route pour supprimer le profil du talent
router.delete('/deleteTalentProfile/:id', deleteTalentProfile);

export default router;