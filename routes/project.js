const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/ProjectController');
const upload = require('../middleware/upload');


router.get('/', ProjectController.index);
router.post('/store', upload.single('image'), ProjectController.store);
router.get('/show/:projectID', ProjectController.show);
router.put('/update/:projectID', ProjectController.update);
router.delete('/delete/:projectID', ProjectController.destroy);
router.get('/all', ProjectController.getAllProjects);

module.exports = router;
