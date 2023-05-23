const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const uploadMiddleware = require('../middleware/uploadMiddleware');

// Upload endpoint'i
router.post('/upload', uploadMiddleware.array('images', 10), imageController.uploadImage);

// Get images endpoint'i
router.get('/', imageController.getImages);

module.exports = router;
