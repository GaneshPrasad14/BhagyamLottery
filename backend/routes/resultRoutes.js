const express = require('express');
const router = express.Router();
const {
    getResults,
    createResult,
    deleteResult,
} = require('../controllers/resultController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/').get(getResults).post(protect, admin, upload.single('file'), createResult);
router.route('/:id').delete(protect, admin, deleteResult);

module.exports = router;
