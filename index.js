
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./src/api/routes/userRoutes');
const boardgameRoutes = require('./src/api/routes/boardgameRoutes');
const eventRoutes = require('./src/api/routes/eventRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v2/users', userRoutes);
app.use('/api/v2/boardgames', boardgameRoutes);
app.use('/api/v2/events', eventRoutes);

// Database Connection
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/boardgames';


mongoose.connect(DB_URI)
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));


// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
