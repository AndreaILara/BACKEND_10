
const mongoose = require('mongoose');
const Boardgame = require('../models/Boardgame');
const dotenv = require('dotenv');

dotenv.config();

const seedBoardgames = async () => {
    const boardgames = [
        { title: 'Catan', releaseYear: 1995, minPlayers: 3, maxPlayers: 4, rating: 8.1, price: 45 },
        { title: 'Carcassonne', releaseYear: 2000, minPlayers: 2, maxPlayers: 5, rating: 7.4, price: 35 },
        { title: 'Pandemic', releaseYear: 2008, minPlayers: 2, maxPlayers: 4, rating: 8.6, price: 50 },
    ];

    try {
        await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        await Boardgame.deleteMany();
        await Boardgame.insertMany(boardgames);
        console.log('Database seeded successfully!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

seedBoardgames();
