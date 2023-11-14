import express from 'express';
import { getTalent, updateTalent, deleteTalent, updateProfile } from '../Controller/talentController.js';

const router = express.Router();

// Get talent profile
router.get('/:id', getTalent);

// Update talent profile
router.put('/:id', updateTalent);

// Delete talent profile
router.delete('/:id', deleteTalent);

// Update talent profile (specific endpoint)
router.put('/:id/profile', updateProfile);

export default router;
