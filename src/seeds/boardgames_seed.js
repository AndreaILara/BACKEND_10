
const mongoose = require('mongoose');
const Boardgame = require('../models/Boardgame');
const dotenv = require('dotenv');

dotenv.config();

const seedBoardgames = async () => {
    const boardgames = [
        { title: 'Virus!', releaseYear: 2015, minPlayers: 2, maxPlayers: 6, rating: 6.7, price: 25 },
        { title: 'UNO', releaseYear: 1971, minPlayers: 2, maxPlayers: 10, rating: 5.5, price: 10 },
        { title: 'Guess Who?', releaseYear: 2001, minPlayers: 2, maxPlayers: 2, rating: 4.8, price: 16 },
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
