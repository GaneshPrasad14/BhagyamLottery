const Result = require('../models/Result');

// @desc    Get all results
// @route   GET /api/results
// @access  Public
const getResults = async (req, res) => {
    try {
        const results = await Result.find({}).sort({ date: -1 }); // Newest first
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a result
// @route   POST /api/results
// @access  Private/Admin
const createResult = async (req, res) => {
    try {
        const { name, date, code, firstPrize, prize, isJackpot } = req.body;

        let link = '';
        if (req.file) {
            link = `/uploads/${req.file.filename}`;
        }

        const result = new Result({
            name,
            date,
            code,
            firstPrize,
            prize,
            isJackpot: isJackpot === 'true',
            link,
        });
        const createdResult = await result.save();
        res.status(201).json(createdResult);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Delete a result
// @route   DELETE /api/results/:id
// @access  Private/Admin
const deleteResult = async (req, res) => {
    try {
        const result = await Result.findById(req.params.id);
        if (result) {
            await result.deleteOne();
            res.json({ message: 'Result removed' });
        } else {
            res.status(404).json({ message: 'Result not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getResults, createResult, deleteResult };
