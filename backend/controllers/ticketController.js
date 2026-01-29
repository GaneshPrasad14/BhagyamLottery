const Ticket = require('../models/Ticket');

// @desc    Get all tickets
// @route   GET /api/tickets
// @access  Public
const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({}).sort({ date: 1 }); // Soonest first
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a ticket
// @route   POST /api/tickets
// @access  Private/Admin
const createTicket = async (req, res) => {
    try {
        const { name, code, date, type, price, firstPrize, isFeatured } = req.body;

        let images = [];
        if (req.files) {
            images = req.files.map(file => `/uploads/${file.filename}`);
        }

        const ticket = new Ticket({
            name,
            code,
            date,
            type,
            price,
            firstPrize,
            isFeatured: isFeatured === 'true', // Handle form-data boolean
            images,
        });
        const createdTicket = await ticket.save();
        res.status(201).json(createdTicket);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Delete a ticket
// @route   DELETE /api/tickets/:id
// @access  Private/Admin
const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (ticket) {
            await ticket.deleteOne();
            res.json({ message: 'Ticket removed' });
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getTickets, createTicket, deleteTicket };
