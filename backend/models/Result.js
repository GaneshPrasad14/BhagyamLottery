const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
    name: { type: String, required: true },
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    code: { type: String, required: true }, // e.g., SS-402
    firstPrize: { type: String, required: true }, // e.g., AA 123456
    prize: { type: String, required: true }, // e.g., ₹75,00,000
    isJackpot: { type: Boolean, default: false },
    link: { type: String }, // Optional link to PDF
}, {
    timestamps: true,
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
