const mongoose = require('mongoose');

/* FILE SCHEMA */
const fileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    originalFileName: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
}, {timestamps: true});

/* UPLOAD FILE PATH */
fileSchema.statics.uploadPath = '/csv_uploads';

module.exports = mongoose.model('file', fileSchema);