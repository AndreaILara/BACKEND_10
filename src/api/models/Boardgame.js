const mongoose = require('mongoose');

const boardgameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    releaseYear: { type: Number },
    images: [{ type: String }],
    minPlayers: { type: Number },
    maxPlayers: { type: Number },
    rating: { type: Number },
    price: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Boardgame', boardgameSchema);
