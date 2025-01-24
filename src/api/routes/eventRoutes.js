
const express = require('express');
const { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { authenticate, authorize } = require('../../middlewares/auth');

const router = express.Router();


router.get('/', getAllEvents);
router.get('/:id', getEventById);


router.post('/', authenticate, createEvent);
router.put('/:id', authenticate, updateEvent);
router.delete('/:id', authenticate, deleteEvent);


module.exports = router;
