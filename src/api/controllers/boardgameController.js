const Boardgame = require('../models/Boardgame');

exports.getAllBoardgames = async (req, res) => {
    try {

        const boardgames = await Boardgame.find();


        res.status(200).json(boardgames);
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};


exports.addBoardgame = async (req, res) => {
    try {
        // Verifica que `req.files` exista antes de mapearlo
        const images = req.files?.map(file => file.path) || [];

        const boardgame = await Boardgame.create({
            ...req.body,
            images: images // Asigna un array vacío si no hay imágenes
        });

        res.status(201).json({ message: 'Boardgame created successfully!', boardgame });
    } catch (error) {
        console.error('Error al crear el juego:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateBoardgame = async (req, res) => {
    try {
        const boardgameId = req.params.id;
        const updates = req.body;


        if (req.files) {
            const images = req.files.map(file => file.path);
            updates.images = images;
        }

        const updatedBoardgame = await Boardgame.findByIdAndUpdate(boardgameId, updates, { new: true });
        res.status(200).json({ message: 'Boardgame updated successfully', updatedBoardgame });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.deleteBoardgame = async (req, res) => {
    try {
        const boardgameId = req.params.id;
        const deletedBoardgame = await Boardgame.findByIdAndDelete(boardgameId);
        res.status(200).json({ message: 'Boardgame deleted', deletedBoardgame });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
