
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Autenticación requerida.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id, // ID del usuario
            role: decoded.role // Rol del usuario
        };
        console.log('Token decodificado:', req.user); // Log del token decodificado
        next();
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return res.status(403).json({ message: 'Token inválido.' });
    }
};


const authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

module.exports = { authenticate, authorize };
