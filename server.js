const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const dbConfig = require('./db');
const multer = require('multer');
const PORT = process.env.PORT || 3000;

const app = express();

/* MONGODB CONNECTION */
mongoose.connect(dbConfig.url + dbConfig.databaseName, dbConfig.options, (err)=>{
    if(err){
        throw err;
    }
    console.log('Successfully connected to Database : ' + dbConfig.databaseName);
})

/* VIEW ENGINE */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

/* MIDDLEWARES */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'assests')));

app.use('/', require('./routes/index'));

app.listen(PORT, ()=>{
    console.log("Server Running on PORT : " + PORT);
})