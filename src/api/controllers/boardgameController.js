
const Boardgame = require('../models/Boardgame');

// Get All Boardgames
exports.getAllBoardgames = async (req, res) => {
    try {
        const boardgames = await Boardgame.find();
        res.status(200).json(boardgames);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a Boardgame
exports.addBoardgame = async (req, res) => {
    try {
        const newBoardgame = new Boardgame(req.body);
        await newBoardgame.save();
        res.status(201).json(newBoardgame);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a Boardgame
exports.updateBoardgame = async (req, res) => {
    try {
        const boardgameId = req.params.id;
        const updates = req.body;
        const updatedBoardgame = await Boardgame.findByIdAndUpdate(boardgameId, updates, { new: true });
        res.status(200).json({ message: 'Boardgame updated successfully', updatedBoardgame });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a Boardgame
exports.deleteBoardgame = async (req, res) => {
    try {
        const boardgameId = req.params.id;
        const deletedBoardgame = await Boardgame.findByIdAndDelete(boardgameId);
        res.status(200).json({ message: 'Boardgame deleted', deletedBoardgame });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
