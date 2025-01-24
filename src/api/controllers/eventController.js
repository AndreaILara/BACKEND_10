
const Event = require('../models/Event');


exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate('organizer', '_id username')
            .populate('games', 'title images');

        res.status(200).json(events);
    } catch (error) {
        console.error('Error al obtener eventos:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
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
        const { name, date, location, games, organizer } = req.body;


        const eventOrganizer = organizer || req.user.id;

        const newEvent = new Event({
            name,
            date,
            location,
            games,
            organizer: eventOrganizer,
        });

        const savedEvent = await newEvent.save();

        const populatedEvent = await Event.findById(savedEvent._id)
            .populate('games', 'title images')
            .populate('organizer', 'username');

        res.status(201).json({ message: 'Evento creado exitosamente.', populatedEvent });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const { action, userId } = req.body;
        const eventId = req.params.id;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado.' });
        }


        event.attendees = event.attendees.filter(id => id !== null);

        if (action === 'add') {

            if (!event.attendees.some(id => id.toString() === userId)) {
                event.attendees.push(userId);
            }
        } else if (action === 'remove') {

            event.attendees = event.attendees.filter(id => id.toString() !== userId);
        } else {
            return res.status(400).json({ message: 'Acción inválida.' });
        }

        await event.save();

        const updatedEvent = await Event.findById(eventId)
            .populate('attendees', '_id username')
            .populate('games', 'title images');

        res.status(200).json({ updatedEvent });
    } catch (error) {
        console.error('Error al actualizar el evento:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    console.log('deleteEvent ejecutado');
    try {
        const eventId = req.params.id;
        console.log('ID del evento a eliminar:', eventId);

        const event = await Event.findById(eventId);

        if (!event) {
            console.log('Evento no encontrado');
            return res.status(404).json({ message: 'Evento no encontrado.' });
        }

        console.log('Evento encontrado:', event);
        console.log('Usuario autenticado:', req.user);
        console.log('Organizador del evento:', event.organizer.toString());

        if (req.user.role !== 'admin' && req.user.id !== event.organizer.toString()) {
            console.log('Acceso denegado. Usuario no autorizado para eliminar este evento.');
            return res.status(403).json({ message: 'No tienes permiso para eliminar este evento.' });
        }

        const deletedEvent = await Event.findByIdAndDelete(eventId);
        console.log('Evento eliminado:', deletedEvent);

        res.status(200).json({ message: 'Evento eliminado correctamente.', deletedEvent });
    } catch (error) {
        console.error('Error en deleteEvent:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};
