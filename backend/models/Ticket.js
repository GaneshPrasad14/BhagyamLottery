const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true }, // e.g., WW, SS
    date: { type: String, required: true }, // Draw Date
    type: { type: String, enum: ['daily', 'weekly', 'bumper'], default: 'daily' },
    price: { type: String, required: true },
    firstPrize: { type: String, required: true }, // e.g., ₹75,00,000
    isFeatured: { type: Boolean, default: false },
    images: [String],
}, {
    timestamps: true,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
