
const express = require('express');
const { getAllEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { authenticate, authorize } = require('../../middlewares/auth');

const router = express.Router();

// Public Routes
router.get('/', getAllEvents);

// Protected Routes
router.post('/', authenticate, createEvent);
router.put('/:id', authenticate, updateEvent);
router.delete('/:id', authenticate, authorize('admin', 'organizer'), deleteEvent);

module.exports = router;
