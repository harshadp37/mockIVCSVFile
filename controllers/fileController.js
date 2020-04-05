const multer = require('multer');
const fs = require('fs');
const path = require('path');
const File = require('../models/file');
const csv = require('csv-parser');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(fs.existsSync('csv_uploads')){
            cb(null, path.join(__dirname, '..', File.uploadPath))
        }else{
            fs.mkdirSync('csv_uploads');
            cb(null, 'csv_uploads')
        }
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({storage: storage}).single('csvFile');

module.exports.getDetails = async (req, res)=>{
    try {
        let file = await File.findById(req.params.id);
        if(!file){
            throw new Error('File Not Found.');
        }
        const results = [];
        fs.createReadStream(path.join(__dirname, '..', file.path))
        .on('error', (err) => {
            console.log("Error while getting file details.")
            return res.render('home', {error: "Error while getting file details."})
        })
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            return res.render('home', {fileDetails: {name:file.originalFileName, keys: Object.keys(results[0]), content: results}});
        });
    } catch (e) {
        console.log("Error while getting details of file.")
        res.render('home', {error: e.message})
    }
}

module.exports.uploadFile = (req, res)=>{
    upload(req, res, async function(err) { 
        if(err) { 
            console.log("Error while uploading a File.")
            return res.render('home', {error: "Error while uploading a File."}); 
        }
        try {
            if(!req.file){
                throw new Error('Please Select a File to upload.');
            }
            await File.create({
                fileName: req.file.filename,
                originalFileName: req.file.originalname,
                path: File.uploadPath + '/' + req.file.filename
            })
            res.redirect('/');
        } catch (e) {
            console.log("Error while uploading a file");
            return res.render('home', {error: e.message});
        }
    })
}