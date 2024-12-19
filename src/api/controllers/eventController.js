
const Event = require('../models/Event');

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate({
                path: 'games',
                select: 'title img'
            })
            .populate('attendees', 'username')
            .populate('organizer', 'username');

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId).populate('attendees games organizer');

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.createEvent = async (req, res) => {
    try {
        const newEvent = new Event({ ...req.body, organizer: req.user.id });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const updates = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(eventId, updates, { new: true }).populate('attendees games organizer');
        res.status(200).json({ message: 'Event updated successfully', updatedEvent });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        res.status(200).json({ message: 'Event deleted', deletedEvent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
