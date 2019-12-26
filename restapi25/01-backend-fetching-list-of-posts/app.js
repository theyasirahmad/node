const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const path = require('path');

const feedRoutes = require('./routes/feed');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/images',express.static(path.join(__dirname,'images')));

app.use('/feed', feedRoutes);


app.use((error,req,res,next)=>{
    console.log(error);
    const status = error.statusCode;
    const message = error.message;
    res.status(status).json({message:message})


});

mongoose
    .connect('mongodb+srv://user101:8wjw1HpFJZvd8kd4@cluster0-56yha.mongodb.net/messages?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })
    .then((success) => {
        app.listen(8080);
    })
    .catch((err) => {
        console.log(err)
    })