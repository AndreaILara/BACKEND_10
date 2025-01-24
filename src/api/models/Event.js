
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date },
    location: { type: String },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Boardgame' }],
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
