const express = require('express');
const router = express.Router();
const fileController = require('./../controllers/fileController');

router.get('/:id', fileController.getDetails);
router.post('/upload', fileController.uploadFile);

module.exports = router;