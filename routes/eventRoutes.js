const express = require('express');
const { addEvent, deleteEvent, getAllEvents, getOneEvent, updateEvent } = require('../controllers/eventController.js');
const multer = require('../middleware/multer-config.js');

const router = express.Router();

router.route('/')
  .post(addEvent)
  .get(getAllEvents);

router.route('/:_id')
  .get(getOneEvent)
  .delete(deleteEvent)
  .put(updateEvent);

router.route('/create')
  .post(multer('image'), addEvent);

module.exports = router;
