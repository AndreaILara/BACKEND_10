const express = require('express');
const { getAllBoardgames, addBoardgame, updateBoardgame, deleteBoardgame } = require('../controllers/boardgameController');
const { authenticate, authorize } = require('../../middlewares/auth');
const upload = require('../../middlewares/uploadFiles');

const router = express.Router();


router.get('/', getAllBoardgames);



router.post('/', authenticate, authorize('admin'), upload.array('img', 5), addBoardgame);
router.put('/:id', authenticate, upload.array('img', 5), updateBoardgame);
router.delete('/:id', authenticate, authorize('admin'), deleteBoardgame);

module.exports = router;
