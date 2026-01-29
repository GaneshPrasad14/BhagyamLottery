const express = require('express');
const router = express.Router();
const {
    getTickets,
    createTicket,
    deleteTicket,
} = require('../controllers/ticketController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/').get(getTickets).post(protect, admin, upload.array('images'), createTicket);
router.route('/:id').delete(protect, admin, deleteTicket);

module.exports = router;
