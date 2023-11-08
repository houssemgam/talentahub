import express from 'express'
import { addEvent, deleteEvent, getAllEvents, getOneEvent, updateEvent } from '../Controllers/eventController.js';
import multer from '../Middlewares/multer-config.js';

const router = express.Router()

router.route('/')
    .post(multer('image'), addEvent)
    .get(getAllEvents)


router.route('/:_id')
    .get(getOneEvent)
    .delete(deleteEvent)
    .put(multer('image'), updateEvent)


export default router