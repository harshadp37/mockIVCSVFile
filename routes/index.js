const express = require('express');
const router = express.Router();
const File = require('../models/file');

/* HOME ROUTE */
router.get('/', async (req, res)=>{
    try {
        /* GET ALL UPLODED FILE LISTS */
        let lists = await File.find({}).sort('-createdAt');

        /* THROW ERROR IF NO FILE FOUND */
        if(lists.length == 0){
            throw new Error('There are no uploaded files.');
        }

        /* SUCCESS RESPONSE */
        res.render('home', {fileLists: lists});

    } catch (e) {
        /* ERROR RESPONSE */
        console.log("Error while getting list of files. " + e);
        res.render('home', {error: e.message});
    }
})

/* FILE ROUTE */
router.use('/file', require('./file'));

module.exports = router;