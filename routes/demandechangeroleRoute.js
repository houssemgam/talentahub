import express from 'express';
import demandechangeroleController from '../Controller/demandechangeroleController.js';

const router = express.Router();

router.post('/soumettredemande', demandechangeroleController.soumettreDemande);
router.post('/demander-changement-role', demandechangeroleController.demanderChangementRole);
router.post('/accepter-changement-role', demandechangeroleController.accepterChangementRole);
router.post('/refuser-changement-role', demandechangeroleController.refuserChangementRole);

export default router;