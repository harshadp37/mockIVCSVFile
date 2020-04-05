const multer = require('multer');
const fs = require('fs');
const path = require('path');
const File = require('../models/file');

/* CSV PARSER TO CONVERT CSV TO JSON */
const csv = require('csv-parser');

/* MULTER CONFIGURATION */
const storage = multer.diskStorage({

    /* DESTINATION FOLDER FOR UPLOADS */
    destination: function (req, file, cb) {

        /* IF DESTINATION FOLDER IS NOT EXISTS THEN MAKE ONE */
        if(fs.existsSync('csv_uploads')){
            cb(null, path.join(__dirname, '..', File.uploadPath))
        }else{
            fs.mkdirSync('csv_uploads');
            cb(null, 'csv_uploads')
        }
    },

    /* FILE NAME BASED ON CURRENT DATETIME SO EVERY FILE WILL HAVE UNIQUE NAME */
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({storage: storage}).single('csvFile');

/* GET DETAILS OF A FILE */
module.exports.getDetails = async (req, res)=>{
    try {
        /* GET FILE WITH THE HELP OF PARAMS ID */
        let file = await File.findById(req.params.id);

        /* THROW ERROR IF FILE NOT FOUND */
        if(!file){
            throw new Error('File Not Found.');
        }

        /* INITIALIZE RESULTS ARRAY FOR FILE CONTENT */
        const results = [];

        /* READ FILE & PUSH DATA TO RESULTS ARRAY  */
        fs.createReadStream(path.join(__dirname, '..', file.path))
        .on('error', (err) => {
            console.log("Error while getting file details.")
            return res.render('home', {error: "Error while getting file details."})
        })
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            /* SUCCESS RESPONSE */
            return res.render('home', {fileDetails: {name:file.originalFileName, keys: Object.keys(results[0]), content: results}});
        });
    } catch (e) {
        /* ERROR RESPONSE */
        console.log("Error while getting details of file.")
        res.render('home', {error: e.message})
    }
}

/* UPLOAD NEW FILE */
module.exports.uploadFile = (req, res)=>{
    upload(req, res, async function(err) { 
        if(err) { 
            console.log("Error while uploading a File.")
            return res.render('home', {error: "Error while uploading a File."}); 
        }
        try {
            /* THROWS ERROR IF FILE IS NOT SEND IN REQUEST */
            if(!req.file){
                throw new Error('Please Select a File to upload.');
            }

            /* CREATE NEW FILE */
            await File.create({
                fileName: req.file.filename,
                originalFileName: req.file.originalname,
                path: File.uploadPath + '/' + req.file.filename
            })

            /* SUCCESS RESPONSE */
            res.redirect('/');

        } catch (e) {
            /* ERROR RESPONSE */
            console.log("Error while uploading a file");
            return res.render('home', {error: e.message});
        }
    })
}