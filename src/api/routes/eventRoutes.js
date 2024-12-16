
const express = require('express');
const { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { authenticate, authorize } = require('../../middlewares/auth');

const router = express.Router();

// Public Routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);

// Protected Routes
router.post('/', authenticate, createEvent);
router.put('/:id', authenticate, updateEvent);
router.delete('/:id', authenticate, authorize('admin', 'organizer'), deleteEvent);

module.exports = router;
