
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../../config/jwt');

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Crear el nuevo usuario
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0]; // Campo duplicado (username o email)
            return res.status(409).json({
                message: `El ${field} ya está en uso. Por favor, elige otro.`,
            });
        }

        // Otros errores
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};


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


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').populate('favoriteGames');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


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


exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Verificar si el usuario tiene permiso para eliminar la cuenta
        if (req.user.role !== 'admin' && req.user.id !== userId) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar esta cuenta.' });
        }

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.status(200).json({ message: 'Cuenta eliminada con éxito.', deletedUser });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};