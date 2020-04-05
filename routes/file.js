const express = require('express');
const router = express.Router();
const fileController = require('./../controllers/fileController');

/* DETAILS OF EACH FILE */
router.get('/:id', fileController.getDetails);

/* FILE UPLOAD */
router.post('/upload', fileController.uploadFile);

module.exports = router;