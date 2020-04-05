const express = require('express');
const router = express.Router();
const File = require('../models/file');

router.get('/', async (req, res)=>{
    try {
        let lists = await File.find({}).sort('-createdAt');
        if(lists.length == 0){
            throw new Error('There are no uploaded files.');
        }
        console.log(lists)
        res.render('home', {fileLists: lists});
    } catch (e) {
        console.log("Error while getting list of files. " + e);
        res.render('home', {error: e.message});
    }
})

router.use('/file', require('./file'));

module.exports = router;