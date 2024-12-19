
const express = require('express');
const { registerUser, loginUser, getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const { authenticate, authorize } = require('../../middlewares/auth');

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);


router.get('/', authenticate, authorize('admin'), getAllUsers);
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, deleteUser);

module.exports = router;
