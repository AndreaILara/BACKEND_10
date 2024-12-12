
const express = require('express');
const { getAllBoardgames, addBoardgame, updateBoardgame, deleteBoardgame } = require('../controllers/boardgameController');
const { authenticate, authorize } = require('../../middlewares/auth');

const router = express.Router();

// Public Routes
router.get('/', getAllBoardgames);

// Protected Routes
router.post('/', authenticate, authorize('admin'), addBoardgame);
router.put('/:id', authenticate, updateBoardgame);
router.delete('/:id', authenticate, authorize('admin'), deleteBoardgame);

module.exports = router;
