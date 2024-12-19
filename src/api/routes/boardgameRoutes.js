const express = require('express');
const { getAllBoardgames, addBoardgame, updateBoardgame, deleteBoardgame } = require('../controllers/boardgameController');
const { authenticate, authorize } = require('../../middlewares/auth');
const upload = require('../../middlewares/uploadFiles'); // Middleware para manejar imágenes

const router = express.Router();

// Public Routes
router.get('/', getAllBoardgames);


// Protected Routes
router.post('/', authenticate, authorize('admin'), upload.array('img', 5), addBoardgame); // Incluye multer aquí
router.put('/:id', authenticate, upload.array('img', 5), updateBoardgame); // También en PUT
router.delete('/:id', authenticate, authorize('admin'), deleteBoardgame);

module.exports = router;
