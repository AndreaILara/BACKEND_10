
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../../config/jwt');

// Register User
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.generateToken({ id: user._id, role: user.role });
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').populate('favoriteGames');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update User
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = req.body;
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted', deletedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
