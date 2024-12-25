const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./src/api/routes/userRoutes');
const boardgameRoutes = require('./src/api/routes/boardgameRoutes');
const eventRoutes = require('./src/api/routes/eventRoutes');

dotenv.config();

const app = express();

// Configuración de CORS
const allowedOrigins = ['https://frontend-10.vercel.app', 'http://localhost:5173'];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/v2', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API Boardgames!' });
});

// Routes
app.use('/api/v2/users', userRoutes);
app.use('/api/v2/boardgames', boardgameRoutes);
app.use('/api/v2/events', eventRoutes);

// Database Connection
const DB_URI = process.env.DATABASE_URL || 'mongodb://localhost:27017/boardgames';

mongoose.connect(DB_URI)
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

// Starting the server
app.listen(3000, () => {
    console.log('Server is running...');
});

module.exports = app;
